import React, { useState } from 'react';
import styles from '../../teacher/list/list.module.css';

const Filter = () => {
    return (
      <aside className={`mt-4 ${styles["pdFilter"]}`}>
        <table className={styles.pdFilterTable}>
          <tr>
            <td className={`${styles.tdTable} ${styles.searchTable}`}>
              <img src="./img/font/search.png" alt="" />
              <p className={styles.searchP}>搜尋商品</p>
            </td>
          </tr>
          <tr>
            <td className={`${styles.tdTable} ${styles.menuTable}`}>
              <h5>課程類別</h5>
              <img src="./img/font/down.png" alt="" />
            </td>
          </tr>
          <tr>
            <td className={`${styles.tdTable} ${styles.checkboxTable}`}>
              <input id="train" type="checkbox" />
              <label htmlFor="train">寵物訓練</label>
            </td>
          </tr>
          <tr>
            <td className={`${styles.tdTable} ${styles.checkboxTable}`}>
              <input id="eat" type="checkbox" />
              <label htmlFor="eat" className={styles.checkboxLabel}>
                寵膳食育
              </label>
            </td>
          </tr>
          <tr>
            <td className={`${styles.tdTable} ${styles.checkboxTable}`}>
              <input id="salon" type="checkbox" />
              <label htmlFor="salon" className={styles.checkboxLabel}>
                寵物美容
              </label>
            </td>
          </tr>
          <tr>
            <td className={`${styles.tdTable} ${styles.checkboxTable}`}>
              <input id="beef" type="checkbox" />
              <label htmlFor="beef" className={styles.checkboxLabel}>
                寵物照護
              </label>
            </td>
          </tr>
          <tr>
            <td className={`${styles.tdTable} ${styles.checkboxTable}`}>
              <input id="bussiness" type="checkbox" />
              <label htmlFor="bussiness" className={styles.checkboxLabel}>
                商業思維與專業培訓
              </label>
            </td>
          </tr>
          <tr>
            <td className={`${styles.tdTable} ${styles.menuTable}`}>
              <h5>老師性別</h5>
              <img src="./img/font/down.png" alt="" />
            </td>
          </tr>
          <tr>
            <td className={`${styles.tdTable} ${styles.checkboxTable}`}>
              <input id="male" type="checkbox" />
              <label htmlFor="male" className={styles.checkboxLabel}>
                男
              </label>
            </td>
          </tr>
          <tr>
            <td className={`${styles.tdTable} ${styles.checkboxTable}`}>
              <input id="female" type="checkbox" />
              <label htmlFor="female" className={styles.checkboxLabel}>
                女
              </label>
            </td>
          </tr>
          <tr>
            <td className={`${styles.tdTable} ${styles.checkboxTable}`}>
              <button className={styles.clear}>清除搜尋</button>
            </td>
          </tr>
        </table>
        {/* <div className={styles.con1}>廣告</div> */}
        <a href="">
          <figure>
            <img
              src="/product/DM/DM_aside.png"
              alt="廣告"
              className="img-fluid"
            />
          </figure>
        </a>
      </aside>
    );
};

export default Filter;
