// import { Document, Element, DomHandlerOptions } from './domhandler'
// import { ParserOptions } from 'htmlparser2'

// declare namespace cheerio {
//   type AttrFunction = (el: Element, i: number, currentValue: string) => unknown

//   interface Cheerio<T = unknown> {
//     // Document References
//     // Cheerio https://github.com/cheeriojs/cheerio
//     // JQuery http://api.jquery.com

//     [index: number]: Element
//     cheerio: string
//     length: number

//     // Attributes

//     attr(): { [attr: string]: string }
//     attr(name: string): string | undefined
//     attr(name: string, value: AttrFunction): Cheerio
//     // `value` *can* be `unknown` here but:
//     // 1. That makes type-checking the function-type useless
//     // 2. It's converted to a string unknownways
//     attr(name: string, value: string): Cheerio
//     // The map's values *can* be `unknown` but they'll all be cast to strings
//     // regardless.
//     attr(map: { [key: string]: unknown }): Cheerio

//     data(): unknown
//     data(name: string): string
//     data(name: string, value: unknown): unknown

//     val(): string
//     val(value: string): Cheerio

//     removeAttr(name: string): Cheerio

//     has(selector: string): Cheerio
//     has(element: Element): Cheerio

//     hasClass(className: string): boolean
//     addClass(classNames: string): Cheerio

//     removeClass(): Cheerio
//     removeClass(className: string): Cheerio
//     removeClass(func: (index: number, className: string) => string): Cheerio

//     toggleClass(className: string): Cheerio
//     toggleClass(className: string, toggleSwitch: boolean): Cheerio
//     toggleClass(toggleSwitch?: boolean): Cheerio
//     toggleClass(
//       func: (index: number, className: string, toggleSwitch: boolean) => string,
//       toggleSwitch?: boolean
//     ): Cheerio

//     is(selector: string): boolean
//     is(element: Element): boolean
//     is(element: Element[]): boolean
//     is(selection: Cheerio): boolean
//     is(func: (index: number, element: Element) => boolean): boolean

//     // Form
//     serialize(): string
//     serializeArray(): { name: string; value: string }[]

//     // Traversing

//     find(selector: string): Cheerio
//     find(element: Cheerio): Cheerio

//     parent(selector?: string): Cheerio
//     parents(selector?: string): Cheerio
//     parentsUntil(selector?: string, filter?: string): Cheerio
//     parentsUntil(element: Element, filter?: string): Cheerio
//     parentsUntil(element: Cheerio, filter?: string): Cheerio

//     prop(name: string): unknown
//     prop(name: string, value: unknown): Cheerio

//     closest(): Cheerio
//     closest(selector: string): Cheerio

//     next(selector?: string): Cheerio
//     nextAll(): Cheerio
//     nextAll(selector: string): Cheerio

//     nextUntil(selector?: string, filter?: string): Cheerio
//     nextUntil(element: Element, filter?: string): Cheerio
//     nextUntil(element: Cheerio, filter?: string): Cheerio

//     prev(selector?: string): Cheerio
//     prevAll(): Cheerio
//     prevAll(selector: string): Cheerio

//     prevUntil(selector?: string, filter?: string): Cheerio
//     prevUntil(element: Element, filter?: string): Cheerio
//     prevUntil(element: Cheerio, filter?: string): Cheerio

//     slice(start: number, end?: number): Cheerio

//     siblings(selector?: string): Cheerio

//     children(selector?: string): Cheerio

//     contents(): Cheerio

//     each<T>(func: (index: number, element: Element) => T): Cheerio<T>
//     map<T>(func: (index: number, element: Element) => T): Cheerio<T>

//     filter(selector: string): Cheerio
//     filter(selection: Cheerio): Cheerio
//     filter(element: Element): Cheerio
//     filter(elements: Element[]): Cheerio
//     filter(func: (index: number, element: Element) => boolean): Cheerio

//     not(selector: string): Cheerio
//     not(selection: Cheerio): Cheerio
//     not(element: Element): Cheerio
//     not(func: (index: number, element: Element) => boolean): Cheerio

//     first(): Cheerio
//     last(): Cheerio

//     eq(index: number): Cheerio

//     get(): T[]
//     get(index: number): T

//     index(): number
//     index(selector: string): number
//     index(selection: Cheerio): number

//     end(): Cheerio

//     add(selectorOrHtml: string): Cheerio
//     add(selector: string, context: Document): Cheerio
//     add(element: Element): Cheerio
//     add(elements: Element[]): Cheerio
//     add(selection: Cheerio): Cheerio

//     addBack(): Cheerio
//     addBack(filter: string): Cheerio

//     // Manipulation
//     appendTo(target: Cheerio): Cheerio
//     prependTo(target: Cheerio): Cheerio

//     append(content: string, ...contents: unknown[]): Cheerio
//     append(content: Document, ...contents: unknown[]): Cheerio
//     append(content: Document[], ...contents: unknown[]): Cheerio
//     append(content: Cheerio, ...contents: unknown[]): Cheerio

//     prepend(content: string, ...contents: unknown[]): Cheerio
//     prepend(content: Document, ...contents: unknown[]): Cheerio
//     prepend(content: Document[], ...contents: unknown[]): Cheerio
//     prepend(content: Cheerio, ...contents: unknown[]): Cheerio

//     after(content: string, ...contents: unknown[]): Cheerio
//     after(content: Document, ...contents: unknown[]): Cheerio
//     after(content: Document[], ...contents: unknown[]): Cheerio
//     after(content: Cheerio, ...contents: unknown[]): Cheerio

//     insertAfter(content: string): Cheerio
//     insertAfter(content: Document): Cheerio
//     insertAfter(content: Cheerio): Cheerio

//     before(content: string, ...contents: unknown[]): Cheerio
//     before(content: Document, ...contents: unknown[]): Cheerio
//     before(content: Document[], ...contents: unknown[]): Cheerio
//     before(content: Cheerio, ...contents: unknown[]): Cheerio

//     insertBefore(content: string): Cheerio
//     insertBefore(content: Document): Cheerio
//     insertBefore(content: Cheerio): Cheerio

//     remove(selector?: string): Cheerio

//     replaceWith(content: string): Cheerio
//     replaceWith(content: Element): Cheerio
//     replaceWith(content: Element[]): Cheerio
//     replaceWith(content: Cheerio): Cheerio
//     replaceWith(content: () => Cheerio): Cheerio

//     empty(): Cheerio

//     html(): string | null
//     html(html: string): Cheerio

//     text(): string
//     text(text: string): Cheerio

//     wrap(content: string): Cheerio
//     wrap(content: Document): Cheerio
//     wrap(content: Cheerio): Cheerio

//     css(propertyName: string): string
//     css(propertyNames: string[]): string[]
//     css(propertyName: string, value: string): Cheerio
//     css(propertyName: string, value: number): Cheerio
//     css(
//       propertyName: string,
//       func: (index: number, value: string) => string
//     ): Cheerio
//     css(
//       propertyName: string,
//       func: (index: number, value: string) => number
//     ): Cheerio
//     css(properties: Record<string, string>): Cheerio

//     // Rendering

//     // Miscellaneous

//     clone(): Cheerio

//     // Not Documented

//     toArray(): Element[]
//   }

//   interface CheerioParserOptions extends ParserOptions, DomHandlerOptions {
//     // Document References
//     // Cheerio https://github.com/cheeriojs/cheerio

//     xml?: (ParserOptions & DomHandlerOptions) | boolean
//     _useHtmlParser2?: boolean

//     /** Enable location support for parse5 */
//     sourceCodeLocationInfo?: boolean
//   }

//   interface Selector {
//     (selector: string): Cheerio
//     (selector: string, context: string): Cheerio
//     (selector: string, context: Element): Cheerio
//     (selector: string, context: Element[]): Cheerio
//     (selector: string, context: Cheerio): Cheerio
//     (selector: string, context: string, root: string): Cheerio
//     (selector: string, context: Element, root: string): Cheerio
//     (selector: string, context: Element[], root: string): Cheerio
//     (selector: string, context: Cheerio, root: string): Cheerio
//     (selector: unknown): Cheerio
//   }

//   interface Root extends Selector {
//     // Document References
//     // Cheerio https://github.com/cheeriojs/cheerio
//     // JQuery http://api.jquery.com
//     root(): Cheerio
//     contains(container: Element, contained: Element): boolean
//     parseHTML(
//       data: string,
//       context?: Document,
//       keepScripts?: boolean
//     ): Document[]

//     html(options?: CheerioParserOptions): string
//     html(
//       dom: string | Cheerio | Element,
//       options?: CheerioParserOptions
//     ): string

//     xml(dom?: string | Cheerio | Element): string
//   }

//   interface CheerioAPI extends Root {
//     version: string
//     load(
//       html: string | { toString(): string },
//       options?: CheerioParserOptions
//     ): Root
//     load(element: Element, options?: CheerioParserOptions): Root
//   }
// }

// declare const cheerioModule: cheerio.CheerioAPI
// export = cheerioModule
