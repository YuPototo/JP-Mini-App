import { Button, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useDeleteNotebookMutation } from "../notebookService";
import { INotebook } from "../notebookTypes";

type Props = {
    notebook: INotebook;
};

export default function NotebookDeleteButton({ notebook }: Props) {
    const [deleteNotebook, { isLoading }] = useDeleteNotebookMutation();

    const handleDelete = async () => {
        try {
            Taro.showLoading();
            await deleteNotebook(notebook.id).unwrap();
            Taro.showToast({
                title: "删除成功",
                icon: "success"
            });
            setTimeout(() => {
                Taro.navigateBack();
            }, 1000);
        } catch (err) {
            // 在 middleware 处理了
        } finally {
            Taro.hideLoading();
        }
    };

    const openModal = () => {
        Taro.showModal({
            content: "删除笔记本会删除其中收藏的题目。确定吗？",
            success: res => {
                if (res.confirm) {
                    handleDelete();
                }
            }
        });
    };

    return (
        <View>
            <Button disabled={isLoading} onClick={openModal}>
                删除
            </Button>
        </View>
    );
}
