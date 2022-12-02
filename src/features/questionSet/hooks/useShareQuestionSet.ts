import routes from "@/routes/routes";
import { useShareAppMessage } from "@tarojs/taro";

export default function useShareQuestionSet(questionSetId) {
    useShareAppMessage(() => {
        return {
            title: "这道题怎么做呢",
            path: routes.practiceShare(questionSetId),
            imageUrl: "https://assets.riyu.love/images/share_image_two.jpeg",
        };
    });
}
