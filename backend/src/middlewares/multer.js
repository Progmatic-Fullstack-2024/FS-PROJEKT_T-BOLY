import multer from "multer";

export const uploadToOwnServer = multer({
  storage: multer.diskStorage({
    destination: "upload/",
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  limits: { fileSize: 5000000 },
});

export const upload = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 5000000 },
});
