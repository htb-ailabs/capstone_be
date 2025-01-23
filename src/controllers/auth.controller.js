import {
  responseError,
  responseSuccess,
} from "../common/helpers/response.helper.js";
import authService from "../services/auth.service.js";

const authController = {
  register: async (req, res, next) => {
    try {
      const users = await authService.register(req);
      // console.log(users);

      const resData = responseSuccess(users, `add user successfully`, 200);

      res.status(resData.code).json(resData);
    } catch (error) {
      const errorData = responseError(error.message, error.code, error.stack);
      res.json(errorData);
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const data = await authService.login(req);
      const resData = responseSuccess(data, `FB Login successfully`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      // const errorData = responseError(error.message, error.code, error.stack);
      // res.status(errorData.code).json(errorData);
      next(error);
    }
  },

  // get all users
  users: async (req, res, next) => {
    try {
      const data = await authService.userList();
      const resData = responseSuccess(data, `API get all users is OK`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  // update user
  userUpdate: async (req, res, next) => {
    try {
      const data = await authService.userUpdate(req);
      const resData = responseSuccess(data, `Update user successfully`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
