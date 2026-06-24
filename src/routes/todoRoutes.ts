import express from "express"
import {
  createTodo,
  getTodos,
  editTodo,
  deleteTodo,
} from "../controllers/todoController.js"
import { protect } from "../middleware/authMiddleware.js"
import apiKey from "../auth/apiKey.js"
import permission from "../helper/permissions.js"
import { Permission } from "../models/APIKeyModel.js"
const router: express.Router = express.Router()

router.use(apiKey)
router.use(permission(Permission.GENERAL))

router.route("/").post(protect, createTodo).get(getTodos)
router.route("/:id").put(protect, editTodo).delete(protect, deleteTodo)

export default router
