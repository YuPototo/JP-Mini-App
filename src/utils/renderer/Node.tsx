import Filler from "./elements/Filler";
import Leaf from "./Leaf";
import Paragraph from "./elements/Paragraph";
import { IElement, INode, ITip, IImage } from "./type";
import { isElement } from "./utils/isElement";
import Tip from "./elements/Tip";
import JpImage from "./elements/Image";

const renderElement = (element: IElement) => {
    switch (element.type) {
        case "filler":
            return <Filler />;
        case "paragraph":
            return <Paragraph element={element} />;
        case "tip":
            return <Tip element={element as ITip} />;
        case "image":
            return <JpImage element={element as IImage} />;
        default:
            console.error(`unknown element type: ${element.type}`);
            return <></>;
    }
};

type Props = {
    value: INode;
};

export default function Node({ value }: Props) {
    if (isElement(value)) {
        return renderElement(value);
    }
    return <Leaf {...value} />;
}
