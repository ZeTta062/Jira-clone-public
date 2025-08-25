import { useMedia } from "react-use" ;
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface ResponsiveModalProps {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const ResponsiveModal = ({
    children,
    open,
    onOpenChange
}: ResponsiveModalProps) => {
    const isDesktop = useMedia("(min-width: 1024px)", true);

    if (isDesktop) {
        return(
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="w-full sm:max-w-lg p-0 border-none overflow-y-auto max-h-[85vh] hide-scrollbar">
                    <VisuallyHidden asChild>
                        <DialogHeader>
                            <DialogTitle>ResponsiveModal</DialogTitle>
                        </DialogHeader>
                    </VisuallyHidden>
                    {children}
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <VisuallyHidden asChild>
                    <DrawerHeader>
                        <DrawerTitle>ResponsiveModal</DrawerTitle>
                    </DrawerHeader>
                </VisuallyHidden>
                <div className="overflow-y-auto max-h-[85vh] hide-scrollbar">
                    {children}
                </div>
            </DrawerContent>
        </Drawer>
    );
};

