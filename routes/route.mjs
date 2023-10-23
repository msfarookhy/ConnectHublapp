import express from "express";

import { authUser, registerUser } from "../controllers/userController.mjs";
import subUserController from "../controllers/subUserController.mjs";


const router = express.Router();        

router.route("/signup").post (registerUser);
router.post("/login", authUser);

// routes for CRUD operations
router.get("/get_sub_users", subUserController.getSubUsers);

router.route("/add_sub_user").post( subUserController.addSubUser);
router.get("/get_sub_user/:_id", subUserController.getSubUsersById);
router.get("/get_filtered_sub_users", subUserController.getUsersByLastModified);

router.put("/update_user/:id", subUserController.updateSubUsersById);
router.delete("/delete_user/:id", subUserController.deleteSubUser);


export default router;
