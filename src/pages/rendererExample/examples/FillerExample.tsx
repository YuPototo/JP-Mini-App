import Example from "../Example";
import RenderWrapper from "../RenderWrapper";

export default function FillerExample() {
    const baseData = [
        {
            type: "paragraph",
            children: [
                { text: "This is a filler:    " },
                { type: "filler", children: [{ text: "" }] }
            ]
        }
    ];

    const data = JSON.stringify(baseData);

    return (
        <Example title="Filler">
            <RenderWrapper data={data} />
        </Example>
    );
}
