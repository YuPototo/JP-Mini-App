import Example from "../Example";
import RenderWrapper from "../RenderWrapper";

export default function TipExample2() {
    const baseData = [
        {
            type: "paragraph",
            children: [
                {
                    type: "tip",
                    tip: "这是 tip",
                    children: [{ text: "这是加粗的文本", bold: true }]
                }
            ]
        }
    ];

    const data = JSON.stringify(baseData);

    return (
        <Example title="Bold Tip">
            <RenderWrapper data={data} />
        </Example>
    );
}
