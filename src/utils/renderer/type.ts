export interface IElement {
    type: string;
    children: INode[];
}

export interface ITip extends IElement {
    type: "tip";
    tip: string;
}

export interface IImage extends IElement {
    type: "image";
    alt: string;
    src: string;
    children: [{ text: "" }]; // 似无必要，但是为了统一，还是加上
}

export interface IText {
    text: string;
}

export type INode = IElement | IText;
