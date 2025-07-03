import { create } from "zustand";

type modals = "activeHost" | "remoteControl";

interface ModalStoreState {
  modal: modals | null;
}

interface ModalStoreActions {
  openModal: (modal: ModalStoreState["modal"]) => void;
}

export const useModalStore = create<ModalStoreState & ModalStoreActions>(
  (set) => ({
    modal: null,
    openModal: (modal) => set({ modal }),
  })
);
