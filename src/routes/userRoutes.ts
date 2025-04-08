import { Router } from "express"
import { UserController } from "../controllers/userController"
import { authMiddleware } from "../middlewares/authMiddleware"

const userRouter = Router()

userRouter.get("/", UserController.getAllUsers)
userRouter.get("/email", UserController.getUserByEmail)
userRouter.get("/id/:id", UserController.getUserById)
userRouter.post("/", UserController.createUser)
userRouter.put("/", UserController.updateUser)
userRouter.delete("/", authMiddleware, UserController.deleteUser)
userRouter.post("/event", UserController.assignUserToEvent)
userRouter.delete("/event", UserController.unassignUserToEvent)

export default userRouter