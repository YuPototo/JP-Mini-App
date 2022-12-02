import { View } from "@tarojs/components";

export default function QuestionSetSkeleton() {
    return (
        <View>
            {/* 题目 */}
            <View>
                <View className="skeleton skeleton-text"></View>
                <View
                    style={{ width: "70%" }}
                    className="skeleton skeleton-text"
                ></View>
            </View>

            <View style={{ marginTop: "40rpx" }}>
                <View
                    style={{ width: "25%", marginBottom: "16rpx" }}
                    className="skeleton skeleton-text"
                ></View>
                <View
                    style={{ width: "25%", marginBottom: "16rpx" }}
                    className="skeleton skeleton-text"
                ></View>
                <View
                    style={{ width: "25%", marginBottom: "16rpx" }}
                    className="skeleton skeleton-text"
                ></View>
                <View
                    style={{ width: "25%", marginBottom: "16rpx" }}
                    className="skeleton skeleton-text"
                ></View>
            </View>
        </View>
    );
}
