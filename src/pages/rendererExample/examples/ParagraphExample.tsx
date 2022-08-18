import Example from "../Example";
import RenderWrapper from "../RenderWrapper";

export default function Paragraph() {
    const baseData = [
        {
            type: "paragraph",
            children: [{ text: "This is a paragraph" }]
        }
    ];

    const data = JSON.stringify(baseData);

    return (
        <Example title="One Simple Paragraph">
            <RenderWrapper data={data} />
        </Example>
    );
}
