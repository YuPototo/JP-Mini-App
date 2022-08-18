import { INode } from './type'
import { isObject } from 'lodash'

interface MaybeElement {
    type: string
    children: unknown
}

function isMaybeElement(value: unknown): value is MaybeElement {
    if (!isObject(value)) return false
    if (!('type' in value)) return false
    if (typeof (value as { type: unknown }).type !== 'string') return false

    return true
}

function isValidText(value: unknown) {
    if (!isObject(value)) return false

    if (!('text' in value)) {
        return false
    }
    return true
}

export default function checkIsNode(value: unknown): value is INode[] {
    const isArray = Array.isArray(value)
    if (!isArray) return false

    for (const node of value as unknown[]) {
        if (isMaybeElement(node)) {
            if (!checkIsNode(node.children)) return false
        } else if (!isValidText(node)) {
            return false
        }
    }

    return true
}
