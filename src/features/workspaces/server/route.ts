import { Hono } from "hono";
import { ID } from "node-appwrite";
import { zValidator } from "@hono/zod-validator";

import { DATABASE_ID, IMAGES_BUCKET_ID, WORKSPACES_ID } from "@/config";
import { sessionMiddleware } from "@/lib/session-middleware";

import { createWorkspaceSchema } from "../schemas";

const app = new Hono()
    .get("/", sessionMiddleware, async (c) => {
        const databases = c.get("databases");

        const workspaces = await databases.listDocuments(
            DATABASE_ID,
            WORKSPACES_ID,
        );

        return c.json({ data: workspaces });
    })
    .post(
        "/",
        zValidator("form", createWorkspaceSchema),
        sessionMiddleware,
        async (c) => {
            const databases = c.get("databases");
            const storage = c.get("storage");
            const user = c.get("user");

            const { name, image } = c.req.valid("form");

            let uploadedImageUrl: string | undefined;

            if (image instanceof File) {
                const file = await storage.createFile(
                    IMAGES_BUCKET_ID,
                    ID.unique(),
                    image,
                );

                /* 
                arrayBuffer는 무료 티어에서 사용할 수 없음.
                따라서 기존 이미지 그대로 출력 되게 변경
                const arrayBuffer = await storage.getFilePreview(
                    IMAGES_BUCKET_ID,
                    file.$id,
                );

                uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`; 
                */

                uploadedImageUrl = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${IMAGES_BUCKET_ID}/files/${file.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;

            }

            const workspace = await databases.createDocument(
                DATABASE_ID,
                WORKSPACES_ID,
                ID.unique(),
                {
                    name,
                    userId: user.$id,
                    imageUrl: uploadedImageUrl,
                },
            );

            return c.json({ data: workspace });
        }
    );

export default app;