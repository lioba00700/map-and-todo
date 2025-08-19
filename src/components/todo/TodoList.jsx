// 2025.08.19 - 일정 배열을 Props로 받아 목록을 그리는 컴포넌트

import TodoItem from "./TodoItem";

const TodoList = ({title, todos, handleCheck, handleDelete}) => {
  return (
    <div className="mt-[50px]">
      <h3 className="text-lg font-semibold border-b border-gray-200 pb-[10px] mb-[10px]">{title}</h3>
      <ul className="flex flex-col gap-[10px]">
        {
          todos.map((todo) => (
            <TodoItem 
              key={todo.id} 
              id={todo.id} 
              name={todo.name} 
              checked={todo.checked} 
              handleCheck={handleCheck} 
              handleDelete={handleDelete}/>
          ))
        }
      </ul>
    </div>
  )
}

export default TodoList;