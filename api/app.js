const express = require("express")

// Constants
const PORT = 8080
const HOST = "0.0.0.0"

// App
const app = express()

// routes
app.use("/articles", require("./routes/article"))

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
