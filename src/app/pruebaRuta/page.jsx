'use client'
import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const TASK_TYPE = "TASK";

const App = () => {
  const [lists, setLists] = useState([
    { id: "todo", title: "To Do", tasks: [{ id: "1", content: "Aprender React" }] },
    { id: "doing", title: "Doing", tasks: [{ id: "2", content: "Hacer el clon de Trello" }] },
    { id: "done", title: "Done", tasks: [{ id: "3", content: "Publicar el proyecto" }] },
  ]);

  const moveTask = (taskId, fromList, toList) => {
    if (fromList === toList) return;
    
    const newLists = lists.map(list => {
      if (list.id === fromList) {
        return { ...list, tasks: list.tasks.filter(task => task.id !== taskId) };
      }
      if (list.id === toList) {
        const movedTask = lists.find(l => l.id === fromList)?.tasks.find(t => t.id === taskId);
        return { ...list, tasks: [...list.tasks, movedTask] };
      }
      return list;
    });

    setLists(newLists);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex gap-4 p-4 bg-gray-100 min-h-screen">
        {lists.map((list) => (
          <List key={list.id} list={list} moveTask={moveTask} />
        ))}
      </div>
    </DndProvider>
  );
};

const List = ({ list, moveTask }) => {
  const [{ isOver }, drop] = useDrop({
    accept: TASK_TYPE,
    drop: (item) => moveTask(item.id, item.from, list.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={`w-64 p-4 bg-white rounded-lg shadow ${isOver ? "bg-blue-100" : ""}`}>
      <h2 className="text-lg font-bold mb-3">{list.title}</h2>
      {list.tasks.map((task) => (
        <Task key={task.id} task={task} from={list.id} />
      ))}
    </div>
  );
};

const Task = ({ task, from }) => {
  const [{ isDragging }, drag] = useDrag({
    type: TASK_TYPE,
    item: { id: task.id, from },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-3 bg-gray-200 rounded mb-2 shadow cursor-grab ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {task.content}
    </div>
  );
};

export default App;
