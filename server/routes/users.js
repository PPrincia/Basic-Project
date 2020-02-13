import express from "express";
import userController from "../Controllers/users";


const router  = express.Router();

router.post("/signup", userController.signup);
router.post("/login",userController.login);
router.get("/findAllUsers",userController.findAllUsers);
router.get("/findUser",userController.findUser);
router.delete("/deleteUser",userController.deleteUser);



export default router;