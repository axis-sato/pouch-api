const bunyan = require("bunyan")
const PrettyStream = require("bunyan-prettystream")

const prettyStdOut = new PrettyStream()
prettyStdOut.pipe(process.stdout)

var logger = bunyan.createLogger({
  name: "pouch-api",
  src: true,
  streams: [
    {
      level: "debug",
      type: "raw",
      stream: prettyStdOut
    }
  ]
})

module.exports = logger
