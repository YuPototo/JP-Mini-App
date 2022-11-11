import { navigate } from "@/utils/navigator/navigator";
import toast from "@/utils/toast/toast";
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
            toast.loading();
            await deleteNotebook(notebook.id).unwrap();
            toast.success("删除成功");
            setTimeout(() => {
                navigate(-1);
            }, 1000);
        } catch (err) {
            // 在 middleware 处理了
        } finally {
            toast.hideLoading();
        }
    };

    const openModal = () => {
        Taro.showModal({
            content: "删除笔记本会删除其中收藏的题目。确定吗？",
            success: (res) => {
                if (res.confirm) {
                    handleDelete();
                }
            },
        });
    };

    return (
        <Button
            className="btn btn-danger--outline"
            disabled={isLoading}
            onClick={openModal}
        >
            删除
        </Button>
    );
}
