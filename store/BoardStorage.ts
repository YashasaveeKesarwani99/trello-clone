import { create } from "zustand";
import { getTodosGroupedByColumns } from "@/lib/getTodosGroupedByColumns";

interface BoardState {
  board: Board;
  getBoard: () => Promise<void>;
  setBoardState: (board: Board) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: new Map<TypedColumns, Column>(),
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumns();

    set({ board });
  },
  setBoardState: (board: Board) => set({ board }),
}));
