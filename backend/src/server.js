import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js";
import cors from 'cors'
import path from 'path'


dotenv.config();

const app = express()
const PORT = process.env.PORT || 5001
const __dirname = path.resolve()

//middleware
app.use(express.json())

if (process.env.NODE_ENV !== 'production') {
  app.use(cors({
    origin: "http://localhost:5173"
  }))
}
app.use(rateLimiter)


app.use((req, res, next) => {
  console.log(`Requested Method is ${req.method} $ req url is ${req.url}`)
  next();
})

app.use("/api/notes", notesRoutes)

app.use(express.static(path.join(__dirname, '../frontend/dist')))

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'))
  })
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on port: ", PORT)
  })
})
