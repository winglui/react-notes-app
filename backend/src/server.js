import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js";
import cors from 'cors'


dotenv.config();

const app = express()
const PORT = process.env.PORT || 5001

//middleware
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173"
}))
app.use(rateLimiter)


app.use((req, res, next) => {
  console.log(`Requested Method is ${req.method} $ req url is ${req.url}`)
  next();
})

app.use("/api/notes", notesRoutes)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on port: ", PORT)
  })
})
