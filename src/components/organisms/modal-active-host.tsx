import { useModalStore } from "@/lib/stores/use-modal-store";
import { useRemoteHostStore } from "@/lib/stores/use-remote-host-store";
import QRCode from "react-qr-code";
import { Modal } from "../molecules/modal";

export function ModalActiveHost() {
  const modal = useModalStore((state) => state.modal);
  const isRemoteHost = useRemoteHostStore((state) => state.isRemoteHost);
  const roomId = useRemoteHostStore((state) => state.roomId);

  const openModal = useModalStore((state) => state.openModal);
  const resetRemoteHost = useRemoteHostStore((state) => state.resetRemoteHost);
  const toggleStatusRemoteHost = useRemoteHostStore(
    (state) => state.toggleStatusRemoteHost
  );

  const remoteUrl = `${
    window.location.origin || "http://localhost:5173"
  }/tones/?session=${roomId}`;

  return (
    <Modal.Root
      open={modal === "activeHost"}
      onOpenChange={() => openModal(null)}
    >
      <Modal.Title>Remote Control</Modal.Title>
      <Modal.Content>
        {isRemoteHost && roomId ? (
          <div className="text-center space-y-4">
            <p className="text-slate-400">
              Scan the QR code with your mobile device to start controlling.
            </p>
            <div className="bg-white p-4 inline-block rounded-lg shadow-md">
              <QRCode value={remoteUrl} size={160} />
            </div>
            <p className="text-xs text-slate-500 pt-2">Room ID: {roomId}</p>
          </div>
        ) : (
          <p className="text-center text-slate-400">
            Do you want to activate the remote control?
          </p>
        )}
      </Modal.Content>
      <Modal.Buttons>
        <Modal.CloseButton onClick={() => openModal(null)}>
          Close
        </Modal.CloseButton>
        <Modal.ActionButton
          onClick={() => {
            toggleStatusRemoteHost();
            if (isRemoteHost) {
              openModal(null);
              resetRemoteHost();
            }
          }}
        >
          {isRemoteHost
            ? "Deactivate Remote Control"
            : "Activate Remote Control"}
        </Modal.ActionButton>
      </Modal.Buttons>
    </Modal.Root>
  );
}
