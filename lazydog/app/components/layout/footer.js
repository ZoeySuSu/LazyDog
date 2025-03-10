"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../../../styles/modules/footer.module.css";
// import styles from "../../styles/modules/footerGlobals.module.css"

export default function Footer(props) {
  return (
    <>
      <div className={styles.wavesContainer}>
        <svg
          className={styles.waves}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shape-rendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className={styles.parallax}>
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="#f5832B" />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(245, 131, 43, 0.7)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(245, 131, 43, 0.5)"
            />
          </g>
        </svg>
      </div>

      <footer className={`${styles.footer}`}>
        {/* <section className={styles.footerTop}>
          <img
            className={styles.topWave}
            src="/footer/img/footer_top.png"
            alt=""
          />
        </section> */}

        <div className={`pd-1 ${styles.bag}`}>
          <section className={`${styles.wrapper} ${styles.footerMiddle}`}>
            <ul className={`p-0 ${styles.infos}`}>
              <li className={styles.footerList1}>
                <Link href="/home" className={`${styles.connects}`}>
                  <figure className="d-flex align-items-center">
                    <img
                      className={styles.logoPic}
                      src="/footer/img/logo_pic(white).png"
                    />
                    <span className={`ms-3 ${styles.lazydog}`}>LAZYDOG</span>
                  </figure>
                </Link>
                <article className={styles.place}>
                  <div className={styles.address}>
                    <p className={styles.addInfo}>
                      320桃園市中壢區新生路二段421號
                    </p>
                    <p className={styles.addInfo}>03-4532632</p>
                  </div>
                  <div className={styles.time}>
                    <p className={styles.timeInfo}>
                      營業期間：09:30-19:30
                      <br />
                      入住時間：15:00-19:00
                      <br />
                      退房時間：11:00-14:00
                    </p>
                  </div>
                </article>
              </li>
              <li className={styles.footerListGroup}>
                <div className={styles.footerList2}>
                  <h2 className={styles.clientService}>客戶服務</h2>
                  <p>
                    <Link href="/home" className={styles.service}>
                      關於LAZYDOG
                    </Link>
                  </p>
                  <p>
                    <Link href="/product" className={styles.service}>
                      寵物週邊
                    </Link>
                  </p>
                  <p>
                    <Link
                      href="/hotel-coupon/fonthotelHome"
                      className={styles.service}
                    >
                      線上訂房
                    </Link>
                  </p>
                  <p>
                    <Link href="/teacher" className={styles.service}>
                      寵物課程
                    </Link>
                  </p>
                  <p>
                    <Link href="/article" className={styles.service}>
                      毛孩新知
                    </Link>
                  </p>
                </div>
                <div className={styles.footerList3}>
                  <h1 className={styles.clientService}>其他服務</h1>
                  <p>
                    <Link href="/hotel-coupon" className={styles.service}>
                      會員集點
                    </Link>
                  </p>
                  <p>
                    <Link href="/hotel-coupon" className={styles.service}>
                      優惠券
                    </Link>
                  </p>
                  <p>
                    <Link href="#" className={styles.service}>
                      常見問題
                    </Link>
                  </p>
                </div>
              </li>
              <li className={styles.footerList4}>
                <form className={styles.footerEmail} action="">
                  <input
                    className={styles.enterMail}
                    type="text"
                    placeholder="Enter your email"
                  />
                  <button className={styles.planeBtn}>
                    <img src="/footer/img/plane.png" alt="" />
                  </button>
                </form>
                <p className={styles.discount}>
                  輸入Email~首次購買即可享 15% 折扣！
                </p>
                <div className={styles.footerIcon}>
                  <Link href="#">
                    <img
                      className={styles.icons}
                      src="/footer/img/FB.png"
                      alt=""
                    />
                  </Link>
                  <Link href="#">
                    <img
                      className={styles.icons}
                      src="/footer/img/IG.png"
                      alt=""
                    />
                  </Link>
                  <Link href="#">
                    <img
                      className={styles.icons}
                      src="/footer/img/YT.png"
                      alt=""
                    />
                  </Link>
                </div>
              </li>
            </ul>
          </section>
          <section className={`${styles.footerBottom}`}>
            COPYRIGHT © 2024 &nbsp;LAZYDOG&nbsp;
          </section>
        </div>
      </footer>
    </>
  );
}
