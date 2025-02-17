import express from "express";
import multer from "multer";
import {
    createComment
} from '../controllers/commentController.js'
const router = express.Router();
const upload = multer();


router.post('/', upload.none(), createComment)

export default router;