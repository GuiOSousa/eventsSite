import { Router } from "express"
import { UserController } from "../controllers/userController"

const userRouter = Router()

userRouter.get("/", UserController.getAllUsers)
userRouter.get("/email", UserController.getUserByEmail)
userRouter.get("/id/:id", UserController.getUserById)
userRouter.post("/", UserController.createUser)
userRouter.put("/", UserController.updateUser)
userRouter.delete("/:id", UserController.deleteUser)

export default userRouter