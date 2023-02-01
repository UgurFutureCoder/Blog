import express from "express";
import { check } from "express-validator";
import checkAuth from "./utils/checkAuth.js";
import { registerValidation, loginValidation, postCreateValidation } from "./validations/auth.js";
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";
import multer from "multer";
import handleValidationErrors from "./utils/handleValidationErrors.js";
import cors  from 'cors'
const app = express()
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

const storage = multer.diskStorage({
  destination: (_,__, cb) => {
    cb(null, 'uploads')
  },
  filename: (_,file,cb) => {
    cb(null, file.originalname)
  }
})


const upload = multer({storage})

app.post('/auth/login', loginValidation, handleValidationErrors,UserController.login)
app.post('/auth/register', registerValidation, handleValidationErrors,UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth,upload.single('image'), (req,res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`
  })
})

app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth,postCreateValidation,handleValidationErrors, PostController.create)
app.delete('/posts/:id', checkAuth,PostController.remove)
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors,PostController.update)


app.listen(5555, (err) => {
    if(err) {
        console.log(err)
    }
    console.log(`Server started on port `)
})