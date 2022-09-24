import { useGetWrongRecordQuery } from "@/features/wrongRecord/wrongRecordService";
import routes from "@/routes/routes";
import { navigate } from "@/utils/navigator/navigator";
import { Button, View } from "@tarojs/components";

export default function wrongNotebookPage() {
    const { data, isLoading } = useGetWrongRecordQuery();

    if (isLoading) {
        return <View>加载中...</View>;
    }

    return (
        <View>
            <View>错题本</View>
            <View>错题数量：{data?.length}</View>
            <Button onClick={() => navigate(routes.practiceWrongRecord())}>
                开始复习
            </Button>
        </View>
    );
}
