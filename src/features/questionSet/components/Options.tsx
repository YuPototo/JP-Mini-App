import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectPickedIndex } from "../questionSetSlice";
import RichTextRenderer from "@/utils/renderer";
import { View } from "@tarojs/components";
import { pickOption } from "../questionSetThunks";
import styles from "./Option.module.scss";
import clsx from "clsx";

export default function Options({
    options,
    questionIndex,
    answer,
    isDone,
}: {
    options: string[];
    questionIndex: number;
    answer: number;
    isDone: boolean;
}) {
    const pickedIndex = useAppSelector(selectPickedIndex(questionIndex));
    return (
        <View>
            {options.map((option, index) => (
                <Option
                    key={index}
                    option={option}
                    optionIndex={index}
                    questionIndex={questionIndex}
                    picked={pickedIndex === index}
                    isAnswer={index === answer}
                    isDone={isDone}
                />
            ))}
        </View>
    );
}

function Option({
    option,
    questionIndex,
    optionIndex,
    picked,
    isDone,
    isAnswer,
}: {
    option: string;
    questionIndex: number;
    optionIndex: number;
    picked: boolean;
    isAnswer: boolean;
    isDone: boolean;
}) {
    const dispatch = useAppDispatch();

    const optionCls = clsx(styles.option, {
        [`${styles.selectedOption}`]: !isDone && picked,
        [`${styles.rightOption}`]: isDone && isAnswer,
        [`${styles.wrongOption}`]: isDone && !isAnswer && picked,
    });

    return (
        <View
            className={optionCls}
            onClick={() =>
                dispatch(
                    pickOption({
                        questionIndex,
                        optionIndex,
                    })
                )
            }
        >
            <RichTextRenderer data={option} />
        </View>
    );
}
