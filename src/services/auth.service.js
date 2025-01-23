import {
  BadRequestException,
  UnauthorizationException,
} from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRED,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRED,
  REFRESH_TOKEN_SECRET,
} from "../common/constants/app.constant.js";

const authService = {
  // login
  login: async (req) => {
    const { email, mat_khau } = req.body;
    const userExists = await prisma.nguoi_dung.findFirst({
      where: { email: email },
    });

    if (!userExists) {
      throw new BadRequestException(
        `tai khoan khong ton tai, vui long dang ky`
      );
    }

    if (!userExists.mat_khau) {
      throw new BadRequestException(`vui long dang nhap lai tai khoan`);
    }

    const isPassword = await bcrypt.compareSync(mat_khau, userExists.mat_khau);
    if (!isPassword) {
      throw new BadRequestException(`password kg chinh xac`);
    }

    const tokens = authService.createTokens(userExists.nguoi_dung_id);
    return tokens;
  },

  // register
  register: async (req) => {
    // bước 1: nhận dữ liệu: full_name, email, password
    const { email, mat_khau, ho_ten, tuoi } = req.body;
    // console.log({ full_name, email, pass_word });
    // bước 2: lấy email và kiểm tra trong db, nếu đã có thì báo đã tồn tại
    const userExist = await prisma.nguoi_dung.findFirst({
      where: { email: email },
    });
    // console.log({ userExist });
    if (userExist) {
      throw new BadRequestException(`tai khoan da ton tai`);
    }
    // ma hoa password
    const passHash = bcrypt.hashSync(mat_khau, 10);
    // bước 3: tạo người dùng mới
    const userNew = await prisma.nguoi_dung.create({
      data: {
        email: email,
        mat_khau: passHash,
        ho_ten: ho_ten,
        tuoi: tuoi,
      },
    });
    // xoa password khi tra ve de khong bi hack
    delete userNew.mat_khau;
    // bước 4: trả kết quả thành công
    return userNew;
  },

  // list all user information
  userList: async (params) => {
    const users = await prisma.nguoi_dung.findMany();
    if (users.length === 0) {
      return `No user in database`;
    }
    return users;
  },

  // update user
  userUpdate: async (req) => {
    const { id } = req.params;
    const { ho_ten, tuoi } = req.body;
    const userExist = await prisma.nguoi_dung.findFirst({
      where: {
        nguoi_dung_id: +id,
      },
    });

    if (!userExist) {
      throw new BadRequestException(`tai khoan khong ton tai`);
    }

    const userNew = await prisma.nguoi_dung.update({
      where: {
        nguoi_dung_id: +id,
      },
      data: {
        ho_ten: ho_ten,
        tuoi: tuoi,
      },
    });
    return userNew;
  },

  // function create token
  createTokens: (userId) => {
    if (!userId) throw new BadRequestException(`kg co userId de tao token`);
    const accessToken = jwt.sign({ userId: 2 }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRED,
    });

    const refreshToken = jwt.sign({ userId: 2 }, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRED,
    });

    return { accessToken: accessToken, refreshToken: refreshToken };
  },

  // refresh token
  refreshToken: async (req) => {
    const refreshToken = req.headers.authorization?.split(" ")[1];
    if (!refreshToken) {
      throw new UnauthorizationException(
        `Vui lòng cung cấp token để tiếp tục sử dụng`
      );
    }

    const accessToken = req.headers[`x-access-token`];
    if (!accessToken) {
      throw new UnauthorizationException(
        `Vui lòng cung cấp token để tiếp tục sử dụng`
      );
    }

    console.log({
      refreshToken,
      accessToken,
    });

    const decodeRefeshToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

    const decodeAccessToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET, {
      ignoreExpiration: true,
    });

    console.log({
      decodeRefeshToken,
      decodeAccessToken,
    });

    if (decodeRefeshToken.userId !== decodeAccessToken.userId) {
      throw new UnauthorizationException(`Cặp Token không hợp lệ`);
    }

    const userExists = await prisma.users.findUnique({
      where: {
        user_id: decodeRefeshToken.userId,
      },
    });

    if (!userExists) throw new UnauthorizationException(`User không tồn tại`);

    const tokens = authService.createTokens(userExists.user_id);

    return tokens;
  },
};

export default authService;
