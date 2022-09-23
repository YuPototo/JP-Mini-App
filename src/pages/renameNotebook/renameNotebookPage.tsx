import {
    useGetNotebooksQuery,
    useUpdateNotebookMutation
} from "@/features/notebook/notebookService";
import { Button, Input, View, Text } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import { useState } from "react";

export default function renameNotebookPage() {
    const router = useRouter();

    const { notebookId } = router.params as { notebookId: string };
    const [title, setTitle] = useState("");

    const [renameNotebook, { isLoading }] = useUpdateNotebookMutation();

    const handleSubmit = async () => {
        try {
            Taro.showLoading();
            await renameNotebook({ notebookId, title }).unwrap();
            Taro.showToast({ title: "修改成功", icon: "success" });
            setTitle("");
            setTimeout(() => {
                Taro.navigateBack();
            }, 1000);
        } catch (err) {
            // 在 middleware 处理了
        } finally {
            Taro.hideLoading();
        }
    };

    const { data: notebooks } = useGetNotebooksQuery(undefined);

    const notebook = notebooks?.find(el => el.id === notebookId);

    if (!notebook) {
        return <View>加载中...</View>;
    }

    const disableButton = title === "" || isLoading;

    return (
        <View>
            <View>
                <Text>笔记本：{notebook.title} </Text>
            </View>
            <Text>新名称</Text>
            <Input
                value={title}
                type="text"
                placeholder="输入笔记本名称"
                maxlength={10}
                onInput={e => setTitle(e.detail.value)}
                onConfirm={handleSubmit}
            />

            <Button disabled={disableButton} onClick={handleSubmit}>
                确认改名
            </Button>
            <Button onClick={() => Taro.navigateBack()}>返回</Button>
        </View>
    );
}
