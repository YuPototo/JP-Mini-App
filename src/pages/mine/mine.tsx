import { useAppSelector } from "@/store/hooks";
import { View } from "@tarojs/components";

export default function mine() {
    const displayId = useAppSelector(state => state.user.displayId);

    return (
        <View>
            <View>ID: {displayId}</View>
        </View>
    );
}
