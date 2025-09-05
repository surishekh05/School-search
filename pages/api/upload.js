import nextConnect from "next-connect";
import multer from "multer";
import path from "path";

// Store images inside public/schoolImages
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/schoolImages",
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Upload error: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});

apiRoute.use(upload.single("image"));

apiRoute.post((req, res) => {
  res.status(200).json({ filePath: `/schoolImages/${req.file.filename}` });
});

export default apiRoute;
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
