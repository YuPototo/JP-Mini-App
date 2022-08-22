import RichTextRenderer from "@/utils/renderer";

export default function Body({ body }: { body?: string }) {
    if (!body) return null;
    return <RichTextRenderer data={body} />;
}
