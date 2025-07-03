import type React from "react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "./dialog";
import type { DialogProps } from "@radix-ui/react-dialog";
import { Button } from "../atoms/button";

type ButtonProps = React.ComponentProps<typeof Button>;

function ModalRoot({ children, ...rest }: DialogProps) {
  return (
    <Dialog {...rest}>
      <DialogContent className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 text-white shadow-2xl p-0 gap-0 max-w-md">
        <div className="p-6 space-y-6">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

function ModalTitle({
  className,
  ...props
}: { children: string } & React.ComponentProps<typeof DialogTitle>) {
  return (
    <DialogTitle
      className={cn(
        "text-2xl font-semibold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight",
        className
      )}
      {...props}
    />
  );
}

function ModalContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("text-slate-300 leading-relaxed", className)}>
      {children}
    </div>
  );
}

function ModalButtons({
  children,
}: { children: ReactNode } & React.ComponentProps<"div">) {
  return <div className="flex gap-3 w-full pt-2">{children}</div>;
}

function ModalCloseButton({
  children,
  className,
  ...props
}: { title?: string; children?: React.ReactNode } & Omit<ButtonProps, "size">) {
  return (
    <DialogClose asChild>
      <Button
        variant="ghost"
        size="lg"
        className={cn("flex-1", className)}
        {...props}
      >
        {children || "Fechar"}
      </Button>
    </DialogClose>
  );
}

function ModalActionButton({
  children,
  className,
  ...props
}: { title?: string; children?: React.ReactNode } & Omit<ButtonProps, "size">) {
  return (
    <Button
      variant="primary"
      size="lg"
      className={cn("flex-1", className)}
      {...props}
    >
      {children || "Confirmar"}
    </Button>
  );
}

/**
 * A system component Modal that follows the Compound Component pattern.
 * Provides a clean separation of concerns and maximum flexibility for different modal.
 * Styled to match PadFlow's premium design system.
 *
 * @example
 * // Import the Modal components
 * import { Modal } from './modal'
 *
 * // Basic usage
 * <Modal.Root>
 *   <Modal.Title>Dashboard</Modal.Title>
 *   <Modal.Content>
 *     <YourContent />
 *   </Modal.Content>
 *   <Modal.Buttons>
 *    <Modal.CloseButton />
 *    <Modal.ActionButton />
 *  </Modal.Buttons>
 * </Modal.Root>
 */
export const Modal = {
  Root: ModalRoot,
  Title: ModalTitle,
  Content: ModalContent,
  Buttons: ModalButtons,
  CloseButton: ModalCloseButton,
  ActionButton: ModalActionButton,
};
