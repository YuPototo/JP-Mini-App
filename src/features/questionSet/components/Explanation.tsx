import RichTextRenderer from "../../../utils/renderer";

export default function Explanation({ explanation }: { explanation?: string }) {
    if (!explanation) return null;
    return <RichTextRenderer data={explanation} />;
}
