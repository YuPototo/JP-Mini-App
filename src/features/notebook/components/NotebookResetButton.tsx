import { useAppDispatch } from "@/store/hooks";
import { Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { setNotebookProgress } from "../notebookSlice";
import { INotebook } from "../notebookTypes";

type Props = { notebook: INotebook };

export default function NotebookResetButton({ notebook }: Props) {
    const dispatch = useAppDispatch();
    const handleResetProgress = () => {
        dispatch(setNotebookProgress(notebook.id, 0));
    };

    const openModal = () => {
        Taro.showModal({
            content: "确定重置进度吗?",
            success: (res) => {
                if (res.confirm) {
                    handleResetProgress();
                }
            },
        });
    };
    return (
        <Button className="btn btn-secondary--outline" onClick={openModal}>
            重置进度
        </Button>
    );
}
