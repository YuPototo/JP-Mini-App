import Example from "../Example";
import RenderWrapper from "../RenderWrapper";

export default function ImageExmaple2() {
    const baseData = [
        {
            type: "image",
            alt: "解析图片",
            src:
                "https://assets.riyu.love/images/not_exist_not_exist_not_exist.jpg",
            children: [{ text: "" }]
        }
    ];

    const data = JSON.stringify(baseData);

    return (
        <Example title="图片不存在的例子">
            <RenderWrapper data={data} />
        </Example>
    );
}
