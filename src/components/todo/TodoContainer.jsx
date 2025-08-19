// 2025.08.19 - TodoList 상태관리 및 Todo 전체 UI 컴포넌트
import { useEffect, useState } from "react";
import TodoList from "./TodoList";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { deleteTodo, getTodos, patchTodo, postTodo } from "../../api/TodoAPI";

const TodoContainer = () => {
  //전체 일정 리스트를 관리하는 배열
  const [todos, setTodos] = useState([]);


  //완료 미완료 일정 배열 구분해 선언
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  //새로 생성할 일정 이름
  const [newName, setNewName] = useState('');

  //onChange 이벤트 발생 시 새로 생성할 일정 이름 업데이트하는 함수
  const handleChangeNewTodo = (e) => {
    setNewName(e.target.value);
  }

  //db.json 및 todos 배열에 새 일정을 생성하는 함수
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
  
  //db.json 및 todos 배열에서 전달 받은 id 가진 일정의 완료 상태를 변경 하는 함수
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

  //db.json 및 todos 배열에서 전달 받은 id 가진 일정을 삭제하는 함수
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

  //컴포넌트가 마운트될 때 db.json에서 전체 일정 리스트를 가져옴
  useEffect(() => {
    const getData = async () => {
      const res = await getTodos();
      setTodos(res.data); 
    }
    getData();
  }, []);

  //todos 배열의 값이 변경될 때 완료 상태를 구분해서 각각의 배열을 업데이트함
  useEffect(()=>{
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