import { View, Text } from "@tarojs/components";
import { useState } from "react";
import { useGetBookContentQuery } from "../booksService";
import { IChapter, ISection } from "../booksTypes";

type Props = {
    bookId: string;
};

export default function Content({ bookId }: Props) {
    const [activeSectionIndex, setActiveSectionIndex] = useState(0);
    const { data: sections, isLoading } = useGetBookContentQuery(bookId);

    return (
        <View>
            {isLoading && <Text>加载练习目录...</Text>}

            {sections &&
                sections.map((section, index) => (
                    <View key={section.id}>
                        <Section
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
    onClickTitle: () => void;
};

function Section({ section, showChapter = false, onClickTitle }: SectionProps) {
    const { title, chapters } = section;

    return (
        <View>
            <View onClick={() => onClickTitle()}>{title}</View>
            {showChapter ? (
                <View className="">
                    {chapters.map(chapter => (
                        <View key={chapter.id}>
                            <Chapter chapter={chapter} />
                        </View>
                    ))}
                </View>
            ) : null}
        </View>
    );
}

type ChapterProps = {
    chapter: IChapter;
};

function Chapter({ chapter }: ChapterProps) {
    return (
        <View>
            <Text>{chapter.title}</Text>
        </View>
    );
}
