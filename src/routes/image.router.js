import express from "express";
import imageController from "../controllers/image.controller.js";

const imageRouter = express.Router();
imageRouter.post(`/`, imageController.addImage);
imageRouter.get(`/list`, imageController.listImage);
imageRouter.get(`/name`, imageController.nameImage);
imageRouter.get(`/:id`, imageController.infoImage);
imageRouter.get(`/check/:id`, imageController.checkSaveImage);
imageRouter.get(`/user/:id`, imageController.userSaveImage);
imageRouter.get(`/userCreated/:id`, imageController.userCreatedImage);
imageRouter.delete(`/delete/:id`, imageController.deleteImage);

export default imageRouter;
