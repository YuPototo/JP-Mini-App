import NotebookList from "@/features/notebook/components/NotebookListInPage";
import routes from "@/routes/routes";
import { navigate } from "@/utils/navigator/navigator";
import { Button, View, Text } from "@tarojs/components";
import clsx from "clsx";
import styles from "./notebookListPage.module.scss";
import IconFont from "@/components/iconfont";

export default function notebookListPage() {
    const toCreateNotebookPage = () => {
        navigate(routes.createNotebook());
    };

    return (
        <View className="page">
            <View>
                <View className={clsx(styles.sectionTitleWrapper)}>
                    <View className={clsx(styles.iconWrapper)}>
                        <IconFont name="guanbi" size={22} color={"green"} />
                    </View>
                    <Text>错题记录</Text>
                </View>
                <View
                    className={clsx(styles.notebook)}
                    onClick={() => navigate(routes.wrongNotebook())}
                >
                    错题本
                </View>
            </View>

            <View className={clsx(styles.notebookWrapper)}>
                <View className={clsx(styles.sectionTitleWrapper)}>
                    <View className={clsx(styles.iconWrapper)}>
                        <IconFont name="star-fill" size={36} color={"green"} />
                    </View>
                    <Text>笔记本</Text>
                </View>
                <NotebookList />
            </View>

            <Button
                className="btn btn-secondary--outline"
                onClick={toCreateNotebookPage}
            >
                创建笔记本
            </Button>
        </View>
    );
}
