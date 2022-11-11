import { useGetWrongRecordQuery } from "@/features/wrongRecord/wrongRecordService";
import routes from "@/routes/routes";
import { navigate } from "@/utils/navigator/navigator";
import { Button, View } from "@tarojs/components";
import styles from "./wrongNotebookPage.module.scss";

export default function wrongNotebookPage() {
    const { data, isLoading } = useGetWrongRecordQuery();

    if (isLoading) {
        return <View>加载中...</View>;
    }

    return (
        <View className="page">
            <View className={styles.hint}>
                <View>错题会在7天后被移除</View>
                <View>错题会在回答正确后被移除</View>
            </View>
            <View>错题数量：{data?.length}</View>
            <View className={styles.btnWrapper}>
                <Button
                    className="btn btn-primary"
                    onClick={() => navigate(routes.practiceWrongRecord())}
                >
                    开始复习
                </Button>
            </View>
        </View>
    );
}
