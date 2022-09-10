import { View } from "@tarojs/components";
import ComplexOne from "./examples/ComplexOne";
import ComplexThree from "./examples/ComplexThree";
import ComplexTwo from "./examples/ComplexTwo";
import FillerExample from "./examples/FillerExample";
import ImageExmaple from "./examples/ImageExample";
import ImageExmaple2 from "./examples/ImageExample2";
import Paragraph from "./examples/ParagraphExample";
import ParagraphTwo from "./examples/ParagraphExample2";
import BoldText from "./examples/TextBold";
import BoldAndUnderline from "./examples/TextBoldAndUnderline";
import UnderlineText from "./examples/TextUnderline";
import TipSimple from "./examples/TipExample";
import TipSimpleTwo from "./examples/TipExample2";

export default function RendererExamplePage() {
    return (
        <View>
            <UnderlineText />

            <BoldText />

            <BoldAndUnderline />

            <Paragraph />
            <ParagraphTwo />
            <FillerExample />
            <TipSimple />
            <TipSimpleTwo />
            <ImageExmaple />
            <ImageExmaple2 />
            <ComplexOne />
            <ComplexTwo />
            <ComplexThree />
        </View>
    );
}
