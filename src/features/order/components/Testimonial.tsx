import { View, Image } from "@tarojs/components";
import clsx from "clsx";
import styles from "./Testimonial.module.scss";

interface QuoteCardProps {
    imageSrc: string;
    userName: string;
    quote: string;
}

const USER_ONE = {
    imageSrc: "https://assets.riyu.love/images/user_testimonial_1_mini.jpg",
    userName: "小康",
    quote: "每天在通勤的公交车上做题，很方便。",
};

const USER_TWO = {
    imageSrc: "https://assets.riyu.love/images/user_testimonial_2_mini.jpg",
    userName: "Akira",
    quote: "在这里刷题通过了N2，现在冲刺N1！",
};

const QuoteCardLeft = ({ imageSrc, userName, quote }: QuoteCardProps) => {
    return (
        <View className={clsx(styles.card, styles.topCard, styles.leftCard)}>
            <View className={styles.imageWrapper}>
                <Image className={styles.image} src={imageSrc} />
            </View>
            <View className={styles.content}>
                <View className={styles.userName}>{userName}</View>
                <View className={styles.quote}>{quote}</View>
            </View>
        </View>
    );
};

const QuoteCardRight = ({ imageSrc, userName, quote }: QuoteCardProps) => {
    return (
        <View className={clsx(styles.card, styles.rightCard)}>
            <View className={styles.content}>
                <View className={styles.userName}>{userName}</View>
                <View className={styles.quote}>{quote}</View>
            </View>
            <View className={styles.imageWrapper}>
                <Image className={styles.image} src={imageSrc} />
            </View>
        </View>
    );
};

export default function Testimonial() {
    return (
        <View className={styles.wrapper}>
            <QuoteCardLeft
                imageSrc={USER_ONE.imageSrc}
                userName={USER_ONE.userName}
                quote={USER_ONE.quote}
            />
            <QuoteCardRight
                imageSrc={USER_TWO.imageSrc}
                userName={USER_TWO.userName}
                quote={USER_TWO.quote}
            />
        </View>
    );
}
