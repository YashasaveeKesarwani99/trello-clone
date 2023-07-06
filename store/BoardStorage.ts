import { create } from "zustand";
import { getTodosGroupedByColumns } from "@/lib/getTodosGroupedByColumns";
import { databases } from "@/appwrite";

interface BoardState {
  board: Board;
  getBoard: () => Promise<void>;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumns) => Promise<void>;

  searchString: string;
  setSearchString: (searchString: string) => void;
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
  updateTodoInDB: async (todo, columnId) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      }
    );
  },

  searchString: "",
  setSearchString: (searchString) => set({ searchString }),
}));
