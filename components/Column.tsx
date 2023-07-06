import { PlusCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "./TodoCard";
import { useBoardStore } from "@/store/BoardStorage";

type Props = {
  id: TypedColumns;
  todos: Todo[];
  index: number;
};

const idToColumnText: {
  [key in TypedColumns]: string;
} = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

const Column = ({ id, todos, index }: Props) => {
  const [searchString] = useBoardStore((state) => [state.searchString]);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {/* render droppable todos in the column */}
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"
                }`}
              >
                <h2 className="flex items-center justify-between font-bold font-xl p-2">
                  {idToColumnText[id]}

                  <span className="w-8 h-8 flex justify-center items-center text-gray-500 bg-gray-200 rounded-full p-2 text-sm font-normal">
                    {!searchString
                      ? todos.length
                      : todos.filter((todo) =>
                          todo.title
                            .toLocaleLowerCase()
                            .includes(searchString.toLocaleLowerCase())
                        ).length}
                  </span>
                </h2>

                <div className="space-y-2">
                  {todos.map((todo, index) => {
                    if (
                      searchString &&
                      !todo.title
                        .toLocaleLowerCase()
                        .includes(searchString.toLocaleLowerCase())
                    )
                      return null;

                    return (
                      <Draggable
                        key={todo.$id}
                        draggableId={todo.$id}
                        index={index}
                      >
                        {(provided) => (
                          <TodoCard
                            todo={todo}
                            index={index}
                            id={id}
                            innerRef={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        )}
                      </Draggable>
                    );
                  })}

                  {provided.placeholder}

                  <div className="flex justify-end items-end">
                    <button className="text-green-500 hover:text-green-600">
                      <PlusCircleIcon className="h-10 w-10" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
