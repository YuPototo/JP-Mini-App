import { login } from "@/features/user/userThunks";
import routes from "@/routes/routes";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { navigate } from "@/utils/navigator/navigator";
import { View, Text, Button } from "@tarojs/components";
import clsx from "clsx";
import styles from "./minePage.module.scss";
import IconFont from "@/components/iconfont";
import toast from "@/utils/toast/toast";
import { checkUpdate } from "@/utils/updator";

export default function mine() {
    const dispatch = useAppDispatch();
    const displayId = useAppSelector((state) => state.user.displayId);
    const isLoginFailure = useAppSelector((state) => state.user.isLoginFailure);

    const quizChance = useAppSelector((state) => state.user.quizChance);
    const isMember = useAppSelector((state) => state.user.isMember);
    const isAuditMode = useAppSelector((state) => state.parameter.isAuditMode);
    const memberDays = useAppSelector((state) => state.user.memberDays);
    const version = useAppSelector((state) => state.parameter.version);

    const idOrMessage = isLoginFailure
        ? "登录失败，点击此处重新登录"
        : displayId;

    const handleClickId = async () => {
        toast.loading();
        await dispatch(login());
        toast.success("已更新会员状态");
    };

    return (
        <View className="page">
            <View className={styles.topBox}></View>

            {/* Part 1 */}
            <View className={clsx(styles.part)}>
                <View className={styles.item} onClick={handleClickId}>
                    <View className={styles.hintIcon}>
                        <IconFont name="zhanghao" size={22} color={"green"} />
                    </View>
                    <Text> ID: {idOrMessage}</Text>
                </View>

                {!isAuditMode && isMember && (
                    <View className={styles.item}>
                        <View className={styles.hintIcon}>
                            <IconFont name="rili" size={28} color={"green"} />
                        </View>
                        <Text>会员天数: {formatMemberDays(memberDays)}</Text>
                    </View>
                )}

                {!isAuditMode && !isMember && (
                    <View className={styles.item}>
                        <View className={styles.hintIcon}>
                            <IconFont name="wenhao" size={28} color={"green"} />
                        </View>
                        <Text>做题机会: {quizChance}</Text>
                    </View>
                )}
            </View>

            {/* part two */}
            <View className={styles.part}>
                {isAuditMode || (
                    <View
                        className={styles.item}
                        onClick={() => navigate(routes.memberLanding())}
                    >
                        <View className={styles.hintIcon}>
                            <IconFont
                                name="huiyuan"
                                size={28}
                                color={"green"}
                            />
                        </View>
                        <Text>{isMember ? "会员续费" : "成为会员"}</Text>
                        <ArrowRight />
                    </View>
                )}

                {isAuditMode || (
                    <View
                        className={styles.item}
                        onClick={() => navigate(routes.pdfShare())}
                    >
                        <View className={styles.hintIcon}>
                            <IconFont
                                name="icon_xinyong_xianxing_jijin-"
                                size={28}
                                color={"green"}
                            />
                        </View>
                        <Text>获取真题PDF</Text>
                        <ArrowRight />
                    </View>
                )}

                <View
                    className={styles.item}
                    onClick={() => navigate(routes.webAppIntro())}
                >
                    <View className={styles.hintIcon}>
                        <IconFont
                            name="bg-ie-browser"
                            size={28}
                            color={"green"}
                        />
                    </View>

                    <Text>网页版</Text>
                    <ArrowRight />
                </View>
            </View>

            {/* Part three */}
            <View className={styles.part}>
                <Button
                    className={styles.item}
                    hover-class="none"
                    open-type="contact"
                >
                    <Text>联系开发者</Text>
                    <ArrowRight />
                </Button>

                <View className={styles.item} onClick={checkUpdate}>
                    <Text>更新小程序</Text>
                    <ArrowRight />
                </View>
            </View>

            <View className={styles.version}>版本号 {version}</View>
        </View>
    );
}

function ArrowRight() {
    return (
        <View className={styles.arrowRight}>
            <IconFont name="arrow-right-bold" size={28} color="#9ca3af" />
        </View>
    );
}

function formatMemberDays(memberDays?: number): string {
    if (memberDays !== undefined) {
        if (memberDays > 3650) {
            return "永久";
        } else {
            return memberDays + "天";
        }
    } else {
        return "";
    }
}
