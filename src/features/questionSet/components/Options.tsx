import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { pickOptionThunk, selectPickedIndex } from "../questionSetSlice";
import RichTextRenderer from "../../../utils/renderer";
import { View } from "@tarojs/components";

export default function Options({
    options,
    questionIndex
}: {
    options: string[];
    questionIndex: number;
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
                />
            ))}
        </View>
    );
}

function Option({
    option,
    questionIndex,
    optionIndex,
    picked
}: {
    option: string;
    questionIndex: number;
    optionIndex: number;
    picked: boolean;
}) {
    const dispatch = useAppDispatch();

    return (
        <View
            onClick={() =>
                dispatch(
                    pickOptionThunk({
                        questionIndex,
                        optionIndex
                    })
                )
            }
            style={{
                backgroundColor: picked ? "lightYellow" : ""
            }}
        >
            <RichTextRenderer data={option} />
        </View>
    );
}
