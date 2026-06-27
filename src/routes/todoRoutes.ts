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
import role from "../helper/role.js"
import authorization from "../auth/authorization.js"
import { RoleCode } from "../models/roleModel.js"

const router: express.Router = express.Router()

router.use(apiKey)
router.use(permission(Permission.GENERAL))

router.route("/").post(protect, createTodo).get(role(RoleCode.ADMIN), authorization, getTodos)
router.route("/:id").put(protect, editTodo).delete(protect, deleteTodo)

export default router
