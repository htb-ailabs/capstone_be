import { BadRequestException } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";

const commentService = {
  //POST để lưu thông tin bình luận của người dùng với hình ảnh
  addComment: async (req) => {
    const { nguoi_dung_id, hinh_id, noi_dung } = req.body;
    const comment = await prisma.binh_luan.create({
      data: {
        nguoi_dung_id: nguoi_dung_id,
        hinh_id: hinh_id,
        noi_dung: noi_dung,
      },
    });

    if (!comment) {
      return `Add comment is unsuccessfully`;
    }

    return comment;
  },

  //GET thông tin bình luận theo id ảnh
  listComment: async (req) => {
    const comments = await prisma.binh_luan.findMany({
      where: {
        hinh_id: +req.params.id,
      },
    });

    if (comments.length === 0) {
      return `There is no comment for this image`;
    }
    return comments;
  },
};

export default commentService;
