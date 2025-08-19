import { useEffect, useState } from "react";
import TodoList from "./TodoList";
import Button from "../ui/Button";
import Input from "../ui/Input";

const mockTodos = [
  {id:1, name: '책상 청소하기', checked: false},
  {id:2, name: '자리 청소하기', checked: false},
  {id:3, name: '침대 청소하기', checked: false},
  {id:4, name: '키보드 청소하기', checked: false},
  {id:5, name: '마당 청소하기', checked: false},
]

const TodoContainer = () => {
  //전체 일정
  const [todos, setTodos] = useState(mockTodos);


  //완료 미완료 일정 배열 구분
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  //새로 만들 일정 이름
  const [newName, setNewName] = useState('');

  const handleChangeNewTodo = (e) => {
    setNewName(e.target.value);
  }

  const handleAddTodo = () => {
    const newId = Math.max(...todos.map((todo)=>todo.id)) +1;
    setTodos((prev)=> ([...prev, {
      id: newId,
      name: newName,
      checked: false,
    }]))
    setNewName('');
  }
  
  const handleCheckTodo = (id) => {
    setTodos((prev)=>
      prev.map((todo)=>
        todo.id === id ? {...todo, checked:!todo.checked} : todo
      )
    );
  }

  const handleDeleteTodo = (id) => {
    setTodos((prev)=>
      prev.filter((todo)=>todo.id !== id)  
    )
  }

  useEffect(()=>{
    //완료됨 일정과 미완료된 일정 구분
    const incompleted = todos.filter((todo)=>!todo.checked);
    const completed = todos.filter((todo)=>todo.checked);

    setIncompleteTodos(incompleted);
    setCompleteTodos(completed);
  },[todos]);

  return(
    <div className="m-[50px]">
      <h2 className="text-3xl font-bold mb-[30px]">TodoList</h2>
      <div className="flex gap-[5px]">
        <Input value={newName} handleChange={handleChangeNewTodo}/>
        <Button value={'추가'} handleClick={handleAddTodo}/>
      </div>
      <TodoList 
        title={"미완료된 일정 ❌"} 
        todos={incompleteTodos} 
        handleCheck={handleCheckTodo}
        handleDelete={handleDeleteTodo}/>
      <TodoList 
        title={"완료된 일정 ✅"} 
        todos={completeTodos} 
        handleCheck={handleCheckTodo}
        handleDelete={handleDeleteTodo}/>
    </div>
  )
}

export default TodoContainer;