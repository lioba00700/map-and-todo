const Input = ({value, handleChange}) => {
  return(
    <input 
      className="border-1 border-gray-300 rounded-md outline-none focus:border-blue-500 p-[8px] min-w-[40px] w-sm"
      value={value}
      type="text"
      onChange={handleChange}/>
  )
}

export default Input;