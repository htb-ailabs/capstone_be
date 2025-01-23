import {
  responseError,
  responseSuccess,
} from "../common/helpers/response.helper.js";
import imageService from "../services/image.service.js";

const imageController = {
  // POST thêm một ảnh của user
  addImage: async (req, res, next) => {
    try {
      console.log(req.body);
      const data = await imageService.addImage(req);
      const resData = responseSuccess(data, `API add image is OK`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      const errorData = responseError(error.message, error.code, error.stack);
      res.json(errorData);
      next(error);
    }
  },

  // GET danh sách ảnh về
  listImage: async (req, res, next) => {
    try {
      const data = await imageService.listImage();
      const resData = responseSuccess(data, `API get all images is OK`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      const errorData = responseError(error.message, error.code, error.stack);
      res.json(errorData);
      next(error);
    }
  },

  // GET tìm kiếm danh sách ảnh theo tên
  nameImage: async (req, res, next) => {
    try {
      const data = await imageService.nameImage(req);
      const resData = responseSuccess(data, `API get image by name is OK`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      const errorData = responseError(error.message, error.code, error.stack);
      res.json(errorData);
      next(error);
    }
  },

  // GET thông tin ảnh và người tạo ảnh bằng id ảnh
  infoImage: async (req, res, next) => {
    try {
      const data = await imageService.infoImage(req);
      const resData = responseSuccess(
        data,
        `API get info image and created user is OK`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      const errorData = responseError(error.message, error.code, error.stack);
      res.json(errorData);
      next(error);
    }
  },

  //GET thông tin đã lưu hình này chưa theo id ảnh (dùng để kiểm tra ảnh đã lưu hay chưa ở nút Save)
  checkSaveImage: async (req, res, next) => {
    try {
      const data = await imageService.checkSaveImage(req);
      const resData = responseSuccess(data, `API save image by id is OK`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      const errorData = responseError(error.message, error.code, error.stack);
      res.json(errorData);
      next(error);
    }
  },

  //GET danh sách ảnh đã lưu theo user id
  userSaveImage: async (req, res, next) => {
    try {
      const data = await imageService.userSaveImage(req);
      const resData = responseSuccess(
        data,
        `API get list of saved images is OK`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      const errorData = responseError(error.message, error.code, error.stack);
      res.json(errorData);
      next(error);
    }
  },

  //GET danh sách ảnh đã tạo theo user id
  userCreatedImage: async (req, res, next) => {
    try {
      console.log(req.params);
      const data = await imageService.userCreatedImage(req);
      const resData = responseSuccess(
        data,
        `API get list images created by user is OK`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      const errorData = responseError(error.message, error.code, error.stack);
      res.json(errorData);
      next(error);
    }
  },

  //DELETE xóa ảnh đã tạo theo id ảnh
  deleteImage: async (req, res, next) => {
    try {
      const data = await imageService.deleteImage(req);
      const resData = responseSuccess(data, `API delete image is OK`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      const errorData = responseError(error.message, error.code, error.stack);
      res.json(errorData);
      next(error);
    }
  },
};

export default imageController;
