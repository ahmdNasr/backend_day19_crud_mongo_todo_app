import { useEffect, useState } from 'react';
import './App.css';
import NewTodoForm from './components/NewTodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetch("http://localhost:9000/todos/all")
    .then((response) => response.json())
    .then(todosArray => setTodos(todosArray))
  }, []) // leeres Array = nur 1 mal ausführen, wenn componeten mounted

  return (
    <div className="App">
      <NewTodoForm setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
