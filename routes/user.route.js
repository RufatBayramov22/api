import express from "express";
import { deleteUser, getUsers, profilePosts, savePost, updateUser } from "../controllers/user.controller.js";
// import {verifyToken} from "../middleware/verifyToken.js"

const router = express.Router();

router.get("/", getUsers);
// router.get("/:id", verifyToken, getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/save" , savePost)
router.get("/profilePosts", profilePosts)



export default router;