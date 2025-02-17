import { getArticlesS, getIdS, createArticlesS, deleteArticleS, updateArticleS, searchKeywordS } from "../services/articleService.js";

// getIdS, createArticlesS, updateArticleS, deleteArticleS searchKeywordS

// 獲取所有文章
export const getArticles = async (req, res) => {
    try {
        const articles = await getArticlesS();
        if (articles.length === 0) {
            return res.status(404).json({ error: "找不到全部文章" });
        }
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 取得指定文章
export const getId = async (req, res) => {
    const { id } = req.params;
    try {
        const results = await getIdS(id)
        // console.log(results)
        if (!results || results.length === 0) {
            return res.status(404).json({ message: "文章不存在" });
        }
        // 組合資料
        const article = {
            id: results[0].id,
            title: results[0].title,
            content: results[0].content,
            cover_image: results[0].cover_image,
            author_name: results[0].author_name,
            category_name: results[0].category_name,
            comments: []
        };
        // console.log(article)

        const commentMap = new Map(); // 用 Map 避免重複

        results.forEach(row => {
            if (row.comment_id && !commentMap.has(row.comment_id)) {
                commentMap.set(row.comment_id, {
                    content: row.comment_content,
                    author: row.commenter_name,
                    author_img:row.commenter_img
                });
            }
        });

        article.comments = Array.from(commentMap.values());
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 創建文章

export const createArticle = async (req, res) => {
    const { title, content, author_id, category_id, article_img } = req.body;

    try {
        // 呼叫服務層函數來創建文章
        const article = await createArticlesS({ title, content, author_id, category_id, article_img });

        // 返回創建成功的響應
        res.status(201).json({
            message: "文章創建成功",
            article
        });
    } catch (err) {
        // 如果有錯誤，返回錯誤響應
        res.status(500).json({
            message: "文章創建失敗",
            error: err.message
        });
    }

}

// 編輯文章

export const updateArticle = async (req, res) => {
    const { id } = req.params;  // 從 URL 參數中獲取文章的 ID
    const { title, content, author_id, category_id, article_img } = req.body;
  
    try {
      // 呼叫服務層來更新文章資料
      const updatedArticle = await updateArticleS({
        id, title, content, author_id, category_id, article_img
      });
  
      // 返回成功響應
      res.status(200).json({
        message: "文章更新成功",
        article: updatedArticle
      });
    } catch (err) {
      // 返回錯誤響應
      res.status(500).json({
        message: "文章更新失敗",
        error: err.message
      });
    }
  };


// export const updateArticle = async (req, res) => {
//     const { id } = req.params;  // 從 URL 參數獲取文章 ID
//     const { title, content, author_id, category_id } = req.body;  // 從 body 獲取其他資料
//     console.log(id);
//     console.log(req.body);
//     // 確保必須的資料都有提供
//     if (!title || !content || !author_id || !category_id) {
//         return res.status(400).json({ error: '缺少必要的文章資訊' });
//     }

//     try {
//         // 調用 service 層更新文章
//         const result = await updateArticleS(id, title, content, author_id, category_id, res);
//         console.log(result);
//         if (result.success) {
//             res.json({ message: result.message, id });
//         } else {
//             res.status(404).json({ error: result.message });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: '伺服器錯誤，請稍後再試' });
//     }
// };


// 刪除文章
export const deleteArticle = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        // console.log("Article ID:", id);
        const article = await deleteArticleS(id);
        console.log(101);
        console.log(article);
        // if (!article) {
        //     return res.status(404).json({ error: "文章未找到" });
        // }
        console.log(37);

        return res.json({ message: "文章刪除成功", deletedArticle: article }); // 成功刪除
    } catch (error) {
        return res.status(500).json({ error: error.message + "是我這裡出問題" });
        // console.log("捕獲到的錯誤:", error);
    }
};

// 搜尋文章
// export const searchKeyword = async (req, res) => {
//     try {
//         const { keyword } = req.query;
//         if (!keyword) throw new Error("找不到關鍵字");
//         const articles = await searchKeywordS(keyword);
//         if (!articles.length) throw new Error("查無相關文章");
//         res.status(200).json({
//             status: "success",
//             data: articles,
//             message: `查詢： ${keyword} 成功，共${articles.length}筆資料`,
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }


export const searchKeyword = async (req, res) => {
  const { keyword } = req.query;  // 从请求中获取搜索关键字
  
  try {
    // 调用搜索函数获取文章数据
    const articles = await searchKeywordS(keyword);

    if (articles.length === 0) {
      return res.status(404).json({ message: "没有找到相关的文章。" });
    }

    // 使用一个对象来去重文章，文章的 id 作为键
    const uniqueArticles = {};

    // 遍历所有文章，去除重复的文章
    articles.forEach(article => {
      if (!uniqueArticles[article.id]) {
        // 如果文章没有重复，就加入到 uniqueArticles 对象中
        uniqueArticles[article.id] = {
          id: article.id,
          title: article.title,
          content: article.content,
          cover_image: article.cover_image,
          category_name: article.category_name,
          comments: []
        };
      }

      // 处理文章的评论
      if (article.comment_id) {
        // 将评论信息添加到对应文章的评论列表中
        uniqueArticles[article.id].comments.push({
          content: article.comment_content,
          author: article.commenter_name,
          author_img: article.commenter_img || null,
        });
      }
    });

    // 返回去重后的文章数据
    const result = Object.values(uniqueArticles);

    return res.status(200).json(result);

  } catch (error) {
    console.error("搜索文章时出错:", error);
    return res.status(500).json({ error: "搜索文章时出错：" + error.message });
  }
};

