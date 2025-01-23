import express from "express";
import commentController from "../controllers/comment.controller.js";

const commentRouter = express.Router();

commentRouter.post("/", commentController.addComment);
commentRouter.get(`/comment-id-image/:id`, commentController.listComment);

export default commentRouter;
