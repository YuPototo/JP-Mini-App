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
        }
    ];

    const data = JSON.stringify(baseData);

    return (
        <Example title="Two Paragraphs">
            <RenderWrapper data={data} />
        </Example>
    );
}
