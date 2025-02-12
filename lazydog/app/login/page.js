"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "../components/layout/header";
import SocialLogin from "../components/auth/SocialLogin";
import InputField from "../components/forms/InputField";
import { useAuth } from "@/hooks/use-auth";

export default function AppPage({ logout }) {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login } = useAuth();
  const router = useRouter();

  // 點擊登入按鈕時的處理函式
  const handleLogin = async (e) => {
    e.preventDefault(); // 防止表單提交
    if (!email || !password) {
      alert("請填寫所有欄位");
      return;
    }
    try {
      await login(email, password); // 呼叫 useAuth 中的 login 函式
      // router.push("/pages"); // 登入成功後跳轉
    } catch (error) {
      alert("登入失敗，請檢查您的帳號或密碼！");
      console.error(error);
    }
  };

  useEffect(() => {
    if (!user) setCheckingAuth(false); // 檢查登入狀態
  }, [user]);

  if (checkingAuth) {
    return <></>; // 顯示載入中
  }

  return (
    <>
      <Header />
      <div className="lumi-login-wrapper">
        <div className="lumi-login-container">
          <div className="lumi-other-accounts">
            <h4 className="lumi-form-title">登入</h4>
            <div className="lumi-other-accounts-links">
              <Link
                href="/register"
                className="lumi-teacher text-decoration-none"
              >
                師資登入
              </Link>
              <Link
                href="/register"
                className="lumi-hotel text-decoration-none"
              >
                旅館業者登入
              </Link>
            </div>
          </div>
          <form className="lumi-login-form" onSubmit={handleLogin}>
            <InputField
              type="email"
              placeholder="電子信件"
              icon=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              type="password"
              placeholder="密碼"
              icon=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Link
              href="/pages/forgot-password"
              className="lumi-fogot-pass-link"
            >
              忘記密碼？
            </Link>
            <button className="lumi-login-button">
              登入
            </button>
            <p className="lumi-separator">
              <span>或使用社群帳號登入</span>
            </p>
            <SocialLogin />
          </form>
          <p className="lumi-signup-text">
            還不是會員？{" "}
            <Link href="/register" className="lumi-register">
              註冊
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
