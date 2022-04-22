import { apiBaseUrl } from "../api"

const TodoItem = (props) => {
    const updateTodoCompleted = () => {
        fetch(apiBaseUrl + "/todos/updateStatus", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: props.todo._id, completed: !props.todo.completed })
        }).then(response => response.json())
        .then((updatedTodos) => props.setTodos(updatedTodos))
    }

    const deleteTodo = () => {
        fetch(apiBaseUrl + "/todos/delete/" + props.todo._id, {
            method: "DELETE",
        })
        .then(response => response.json())
        .then((todosWithoutCurrentTodo) => props.setTodos(todosWithoutCurrentTodo))
    }

    return (
        <li
            key={props.todo._id}
            className={props.todo.completed ? "completed" : ""}
        >
            <div
                onClick={updateTodoCompleted}
                className="todoitem"
            >
            {props.todo.title}
            </div>
            <div className="delteTodo" onClick={deleteTodo} >
                ✘ 
            </div>
            
        </li>
    );
}
 
export default TodoItem;