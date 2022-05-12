import UserController from "../controllers/UserController";
import { Router } from "express";
import { body, validator } from "express-validator";

const router = Router();

router.post("/", [

    body("name").notEmpty().withMessage("이름 써라"),
    body("phone").notEmpty().withMessage("휴대폰번호 써라"),
    body("email").notEmpty().isEmail().withMessage("이메일 제대로 써라")

], UserController.createUser);
router.put("/:userId", UserController.updateUser);
router.get("/:userId", UserController.findByUserId);
router.delete("/:userId", UserController.deleteUser);


export default router;