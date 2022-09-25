import { useAppDispatch } from "@/store/hooks";
import toast from "@/utils/toast/toast";
import Taro, { RewardedVideoAd } from "@tarojs/taro";
import { useEffect, useState } from "react";
import { grantAdRewards } from "./adRewardThunk";

export function useRewardAd() {
    const dispatch = useAppDispatch();
    const [ad, setAd] = useState<RewardedVideoAd | null>(null);
    const [adLoaded, setAdLoaded] = useState(false);

    useEffect(() => {
        const ad = Taro.createRewardedVideoAd({
            adUnitId: "adunit-550c1ed3b2e42213"
        }) as RewardedVideoAd; //

        setAd(ad);

        ad.onLoad(() => {
            setAdLoaded(true);
            console.log("广告加载成功");
        });

        ad.onError(err => {
            if (err.errCode === 1004) {
                toast.error("没有广告了");
            } else {
                toast.error("错误" + err.errMsg);
            }
        });

        ad.onClose(res => {
            if (res.isEnded) {
                console.log("广告成功播放");
                toast.success("答题机会 +5");
                dispatch(grantAdRewards());
            } else {
                console.log("用户提前关闭了广告");
            }
            setAdLoaded(false);
        });
    }, []);

    const showAd = () => {
        if (!adLoaded) {
            toast.error("广告还没加载好");
            return;
        }

        if (!ad) {
            toast.error("广告实例创建失败");
        } else {
            ad.show();
        }
    };

    return showAd;
}
