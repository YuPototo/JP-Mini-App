import {
    useGetNotebooksQuery,
    useUpdateNotebookMutation,
} from "@/features/notebook/notebookService";
import { navigate } from "@/utils/navigator/navigator";
import toast from "@/utils/toast/toast";
import { Input, View } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import { useState } from "react";
import clsx from "clsx";
import styles from "./renameNotebook.module.scss";

export default function renameNotebookPage() {
    const router = useRouter();

    const { notebookId } = router.params as { notebookId: string };
    const [title, setTitle] = useState("");

    const [renameNotebook, { isLoading }] = useUpdateNotebookMutation();

    const disableButton = title === "" || isLoading;

    const handleSubmit = async () => {
        if (disableButton) return;

        try {
            toast.loading();
            await renameNotebook({ notebookId, title }).unwrap();
            toast.success("修改成功");
            setTitle("");
            setTimeout(() => {
                navigate(-1);
            }, 1000);
        } catch (err) {
            // 在 middleware 处理了
        } finally {
            toast.hideLoading();
        }
    };

    const { data: notebooks } = useGetNotebooksQuery(undefined);

    const notebook = notebooks?.find((el) => el.id === notebookId);

    if (!notebook) {
        return <View>加载中...</View>;
    }

    return (
        <View className="page">
            <View className={styles.nameNow}>{notebook.title} </View>
            <Input
                className={styles.input}
                value={title}
                type="text"
                placeholder="输入笔记本名称"
                maxlength={10}
                onInput={(e) => setTitle(e.detail.value)}
                onConfirm={handleSubmit}
                autoFocus
            />

            <View
                className={clsx("btn btn-primary--outline", styles.confirmBtn)}
                onClick={handleSubmit}
            >
                确认改名
            </View>

            <View
                className="btn btn-secondary--outline"
                onClick={() => navigate(-1)}
            >
                返回
            </View>
        </View>
    );
}
