import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config"
import connectDB from "./db.js"
import User from "./models/user.js"


const port = 3000
const app = express()
await connectDB()

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})
app.use(express.json())


app.post("/api/signup", async (request, response) => {
  try {
    // encrypt user data
    const salt = await bcrypt.genSalt(10)
    request.body.password = await bcrypt.hash(request.body.password, salt)

    // create user
    const newUser = await User.create(request.body)

    // sign and send a web token
    const payload = {
      id: newUser._id,
      email: newUser.email,
      username: newUser.username
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "2d"})
    response.send(token)
  }
  catch (error) {
    response.status(401).json({error: error.message})
  }
})


app.post("/api/signin", async (request, response) => {
  try {
    const user = await User.findOne({
      email: request.body.email
    })

    if (!user) {
      throw Error("Email or password is incorrect.")
    }
    else {
      // compare password to verify authenticity
      let isPasswordValid = await bcrypt.compare(request.body.password, user.password)

      if (!isPasswordValid) {
        throw Error("Password is incorrect.")
      }

      // sign and send a web token
      const payload = {
        id: user._id,
        email: user.email,
        username: user.username
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "2d"})
      response.send(token)
    }
  }
  catch (error) {
    response.status(401).json({error: error.message})
  }
})


app.get("/users", async (request, response) => {
  try {
    // verify the web token
    let token = request.header("Authorization").replace("Bearer ", "")
    request.payload = jwt.verify(token, process.env.JWT_SECRET)

    response.json( await User.find({}) )
  }
  catch (error) {
    console.log({error: error.message})
    response.send("You are not logged in.")
  }
})


app.get("/users/:id", async (request, response) => {
  try {
    // verify the web token
    let token = request.header("Authorization").replace("Bearer ", "")
    request.payload = jwt.verify(token, process.env.JWT_SECRET)

    // verify that the path's id parameter matches the user's id in the provided web token
    const user = await User.findById(request.params.id)
    if (user._id.toString() !== request.payload.id) {
      throw new Error("ID does not match.")
    }

    response.json(user)
  }
  catch (error) {
    console.log({error: error.message})
    response.send("Invalid user id.")
  }
})
