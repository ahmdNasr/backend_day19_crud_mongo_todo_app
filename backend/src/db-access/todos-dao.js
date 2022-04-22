// DAO = Data-Access-Object
const { ObjectId } = require("mongodb")
const { getDB } = require("./getDB")

/*
Datenstruktur:
{
    _id: "62820ß2092.."
    title: "abcd",
    completed: true
}
*/

function findAllTodos() {
    return getDB().then(db => db.collection("todos").find().toArray())
}

// brauchen wir nicht für dieses projekt, aber vlt braucht man das mal für eine Detail-Ansicht
function findTodoId(id) {
    return getDB().then(db => db.collection("todos").findOne({ _id: new ObjectId(id) }))
}

function insertTodo(todosObject) {
    return new Promise((resolve, reject) => {
        getDB()
        .then(db => db.collection("todos").insertOne(todosObject))
        .then(result => { // result ist ein objekt, welches insertOne returned
            if(result.acknowledged === true && result.insertedId) {
                resolve() // erfolgreich
            } else {
                reject() // hat nicht geklappt
            }
        })
        .catch((err) => reject(err))
    })
}

// todosUpdateInfoObject ist zb { completed: false/true, evtlNeuesFeld: "Wert" }
function updateTodo(id, todosUpdateInfoObject) {
    return getDB().then(db => 
            db
            .collection("todos")
            .updateOne(
                { _id: new ObjectId(id) }, // query bzw. filter
                { $set: todosUpdateInfoObject } // update info
            )
        )
}

function deleteTodo(id) {
    return getDB().then(db => db.collection("todos").deleteOne({ _id: new ObjectId(id) }))
}

module.exports = {
    findAllTodos,
    findTodoId,
    insertTodo,
    updateTodo,
    deleteTodo
}