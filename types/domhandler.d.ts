import { ElementType } from 'domelementtype'

export * from 'domhandler'

export interface Attribute {
  name: string
  value: string
  namespace?: string
  prefix?: string
}

export class Node {
  name: string
  attribs: {
    [name: string]: string
  }

  type: ElementType
  /** Parent of the node */
  // eslint-disable-next-line no-use-before-define
  parent?: Node
  /** Previous sibling */
  prev?: Node
  /** Next sibling */
  next?: Node
  /** The start index of the node. Requires `withStartIndices` on the handler to be `true. */
  startIndex?: number
  /** The end index of the node. Requires `withEndIndices` on the handler to be `true. */
  endIndex?: number
  /**
   * @param type Type of the node.
   * @param children Children of the node. Only certain node types can have children.
   */
  constructor(
    type:
      | ElementType.Root
      | ElementType.CDATA
      | ElementType.Script
      | ElementType.Style
      | ElementType.Tag,
    children: Node[]
  )

  get nodeType(): number
  get parentNode(): Node | null
  set parentNode(parent: Node | null)
  get previousSibling(): Node | null
  set previousSibling(prev: Node | null)
  get nextSibling(): Node | null
  set nextSibling(next: Node | null)
  /**
   * Clone this node, and optionally its children.
   *
   * @param recursive Clone child nodes as well.
   * @returns A clone of the node.
   */
  cloneNode(recursive?: boolean): Node

  data: string
  children: Node[]
  get firstChild(): Node | null
  get lastChild(): Node | null
  get childNodes(): Node[]
  set childNodes(children: Node[])
}

export class Element extends Node {
  /**
   * @param name Name of the tag, eg. `div`, `span`.
   * @param attribs Object mapping attribute names to attribute values.
   * @param children Children of the node.
   */
  constructor(
    name: string,
    attribs: {
      [name: string]: string
    },
    children?: Node[]
  )

  get tagName(): string
  set tagName(name: string)
  get attributes(): Attribute[]
  'x-attribsNamespace'?: Record<string, string>
  'x-attribsPrefix'?: Record<string, string>
}
