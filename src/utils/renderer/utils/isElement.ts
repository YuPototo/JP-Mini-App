import { IElement, INode } from '../type'

// type guard
export function isElement(node: INode): node is IElement {
    return 'type' in node
}
