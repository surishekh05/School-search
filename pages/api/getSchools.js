import pool from "./db.js";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const [rows] = await pool.query("SELECT * FROM schools ORDER BY id DESC");
      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching schools" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
