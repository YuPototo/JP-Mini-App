import Example from "../Example";
import RenderWrapper from "../RenderWrapper";

export default function Paragraph() {
    const baseData = [
        {
            type: "paragraph",
            children: [
                {
                    text:
                        "This is a paragraph and the text is pretty long, This is a paragraph and the text is pretty long"
                }
            ]
        }
    ];

    const data = JSON.stringify(baseData);

    return (
        <Example title="One Simple Paragraph">
            <RenderWrapper data={data} />
        </Example>
    );
}
