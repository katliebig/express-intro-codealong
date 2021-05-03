import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import data from "./data.json"

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/nominations', (req, res) => {
  res.json(data)
})

app.get("/year/:year", (req, res) => {
  const year = Number(req.params.year)
  const showWinning = req.query.winning
  let nominationsFromYear = data.filter((item) => item.year_award === year)

  if (showWinning) {
    nominationsFromYear = nominationsFromYear.filter((item) => item.win)
  }

  res.json(nominationsFromYear)
})

app.get("/nominations/winning", (req, res) => {
  const winningNominations = data.filter((item) => item.win)
  res.json(winningNominations)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
