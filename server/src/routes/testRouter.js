import express from "express";
import jwt from "jsonwebtoken";
import pool from "../config/mysql.js";
import bcrypt from "bcrypt";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const upload = multer();
const secretKey = process.env.JWT_SECRET_KEY;

if (!secretKey) {
  console.log(" JWT_SECRET_KEY 未設置，請檢查 .env 檔案");
  process.exit(1);
}

// 使用者註冊

router.post("/register", upload.none(), async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    console.log(email, password, confirmPassword);
    return res
      .status(400)
      .json({ status: "error", message: "請填寫所有必填欄位" });
   
  }
  if (password !== confirmPassword)
    return res
      .status(400)
      .json({ status: "error", message: "密碼和確認密碼不一致" });

  try {
    const [existUser] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existUser.length > 0)
      return res.status(400).json({ status: "error", message: "用戶已存在" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");

    const sql =
      "INSERT INTO `users` (`email`, `password`, `created_at`) VALUES (?, ?, ?)";

    await pool.execute(sql, [email, hashedPassword, createdAt]);

    res.status(201).json({ status: "success", message: "註冊成功" });
  } catch (err) {
    console.error("伺服器錯誤:", err);
    res.status(500).json({ status: "error", message: "伺服器錯誤" });
  }
});

// 使用者登入
router.post("/login", upload.none(), async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "error", message: "請提供信箱和密碼" });
    }

    const sql = "SELECT * FROM `users` WHERE email = ?;";
    const [users] = await pool.execute(sql, [email]);

    if (users.length == 0) {
      return res
        .status(404)
        .json({ status: "error", message: "找不到使用者，請先註冊" });
    }

    const user = users[0];

    if (!user.password.startsWith("$2b$")) {
      return res
        .status(401)
        .json({ status: "error", message: "出現錯誤請通知管理員" });
    }
    const isMatch = await bcrypt.compare(password.trim(), user.password);

    console.log(password);
    console.log(user.password);

    if (!isMatch) {
      return res.status(401).json({ status: "error", message: "密碼1錯誤" });
    }

    // 產生 JWT Token*
    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
      expiresIn: "5m",
    });

    res.status(200).json({
      status: "success",
      data: { token },
      message: "登入成功",
    });
  } catch (err) {
    console.error("伺服器錯誤:", err);
    res.status(500).json({ status: "error", message: "伺服器錯誤" });
  }
});

// 使用者登出 (前端自行刪除 Token)
router.post("/logout", checkToken, (req, res) => {
  res.json({
    status: "success",
    message: "登出成功，請刪除本地 Token",
  });
});

//驗證使用者是否登入 (Token refresh)
router.post("/api/users/status", checkToken, (req, res) => {
  const { decoded } = req;

  const token = jwt.sign(
    {
      id: decoded.id,
      email: decoded.email,
    },
    secretKey,
    { expiresIn: "30m" }
  );
  res.json({ status: "success", data: { token }, message: "登入中" });
});

//  Token 驗證
function checkToken(req, res, next) {
  let token = req.get("Authorization");
  if (!token)
    return res.json({
      status: "error",
      data: "",
      message: "無資料",
    });
  console.log(token);
  if (!token.startsWith("Bearer "))
    return res.json({
      status: "error",
      data: "",
      message: "驗證資料錯誤",
    });
  token = token.slice(7);
  console.log(token);
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err)
      return res.status(401).json({
        status: "error",
        data: "",
        message: "資料失效",
      });
    req.decoded = decoded;
    console.log(decoded);

    next();
  });
}

export default router;
