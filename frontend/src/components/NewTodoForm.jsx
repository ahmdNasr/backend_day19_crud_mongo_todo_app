import { useState } from "react";
import { apiBaseUrl } from "../api";

const NewTodoForm = (props) => {
    const [newTodoTitle, setNewTodoTitle] = useState("")
    const [error, setError] = useState("")

    const addNewTodo = (event) => {
        event.preventDefault() // reload onSubmit verhindern

        fetch(apiBaseUrl + "/todos/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: newTodoTitle })
        })
        .then(response => response.json())
        .then((data) => {
            if(data.err) setError(data.err)
            else {
                setError("")
                setNewTodoTitle("")
                props.setTodos(data)
            }
        })
    }

    return (
        <form>
            <input 
                value={newTodoTitle}
                onChange={(event) => setNewTodoTitle(event.target.value)}
                placeholder="What will you do today?" />
            <button onClick={addNewTodo}>
                Add Todo
            </button>

            <div style={{color: "red", margin: 8}}>
                {error}
            </div>
        </form>
    );
}
 
export default NewTodoForm;