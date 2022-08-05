import { View, Image } from '@tarojs/components'
import type { Book } from './booksTypes'

import styles from "./BookCard.module.scss";


interface BookProps {
    book: Book;
}

function BookCard({ book }: BookProps) {
    return (
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
                <View className={styles["book-desc"]}>{book.desc}</View>
            </View>
        </View>
    );
}

export default BookCard;
