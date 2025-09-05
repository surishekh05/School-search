import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

// Create a pool connection to MySQL
const pool = mysql.createPool({
  host: "localhost",   // phpMyAdmin host
  user: "root",        // your MySQL username
  password: "",        // your MySQL password
  database: "schooldb" // database name
});

export default pool;
