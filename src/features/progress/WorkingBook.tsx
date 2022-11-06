import { navigate } from "@/utils/navigator/navigator";
import routes from "@/routes/routes";
import { View, Image } from "@tarojs/components";
import { useWorkingBook } from "./hooks/useWorkingBook";
import styles from "./WorkingBook.module.scss";

export default function WorkingBook(): JSX.Element {
    const { book, isDone, sectionTitle, chapterTitle, questionSetIndex } =
        useWorkingBook();

    if (!book) return <></>;

    return (
        <View
            className={styles.workingBook}
            onClick={() => navigate(routes.bookDetail(book.id))}
        >
            <View className={styles["book-card"]}>
                <View className={styles["book-card-image-wrapper"]}>
                    <Image
                        className={styles["book-card-image"]}
                        src={book.cover}
                        mode="aspectFit"
                        lazyLoad={true}
                    />
                </View>
                <View className={styles.rightPart}>
                    <View className={styles["book-title"]}>{book.title}</View>
                    <View className={styles.progress}>
                        <View className={styles.progressLabel}>进度</View>
                        <View>
                            {isDone ? (
                                <View>已完成</View>
                            ) : (
                                <View className={styles.progressContent}>
                                    <View>{sectionTitle}</View>
                                    <View>{chapterTitle}</View>
                                    {questionSetIndex !== undefined && (
                                        <View>第{questionSetIndex + 1}题</View>
                                    )}
                                </View>
                            )}
                        </View>
                    </View>
                    {/* <View></View> */}
                </View>
            </View>
        </View>
    );
}
