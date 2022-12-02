import { View } from "@tarojs/components";
import clsx from "clsx";
import { IQuestion } from "../questionSetTypes";
import Body from "./Body";
import Explanation from "./Explanation";
import Options from "./Options";
import styles from "./Questions.module.scss";

export default function Questions({
    questions,
    isDone,
}: {
    questions: IQuestion[];
    isDone: boolean;
}) {
    return (
        <View>
            {questions.map((question, index) => (
                <View key={index}>
                    {questions.length > 1 && (
                        <View className={clsx(styles.divider)}></View>
                    )}
                    <Question
                        question={question}
                        questionIndex={index}
                        isDone={isDone}
                    />
                </View>
            ))}
        </View>
    );
}

function Question({
    question,
    questionIndex,
    isDone,
}: {
    question: IQuestion;
    questionIndex: number;
    isDone: boolean;
}) {
    return (
        <View>
            <Body body={question.body} />
            <Options
                options={question.options}
                questionIndex={questionIndex}
                answer={question.answer}
                isDone={isDone}
            />
            {isDone && <Explanation explanation={question.explanation} />}
        </View>
    );
}
