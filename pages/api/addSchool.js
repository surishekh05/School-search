import { createRouter } from "next-connect";
import multer from "multer";
import path from "path";
import mysql from "mysql2/promise";

// --- MySQL connection setup ---
const pool = mysql.createPool({
    host: "localhost",   // phpMyAdmin host
    user: "root",        // MySQL username
    password: "",        // MySQL password
    database: "schooldb" // database name
});

// --- Multer config: store images in public/schoolImages ---
const upload = multer({
    storage: multer.diskStorage({
        destination: "./public/schoolImages",
        filename: (req, file, cb) =>
            cb(null, Date.now() + path.extname(file.originalname)), // unique filename
    }),
});

// --- API Router ---
const router = createRouter();

// Apply multer middleware
router.use(upload.single("image"));

// POST route
router.post(async (req, res) => {

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    try {

        console.log("Uploaded file:", req.file);


        const { name, address, city, state, contact, email_id } = req.body;

        // Uploaded file path (for DB)
        const imagePath = req.file ? `/schoolImages/${req.file.filename}` : null;

        // Insert into MySQL
        const [result] = await pool.query(
            "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [name, address, city, state, contact, email_id, imagePath]
        );

        res.status(200).json({
            message: "School added successfully",
            id: result.insertId,
        });
    } catch (error) {
        console.error("Error inserting school:", error);
        res.status(500).json({ message: "Error inserting school" });
    }
});

// Disable Next.js body parsing (multer handles it)
export const config = {
    api: {
        bodyParser: false,
    },
};

// Export handler
export default router.handler({
    onError(error, req, res) {
        res.status(501).json({ error: `Upload error: ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' not allowed` });
    },
});
