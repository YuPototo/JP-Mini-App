import { View } from "@tarojs/components";

import styles from "./ModalWall.module.scss";

// 参考了： https://www.npmjs.com/package/taro-modal
// 一个高度固定的 modal wall

// todo: 增加一个返回按钮

type Props = {
    onModalClosed: () => void;
    children: React.ReactNode;
};

export default function ModalWall({ onModalClosed, children }: Props) {
    return (
        <View className={styles.mask} onClick={onModalClosed}>
            <View
                onClick={e => {
                    e.stopPropagation();
                }}
                className={styles.modal}
            >
                {children}
            </View>
        </View>
    );
}
