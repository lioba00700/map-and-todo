const TodoItem = ({id, name, checked, handleCheck, handleDelete}) => {
  return(
    <li className="flex items-center gap-[10px] p-[5px]">
      <input 
        className="w-[20px] h-[20px] cursor-pointer"
        type="checkbox" 
        onChange={()=>handleCheck(id, checked)} 
        checked={checked}/>
      <p className={`${checked ? 'line-through text-gray-400' : null} font-medium w-sm max-sm:w-[75%]`}>{name}</p>
      <button 
        className="cursor-pointer transition-all border-1 border-gray-300 bg-white hover:border-white hover:bg-red-500 hover:text-white text-xs p-[3px] rounded-sm text-nowrap"
        onClick={()=>handleDelete(id)}>
          삭제
      </button>
    </li>
  )
}

export default TodoItem;