import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Paragraph from '@editorjs/paragraph';

const Editor = () => {
    const editorInstance = useRef(null);

    useEffect(() => {
        if (!editorInstance.current) {
            editorInstance.current = new EditorJS({
                holder: "editorjs",
                tools: {
                    header: {
                        class: Header,
                        config: { levels: [2, 3, 4], defaultLevel: 3 },
                    },
                    paragraph: {
                        class: Paragraph,
                        inlineToolbar: true
                    },
                    list: {
                        class: List,
                        inlineToolbar: true,
                    },
                    image: {
                        class: ImageTool,
                        config: {
                            uploader: {
                                uploadByFile(file) {
                                    return new Promise((resolve) => {
                                        const reader = new FileReader();
                                        reader.onload = (event) => {
                                            resolve({
                                                success: 1,
                                                file: { url: event.target.result }, // 直接預覽圖片
                                            });
                                        };
                                        reader.readAsDataURL(file);
                                    });
                                },
                            },
                        },
                    },
                },
            });
        }

        return () => {
            if (editorInstance.current) {
                editorInstance.current.destroy();
                editorInstance.current = null;
            }
        };
    }, []);

    return <div id="editorjs" className="w-full border p-4"></div>;
};

export default Editor;
