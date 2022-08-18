import Example from "../Example";
import RenderWrapper from "../RenderWrapper";

export default function UnderlineText() {
    const baseData = [
        {
            text: "this is underline",
            underline: true
        }
    ];

    const data = JSON.stringify(baseData);

    return (
        <Example title="Underline">
            <RenderWrapper data={data} />
        </Example>
    );
}
