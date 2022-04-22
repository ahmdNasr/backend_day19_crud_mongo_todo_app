const { MongoClient } = require("mongodb")

const dotenv = require("dotenv")
dotenv.config()

const url = process.env.DB_URL
const client = new MongoClient(url)

const databaseName = process.env.DB_NAME

let dbReference;

function getDB() {
    return new Promise((resolve, reject) => {
        if (dbReference) {
            resolve(dbReference)
        } else {
            client
            .connect()
            .then((connectedClient) => {
                const db = connectedClient.db(databaseName)
                dbReference = db; // ganz wichtig: zwischenspeichern, damit beim nächsten aufruf von getDB die connection nicht neu aufgebaut werden muss...
                resolve(db)
            })
            .catch(() => reject({ err: "Failed to connect to database" }))
        }
    })
}


module.exports = { getDB }