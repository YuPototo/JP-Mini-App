import { View } from "@tarojs/components";
import clsx from "clsx";
import styles from "./BookCardSkeleton.module.scss";

export default function BookCardSkeleton() {
    return (
        <View className={styles["book-card"]}>
            <View className={styles["book-card-image-wrapper"]}>
                <View
                    style={{ borderRadius: "5%" }}
                    className={clsx(styles["book-card-image"], "skeleton ")}
                ></View>
            </View>
            <View className={styles.rightPart}>
                <View
                    style={{ width: "200rpx" }}
                    className={clsx(
                        styles["book-title"],
                        "skeleton skeleton-text"
                    )}
                ></View>
                <View
                    style={{ width: "300rpx" }}
                    className={clsx(
                        styles["book-desc"],
                        "skeleton skeleton-text"
                    )}
                ></View>
            </View>
        </View>
    );
}
