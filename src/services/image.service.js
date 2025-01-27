import { BadRequestException } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";

const imageService = {
  //POST thêm một ảnh của user
  addImage: async (req) => {
    const image = await prisma.hinh_anh.create({
      data: {
        ten_hinh: req.body.ten_hinh,
        duong_dan: req.body.duong_dan,
        mo_ta: req.body.mo_ta,
        nguoi_dung_id: req.body.nguoi_dung_id,
      },
    });
    return image;
  },

  //GET danh sách ảnh về
  listImage: async () => {
    const images = await prisma.hinh_anh.findMany();
    if (images.length === 0) {
      return `There are no images on database`;
    }

    return images;
  },

  // Get anh theo ten
  nameImage: async (req) => {
    // console.log(req.params);
    const image = await prisma.hinh_anh.findFirst({
      where: {
        ten_hinh: req.body.ten_hinh,
      },
    });

    if (image === null) {
      return `There is no image with this name`;
    }

    return image;
  },

  // GET thông tin ảnh và người tạo ảnh bằng id ảnh
  infoImage: async (req) => {
    const image = await prisma.hinh_anh.findMany({
      include: {
        nguoi_dung: {
          select: {
            ho_ten: true,
            email: true,
          },
        },
      },
      where: {
        hinh_id: +req.params.id,
      },
    });

    if (image.length === 0) {
      return `There is no image in database`;
    }
    return image;
  },

  //GET thông tin đã lưu hình này chưa theo id ảnh (dùng để kiểm tra ảnh đã lưu hay chưa ở nút Save)
  checkSaveImage: async (req) => {
    const iamgeExist = await prisma.luu_anh.findFirst({
      where: {
        hinh_id: +req.params.id,
      },
    });

    if (!iamgeExist) {
      return `There is no information about saved image`;
    }
    return iamgeExist;
  },

  //GET danh sách ảnh đã lưu theo user id
  userSaveImage: async (req) => {
    const images = await prisma.hinh_anh.findMany({
      where: {
        nguoi_dung_id: +req.params.id,
      },
    });
    console.log(images);
    if (images.length === 0) {
      return `There is no information saved image with this user`;
    }
    return images;
  },

  // GET danh sách ảnh đã tạo theo user id
  userCreatedImage: async (req) => {
    // console.log(req.params);
    const images = await prisma.hinh_anh.findMany({
      where: {
        nguoi_dung_id: +req.params.id,
      },
    });

    if (images.length === 0) {
      return `There is no image created by user`;
    }
    return images;
  },

  //DELETE anh theo id anh
  deleteImage: async (req) => {
    console.log(req.params.id);
    await prisma.binh_luan.deleteMany({
      where: {
        hinh_id: +req.params.id,
      },
    });

    const image = await prisma.hinh_anh.deleteMany({
      where: {
        hinh_id: +req.params.id,
      },
    });
    console.log(image);

    if (image.count === 0) {
      throw new BadRequestException(`id ảnh không tồn tại để xóa`);
    }
    return image;
  },
};

export default imageService;
