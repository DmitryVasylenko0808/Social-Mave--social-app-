import React, { PropsWithChildren } from "react";
import Button from "./button.component";
import { X } from "lucide-react";

export type ModalProps = PropsWithChildren & {
  open: boolean;
  title?: string;

  onClose: () => void;
};

const Modal = ({ open, title, children, onClose }: ModalProps) => {
  if (!open) {
    return null;
  }

  return (
    <div className="w-full min-h-screen fixed top-0 left-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="max-h-[920px] p-5 shadow-xl bg-white rounded-xl overflow-auto">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-black text-xl font-bold">{title}</span>
          <Button variant="terciary" onClick={onClose}>
            <X />
          </Button>
        </div>
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;