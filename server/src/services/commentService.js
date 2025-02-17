import pool from "../config/mysql.js";


// 創建留言

export const createCommentS = async (createComment) => {
    const connection = await pool.getConnection();
    try {
      const { content, article_id, user_id } = createComment;
  
      // 開始事務
      await connection.beginTransaction();
  
      // 第一步：插入文章資料到 articles 資料表
      const [result] = await connection.query(
        `INSERT INTO comment 
            (content, article_id, user_id, create_time) 
            VALUES (?, ?, ?,NOW())`,
        [content, article_id, user_id]
      );
      // 提交事務
      await connection.commit();
  
      return {
        id: result.insertId,
        content,
        article_id,
        user_id,// 返回圖片 URL
      };
    } catch (err) {
      // 回滾事務
      await connection.rollback();
      throw new Error("文章創建失敗：" + err.message);
    } finally {
      connection.release();
    }
  };