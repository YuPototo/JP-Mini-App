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

type Props = {
    bookId: string;
};

export default function Content({ bookId }: Props) {
    const [activeSectionIndex, setActiveSectionIndex] = useState(0);
    const { data: sections, isLoading } = useGetBookContentQuery(bookId);

    const isLogin = useAppSelector(selectIsLogin);

    const { data: chaptersDone } = useGetChapterDoneQuery(bookId, {
        skip: !isLogin
    });

    const contentProgress = useAppSelector(selectContentProgress(bookId));
    const openSectionIndex = contentProgress?.openSectionIndex ?? 0;
    const nextChapterId = contentProgress?.nextChapterId;

    useEffect(() => {
        setActiveSectionIndex(openSectionIndex);
    }, [openSectionIndex]);

    return (
        <View>
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
    onClickTitle
}: SectionProps) {
    const { title, chapters } = section;

    return (
        <View>
            <View onClick={() => onClickTitle()}>{title}</View>
            {showChapter ? (
                <View className="">
                    {chapters.map(chapter => (
                        <View key={chapter.id}>
                            <Chapter
                                chapter={chapter}
                                isNext={chapter.id === nextChapterId}
                                isDone={chaptersDone?.includes(chapter.id)}
                            />
                        </View>
                    ))}
                </View>
            ) : null}
        </View>
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
        <View onClick={toPractice}>
            <Text>{chapter.title}</Text>
            {isDone && <Text>完成</Text>}
            {isNext && <Text>下一章</Text>}
        </View>
    );
}
