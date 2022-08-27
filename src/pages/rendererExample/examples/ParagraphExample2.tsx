import Example from "../Example";
import RenderWrapper from "../RenderWrapper";

export default function ParagraphTwo() {
    const baseData = [
        {
            type: "paragraph",
            children: [{ text: "This is a paragraph" }]
        },
        {
            type: "paragraph",
            children: [{ text: "This is another paragraph" }]
        },
        {
            type: "paragraph",
            children: [{ text: "空格     空格后面（应该有多个空格）" }]
        }
    ];

    const data = JSON.stringify(baseData);

    return (
        <Example title="Two Paragraphs">
            <RenderWrapper data={data} />
        </Example>
    );
}
