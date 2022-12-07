import { View } from "@tarojs/components";
import IconFont from "../iconfont";

import styles from "./ModalWall.module.scss";

// 参考了： https://www.npmjs.com/package/taro-modal
// 一个高度固定的 modal wall

// todo: 增加一个返回按钮

type Props = {
    onModalClosed: () => void;
    showCloseBttuon?: boolean;
    children: React.ReactNode;
};

export default function ModalWall({
    onModalClosed,
    children,
    showCloseBttuon = true,
}: Props) {
    return (
        <View className={styles.mask} onClick={onModalClosed}>
            <View
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className={styles.modal}
            >
                {showCloseBttuon && (
                    <View
                        className={styles.closeWrapper}
                        onClick={onModalClosed}
                    >
                        <IconFont name="guanbi" size={32} color={"#6b7280"} />
                    </View>
                )}
                {children}
            </View>
        </View>
    );
}
