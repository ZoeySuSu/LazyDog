import express from "express";
import jwt from "jsonwebtoken";
import pool from "../config/mysql.js";
import bcrypt from "bcrypt";
import multer from "multer";

const router = express.Router();
const upload = multer();
const secretKey = process.env.JWT_SECRET_KEY;

router.post("/login", upload.none(), async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) throw new Error("請提供帳號和密碼");

    // const db = await pool();
    const sql = "SELECT * FROM `users` WHERE email = ?;";
    const [users] = await pool.execute(sql, [email]);

    if (users.length === 0) throw new Error("找不到使用者");

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("帳號或密碼錯誤");

    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
      expiresIn: "1h",
    });
    res.status(200).json({
      status: "success",
      data: { token },
      message: "登入成功",
    });
  } catch (err) {
    console.log("伺服器錯誤:", err);
    res.status(400).json({
      status: "error",
      message: err.message ? err.message : "伺服器錯誤",
    });
  }
});

router.post("/register", upload.none(), async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  console.log(req.body);
  //   console.log("Email:", email);
  // console.log("Password:", password);
  // if (!email || !password || !confirmPassword) {
  //   return res
  //     .status(400)
  //     .json({ status: "error", message: "請填寫所有必填欄位" });
  // }
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ status: "error", message: "密碼和確認密碼不一致" });
  }

  try {
    // const db = await pool();
    console.log("資料庫連線成功");
    // 檢查用戶是否已經存在
    const [existUser] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    // console.log("查詢結果：", existUser);
    if (existUser.length > 0) {
      return res.status(400).json({ status: "fail", message: "用戶已存在" });
    }

    // 使用 bcrypt 加密密碼
    const hashedPassword = await bcrypt.hash(password, 10);

    // 取得當前時間
    const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");

    const sql =
      "INSERT INTO `users` (`email`, `password`, `created_at`) VALUES (?, ?, ?)";
    // console.log("要插入的 email:", email);
    // console.log("要插入的 password:", password);
    // 插入新用戶資料
    const [result] = await pool.execute(sql, [
      email,
      hashedPassword,
      createdAt,
    ]);

    console.log("插入結果:", result);
    // 註冊後返回成功訊息
    res
      .status(201)
      .json({ status: "success", data: { email }, message: "註冊成功" });
  } catch (err) {
    console.error("伺服器錯誤:", err);
    res.status(500).json({ status: "error", message: "伺服器錯誤" });
  }
});

router.post("/logout", checkToken, (req, res) => {
  const token = jwt.sign(
    {
      email: "",
    },
    secretKey,
    { expiresIn: "-10s" }
  );
  res.json({
    status: "success",
    data: { token },
    message: "登出成功",
  });
});

router.post("/status", checkToken, (req, res) => {
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
