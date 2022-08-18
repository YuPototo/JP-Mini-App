import Example from "../Example";
import RenderWrapper from "../RenderWrapper";

export default function BoldText() {
    const baseData = [
        {
            text: "this is bold",
            bold: true
        }
    ];

    const data = JSON.stringify(baseData);

    return (
        <Example title="Bold">
            <RenderWrapper data={data} />
        </Example>
    );
}
