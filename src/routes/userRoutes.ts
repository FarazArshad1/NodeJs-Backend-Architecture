import express from "express"
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.js"
import validateRequest, { ValidatorSource } from "../helper/validator.js"
import { userLoginScehma } from "../schema/user.schema.js"

const router: express.Router = express.Router()

router.route("/login").post(validateRequest(userLoginScehma, ValidatorSource.BODY), loginUser)
router.route("/register").post(registerUser)
router.route("/logout").get(logoutUser)

export default router
