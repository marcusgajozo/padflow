import { create } from "zustand";

interface RemoteStoreState {
  isRemoteActive: boolean;
  isRemoteControl: boolean;
  roomId: string | undefined;
  quantityOfControllers: number;
}

interface RemoteStoreActions {
  toggleRemote: () => void;
  setRoomId: (roomId: string) => void;
  setIsRemoteControl: (isRemoteControl: boolean) => void;
  incrementControllers: () => void;
  decrementControllers: () => void;
}

const INITIAL_STATE: RemoteStoreState = {
  isRemoteActive: false,
  roomId: undefined,
  isRemoteControl: false,
  quantityOfControllers: 0,
};

export const useRemoteStore = create<RemoteStoreState & RemoteStoreActions>(
  (set) => ({
    ...INITIAL_STATE,
    toggleRemote: () =>
      set((state) => ({ isRemoteActive: !state.isRemoteActive })),
    setRoomId: (roomId: string) => set({ roomId }),
    setIsRemoteControl: (isRemoteControl: boolean) => set({ isRemoteControl }),
    incrementControllers: () =>
      set((state) => ({
        quantityOfControllers: state.quantityOfControllers + 1,
      })),
    decrementControllers: () =>
      set((state) => ({
        quantityOfControllers: Math.max(state.quantityOfControllers - 1, 0),
      })),
    reset: () => set({ ...INITIAL_STATE }),
  })
);
