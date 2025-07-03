import { useModalStore } from "@/lib/stores/use-modal-store";
import { useRemoteControlStore } from "@/lib/stores/use-remote-control-store";
import { Modal } from "../molecules/modal";

export function ModalRemoteControl() {
  const modal = useModalStore((state) => state.modal);
  const openModal = useModalStore((state) => state.openModal);

  const resetControl = useRemoteControlStore((state) => state.resetControl);

  return (
    <Modal.Root
      open={modal === "remoteControl"}
      onOpenChange={() => openModal(null)}
    >
      <Modal.Title>Remote Control</Modal.Title>
      <Modal.Content>
        <p className="text-center text-slate-400">
          you disconnect from the host?
        </p>
      </Modal.Content>
      <Modal.Buttons>
        <Modal.CloseButton onClick={() => openModal(null)}>
          Close
        </Modal.CloseButton>
        <Modal.ActionButton
          onClick={() => {
            resetControl();
            openModal(null);
          }}
        >
          Disconnect
        </Modal.ActionButton>
      </Modal.Buttons>
    </Modal.Root>
  );
}
