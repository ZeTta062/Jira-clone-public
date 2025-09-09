"use client";

import { ArrowUpDown, MoreVerticalIcon } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table" ;

import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { MemberAvatar } from "@/features/members/components/member-avatar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { STATUS_KO, Task } from "../types";
import TaskDate from "./task-date";
import TaskActions from "./task-actions";


export const columns: ColumnDef<Task>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                작업 이름
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
          cell: ({ row }) => {
            const name = row.original.name;

            return <p className="line-clamp-1">{name}</p>
          }
    },

    {
        accessorKey: "project",
        header: ({ column }) => {
            return (
                <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                  프로젝트
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              )
        },
        cell: ({ row }) => {
            const project = row.original.project;

            return (
                <div className="flex items-center gap-x-2 text-sm font-medium">
                    <ProjectAvatar 
                        className="size-6"
                        name={project?.name || ""}
                        image={project?.imageUrl}
                    />
                    <p className="line-clamp-1">{project?.name}</p>
                </div>
            )
        },
        sortingFn: (rowA, rowB, columnId) => {
            const nameA = rowA.original.project?.name || '';
            const nameB = rowB.original.project?.name || '';
            return nameA.localeCompare(nameB);
        }
    },

    {
        accessorKey: "assignee",
        header: ({ column }) => {
            return (
                <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                  담당자
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              )
        },
        cell: ({ row }) => {
            const assignee = row.original.assignee;

            return (
                <div className="flex items-center gap-x-2 text-sm font-medium">
                    <MemberAvatar 
                        className="size-6"
                        fallbackClassName="text-xs"
                        name={assignee?.name || ""}
                    />
                    <p className="line-clamp-1">{assignee?.name}</p>
                </div>
            )
        },
        sortingFn: (rowA, rowB, columnId) => {
            const nameA = rowA.original.assignee?.name || '';
            const nameB = rowB.original.assignee?.name || '';
            return nameA.localeCompare(nameB);
        }
    },

    {
        accessorKey: "dueDate",
        header: ({ column }) => {
            return (
                <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                  기한 날짜
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              )
        },
        cell: ({ row }) => {
            const dueDate = row.original.dueDate;

            return (
                <TaskDate value={dueDate} />
             )
        }
    },

    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                  상태
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              )
        },
        cell: ({ row }) => {
            const status = row.original.status;

            return (
                <Badge variant={status}>
                    {STATUS_KO[status]}
                </Badge>
             )
        }
    },
    {
      id: "actions",
        cell: ({ row }) => {
            const id = row.original.$id;
            const projectId = row.original.projectId

            return (
                <TaskActions id={id} projectId={projectId}>
                    <Button variant={"ghost"} className="size-8 p-0">
                        <MoreVerticalIcon className="size-4" />
                    </Button>
                </TaskActions>
            )
        }
    }
];
