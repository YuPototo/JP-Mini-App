import { useCreateNotebookMutation } from "@/features/notebook/notebookService";
import { navigate } from "@/utils/navigator/navigator";
import toast from "@/utils/toast/toast";
import { Input, View, Text, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";

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
        <View>
            <Text>名称</Text>
            <Input
                value={title}
                type="text"
                placeholder="输入笔记本名称"
                maxlength={10}
                onInput={e => setTitle(e.detail.value)}
                onConfirm={handleSubmit}
            />

            <Button disabled={disabled} onClick={handleSubmit}>
                创建
            </Button>
            <Button onClick={() => navigate(-1)}>返回</Button>
        </View>
    );
}
