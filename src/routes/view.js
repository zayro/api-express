import express from "express"
import path from "path"
import * as queryControlller from "../controllers/query"

// valiables de entorno
import dotenv from "dotenv"

dotenv.config()

const api = express()

api.get("/view/user", async (req, res) => {
  const data = queryControlller.query_users()

  function show() {
    console.log("holi")
  }

  res.render(`${process.cwd()}/src/views/pages/query.ejs`, {
    info: await data,
    x: show,
  })
})

api.get("/view/report", function (req, res) {
  var mascots = [
    {
      name: "Sammy",
      organization: "DigitalOcean",
      birth_year: 2012,
    },
    {
      name: "Tux",
      organization: "Linux",
      birth_year: 1996,
    },
    {
      name: "Moby Dock",
      organization: "Docker",
      birth_year: 2013,
    },
  ]
  var tagline = "No programming concept is complete without a cute animal mascot."
  res.render(path.join(__dirname, "../views/pages/report"), {
    mascots: mascots,
    tagline: tagline,
  })
})

export { api as default }
