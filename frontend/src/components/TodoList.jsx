import TodoItem from "./TodoItem";

const TodoList = (props) => {
    return ( 
        <div>
            <h1>Todos:</h1>
            <ul>
                { props.todos.map(todo => <TodoItem todo={todo} setTodos={props.setTodos} key={todo._id} />) }
            </ul>
        </div>
     );
}
 
export default TodoList;