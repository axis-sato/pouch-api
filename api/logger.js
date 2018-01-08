const bunyan = require("bunyan")
const PrettyStream = require("bunyan-prettystream")
require("dotenv").config()

const baseOpts = {
  name: "pouch-api"
}

const opts = env => {
  if (env === "dev") {
    const prettyStdOut = new PrettyStream()
    prettyStdOut.pipe(process.stdout)

    return Object.assign(baseOpts, {
      src: true,
      streams: [
        {
          level: "debug",
          type: "raw",
          stream: prettyStdOut
        }
      ]
    })
  }

  return Object.assign(baseOpts, {})
}

module.exports = bunyan.createLogger(opts(process.env.NODE_ENV))
