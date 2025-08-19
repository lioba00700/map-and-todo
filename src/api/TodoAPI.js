import { BaseUrl } from "./BaseUrl"

export const getTodos = async () => {
  try{
    const res = await BaseUrl.get('/todos');
    return {data:res.data ,pass: false};
  }
  catch(error){
    console.log(error)
    return {data:[] ,pass: false};
  }
}

export const postTodo = async ({id, name, checked}) => {
  try{
    const res = await BaseUrl.post('/todos', {
      id: id,
      name,
      checked
    });
    console.log(res.data);
    return {pass: true}
  }
  catch(error){
    return {pass: false}
  }
}

export const deleteTodo = async ({id}) => {
  try{
    console.log(typeof id);
    const res = await BaseUrl.delete(`/todos/${id}`);
    console.log(res.data);
    return {pass: true}
  }
  catch(error){
    console.log(error);
    return {pass: false}
  }
}

export const patchTodo = async ({id, checked}) => {
  try{
    console.log(typeof id);
    const res = await BaseUrl.patch(`/todos/${id}`, {
      checked: !checked
    });
    console.log(res.data);
    return {pass: true}
  }
  catch(error){
    console.log(error);
    return {pass: false}
  }
}