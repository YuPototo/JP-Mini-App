import { View, Text } from "@tarojs/components";
import { useEffect, useState } from "react";
import { useGetBookContentQuery } from "../booksService";
import { IChapter, ISection } from "../booksTypes";
import routes from "@/routes/routes";
import { useAppSelector } from "@/store/hooks";
import { selectIsLogin } from "@/features/user/userSlice";
import { useGetChapterDoneQuery } from "@/features/chapterDone/chapterDoneService";
import { selectContentProgress } from "../booksSlice";
import { navigate } from "@/utils/navigator/navigator";
import IconFont from "@/components/iconfont";
import styles from "./Content.module.scss";
import clsx from "clsx";

type Props = {
    bookId: string;
};

export default function Content({ bookId }: Props) {
    const [activeSectionIndex, setActiveSectionIndex] = useState(0);
    const { data: sections, isLoading } = useGetBookContentQuery(bookId);

    const isLogin = useAppSelector(selectIsLogin);

    const { data: chaptersDone } = useGetChapterDoneQuery(bookId, {
        skip: !isLogin,
    });

    const contentProgress = useAppSelector(selectContentProgress(bookId));
    const openSectionIndex = contentProgress?.openSectionIndex ?? 0;
    const nextChapterId = contentProgress?.nextChapterId;

    useEffect(() => {
        setActiveSectionIndex(openSectionIndex);
    }, [openSectionIndex]);

    return (
        <View className={styles.content}>
            {isLoading && <Text>加载练习目录...</Text>}

            {sections &&
                sections.map((section, index) => (
                    <View key={section.id}>
                        <Section
                            chaptersDone={chaptersDone}
                            nextChapterId={nextChapterId}
                            section={section}
                            showChapter={index === activeSectionIndex}
                            onClickTitle={() => setActiveSectionIndex(index)}
                        />
                    </View>
                ))}
        </View>
    );
}

type SectionProps = {
    section: ISection;
    showChapter: boolean;
    nextChapterId?: string;

    chaptersDone?: string[];
    onClickTitle: () => void;
};

function Section({
    section,
    nextChapterId,
    showChapter = false,
    chaptersDone = [],
    onClickTitle,
}: SectionProps) {
    const { title, chapters } = section;

    return (
        <>
            <View
                className={styles.sectionTitleWrapper}
                onClick={() => onClickTitle()}
            >
                <View className={styles.sectionIcon}>
                    {showChapter ? (
                        <IconFont name="arrow-down-bold" size={22} />
                    ) : (
                        <IconFont name="arrow-right-bold" size={22} />
                    )}
                </View>

                {title}
            </View>
            {showChapter ? (
                <View className={styles.chaptersInSection}>
                    {chapters.map((chapter) => (
                        <View
                            className={styles.chapterWrapper}
                            key={chapter.id}
                        >
                            <Chapter
                                chapter={chapter}
                                isNext={chapter.id === nextChapterId}
                                isDone={chaptersDone?.includes(chapter.id)}
                            />
                        </View>
                    ))}
                </View>
            ) : null}
        </>
    );
}

type ChapterProps = {
    isNext: boolean;
    chapter: IChapter;
    isDone: boolean;
};

function Chapter({ chapter, isDone, isNext }: ChapterProps) {
    const toPractice = () => {
        const startingIndex = 0;
        navigate(routes.practiceChapter(chapter.id, startingIndex));
    };

    return (
        <View
            className={clsx(
                styles.chapterTitleWrapper,
                isNext && styles.nextChapter
            )}
            onClick={toPractice}
        >
            <Text>{chapter.title}</Text>
            <View className={styles.iconGroup}>
                {isNext && (
                    <IconFont name="map-marker" size={28} color={"#059669"} />
                )}
                {isDone && (
                    <IconFont name="check" size={30} color={"#059669"} />
                )}
            </View>
        </View>
    );
}
