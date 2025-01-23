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
      const resData = responseSuccess(data, `Them anh thanh cong`, 200);
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
      const resData = responseSuccess(data, `get all images successfully`, 200);
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
      const resData = responseSuccess(
        data,
        `hinh anh theo ten duoc tim thay`,
        200
      );
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
        `lấy thông tin ảnh thành công`,
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
      const resData = responseSuccess(data, `Hình đã được lưu`, 200);
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
        `lay danh sach anh theo user thanh cong`,
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
        `lay danh sach anh theo user thanh cong`,
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
      const resData = responseSuccess(
        data,
        `xóa hình ảnh theo id thành công`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      const errorData = responseError(error.message, error.code, error.stack);
      res.json(errorData);
      next(error);
    }
  },
};

export default imageController;
