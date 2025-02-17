import { createCommentS } from "../services/commentService.js";

export const createComment = async (req, res) => {
    const { content, article_id, user_id } = req.body;

    try {
        // 呼叫服務層函數來創建文章
        const article = await createCommentS({ content, article_id, user_id });

        // 返回創建成功的響應
        res.status(201).json({
            message: "留言創建成功",
            article
        });
    } catch (err) {
        // 如果有錯誤，返回錯誤響應
        res.status(500).json({
            message: "留言創建失敗",
            error: err.message
        });
    }

}
