import './App.css'
import useGetLocation from './hooks/useGetLocation';
import Map from './components/map/Map';
import TodoContainer from './components/todo/TodoContainer';



function App() {
  const location = useGetLocation();

  return (
    <>
      <Map location={location}/>
      <TodoContainer />
    </>
  )
}

export default App
