import { Router } from "express";
import { auth, login, signup } from "../controller/authController.mjs";
import { getAllUsers, getUser } from "../controller/userController.mjs";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

router.use(auth);
router.get("/", getAllUsers);
router.get("/:userId", getUser);

export default router;
