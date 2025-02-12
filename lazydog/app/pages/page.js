"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/use-auth";
import Header from "../components/layout/header"; 
import MyMenu from "../components/layout/myMenu"; 
import Input from "../components/forms/Input"; 
import styles from "./menu.module.css";

export default function Menu() {
     const [checkingAuth, setCheckingAuth] = useState(true);
     const { user } = useAuth();

     useEffect(() => {
       if (user) setCheckingAuth(false);
     }, [user]);

    //  if (checkingAuth) {
    //    return (
    //      <div className={styles.container}>
    //        <div className={styles.loader27}></div>
    //      </div>
    //    );
    //  }
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    nickname: "",
    birthdate: "",
    workPhone: "",
    email: "",
    location: "",
    city: "",
    district: "",
    road: "",
    section: "",
    lane: "",
    number: "",
    floor: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <Header />
      <div className="lumi-wrapper">
        <MyMenu />
        <div className={`${styles["container"]}`}>
          <h4 className={`mb-4 ${styles["information"]}`}>基本資料</h4>
          <form onSubmit={handleSubmit} className={styles["form-container"]}>
            <div className={styles.formGroup}>
              <h6>
                姓名<span className={`${styles["important"]}`}> *</span>
              </h6>
              <Input
                name="name"
                placeholder="姓名"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <h6>
                性別<span className={`${styles["important"]}`}> *</span>
              </h6>
              <Input
                name="gender"
                placeholder="性別"
                value={formData.gender}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <h6>暱稱</h6>
              <Input
                name="nickname"
                placeholder="暱稱"
                value={formData.nickname}
                onChange={handleChange}
              />
              <h6>
                生日<span className={`${styles["important"]}`}> *</span>
              </h6>
              <Input
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.phone}`}>
              <h6>
                聯絡電話<span className={`${styles["important"]}`}> *</span>
              </h6>
              <Input
                name="workPhone"
                placeholder="聯絡電話"
                value={formData.workPhone}
                onChange={handleChange}
              />
              <h6>
                聯絡信箱<span className={`${styles["important"]}`}> *</span>
              </h6>
              <Input
                type="email"
                name="email"
                placeholder="聯絡信箱"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <h6>
                所在地區<span className={`${styles["important"]}`}> *</span>
              </h6>
              <Input
                name="location"
                placeholder="所在地區"
                value={formData.location}
                onChange={handleChange}
              />
              <div className={styles.addressRow}>
                <select
                  name="city"
                  className={`mb-3 me-2 ${styles["select"]}`}
                  onChange={handleChange}
                  value={formData.city}
                >
                  <option>縣/市</option>
                  <option>台北市</option>
                  <option>新北市</option>
                </select>
                <select
                  name="district"
                  className={`${styles["select"]}`}
                  onChange={handleChange}
                  value={formData.district}
                >
                  <option>街/區</option>
                </select>
                <Input
                  name="road"
                  placeholder="路"
                  value={formData.road}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.addressRow}>
                <Input
                  name="section"
                  placeholder="段"
                  value={formData.section}
                  onChange={handleChange}
                />
                <Input
                  name="lane"
                  placeholder="巷/弄"
                  value={formData.lane}
                  onChange={handleChange}
                />
                <Input
                  name="number"
                  placeholder="號"
                  value={formData.number}
                  onChange={handleChange}
                />
                <Input
                  name="floor"
                  placeholder="樓"
                  value={formData.floor}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button type="submit" className={styles.exStore}>
              取消
            </button>
            <button type="submit" className={styles.store}>
              儲存
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
