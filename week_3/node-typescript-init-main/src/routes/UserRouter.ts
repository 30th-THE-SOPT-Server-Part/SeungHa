import UserController from "../controllers/UserController";
import { Router } from "express";
import { body } from "express-validator";

const router = Router();

router.post("/", [

    body("name").notEmpty().withMessage("이름 써라"),
    body("phone").notEmpty().withMessage("휴대폰번호 써라"),
    body("email").notEmpty().isEmail().withMessage("이메일 제대로 써라"),
    body("password").isLength({ min: 6 }).withMessage("비번 똑바로 쓰세요"),

], UserController.createUser);

router.post('/signin', [
    body('email').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('password').notEmpty()
], UserController.signInUser);

router.put("/:userId", UserController.updateUser);
router.get("/:userId", UserController.findByUserId);
router.delete("/:userId", UserController.deleteUser);


export default router;