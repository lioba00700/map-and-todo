const Button = ({value, handleClick, style}) => {
  return(
    <button 
      className={`${style} cursor-pointer transition-all border-1 border-gray-300 bg-white hover:border-white hover:bg-blue-500 hover:text-white min-w-[80px] rounded-md p-[8px] font-semibold`}
      onClick={()=>handleClick()}>
        {value}
    </button>
  )
}

export default Button