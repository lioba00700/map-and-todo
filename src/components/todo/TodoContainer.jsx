import { useEffect, useState } from "react";
import TodoList from "./TodoList";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { deleteTodo, getTodos, patchTodo, postTodo } from "../../api/TodoAPI";

const TodoContainer = () => {
  //전체 일정
  const [todos, setTodos] = useState([]);


  //완료 미완료 일정 배열 구분
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  //새로 만들 일정 이름
  const [newName, setNewName] = useState('');

  const handleChangeNewTodo = (e) => {
    setNewName(e.target.value);
  }

  const handleAddTodo = async () => {
    const newId = todos.length>0 ? Math.max(...todos.map((todo)=>todo.id)) +1 : 1;
    const newTodo = {
      id: String(newId),
      name: newName,
      checked: false,
    }
    const res = await postTodo(newTodo);
    if(res.pass){
      setTodos((prev)=> ([...prev, newTodo]))
      setNewName('');
    }
  }
  
  const handleCheckTodo = async (id, checked) => {
    const res = await patchTodo({id, checked});
    if(res.pass){
      setTodos((prev)=>
        prev.map((todo)=>
          todo.id === id ? {...todo, checked:!todo.checked} : todo
        )
      );
    }
  }

  const handleDeleteTodo = async (id) => {
    const res = await deleteTodo({id})
    if(res.pass){
      setTodos((prev)=>
        prev.filter((todo)=>todo.id !== id)  
      )
      setCompleteTodos([]);
      setIncompleteTodos([]);
      console.log(todos);
    }
  }

  useEffect(() => {
    const getData = async () => {
      const res = await getTodos();
      setTodos(res.data); 
    }
    getData();
  }, []);

  useEffect(()=>{
    //완료됨 일정과 미완료된 일정 구분
    if(todos.length < 1)return;
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