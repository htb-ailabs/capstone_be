import {
  responseError,
  responseSuccess,
} from "../common/helpers/response.helper.js";
import commentService from "../services/comment.service.js";

const commentController = {
  // POST để lưu thông tin bình luận của người dùng với hình ảnh
  addComment: async (req, res, next) => {
    try {
      console.log(req.body);
      const data = await commentService.addComment(req);
      const resData = responseSuccess(data, `them binh luan thanh cong`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      const errorData = responseError(error.message, error.code, error.stack);
      res.json(errorData);
      next(error);
    }
  },

  // GET thông tin bình luận theo id ảnh
  listComment: async (req, res, next) => {
    try {
      const data = await commentService.listComment(req);
      const resData = responseSuccess(
        data,
        `lấy danh sách bình luận theo id ảnh thành công`,
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

export default commentController;
