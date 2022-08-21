import { View } from "@tarojs/components";
import { IQuestion } from "../questionSetTypes";
import Body from "./Body";
import Explanation from "./Explanation";
import Options from "./Options";

export default function Questions({ questions }: { questions: IQuestion[] }) {
    return (
        <View>
            {questions.map((question, index) => (
                <Question
                    key={index}
                    question={question}
                    questionIndex={index}
                />
            ))}
        </View>
    );
}

function Question({
    question,
    questionIndex
}: {
    question: IQuestion;
    questionIndex: number;
}) {
    return (
        <View>
            <Body body={question.body} />
            <Options options={question.options} questionIndex={questionIndex} />
            <Explanation explanation={question.explanation} />
        </View>
    );
}
