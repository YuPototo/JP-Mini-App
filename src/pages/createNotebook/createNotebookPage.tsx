import { useCreateNotebookMutation } from "@/features/notebook/notebookService";
import { navigate } from "@/utils/navigator/navigator";
import toast from "@/utils/toast/toast";
import { Input, View, Text, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import clsx from "clsx";
import { useState } from "react";
import styles from "./createNotebookPage.module.scss";

export default function createNotebookPage() {
    const [title, setTitle] = useState("");

    const [createNotebook, { isLoading }] = useCreateNotebookMutation();

    const handleSubmit = async () => {
        try {
            toast.loading("创建中...");
            await createNotebook(title).unwrap();
            setTitle("");
            navigate(-1);
        } catch (err) {
            // 在 middleware 处理了
        } finally {
            Taro.hideLoading();
        }
    };

    const disabled = title === "" || isLoading;

    return (
        <View className="page">
            <Text className={styles.heading}>创建笔记本</Text>
            <Input
                className={styles.input}
                value={title}
                type="text"
                placeholder="输入笔记本名称"
                maxlength={10}
                onInput={(e) => setTitle(e.detail.value)}
                onConfirm={handleSubmit}
            />

            <Button
                className={clsx("btn btn-primary", styles.topBtn)}
                disabled={disabled}
                onClick={handleSubmit}
            >
                创建
            </Button>

            <Button
                className="btn btn-secondary--outline"
                onClick={() => navigate(-1)}
            >
                返回
            </Button>
        </View>
    );
}
