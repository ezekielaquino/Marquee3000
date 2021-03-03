interface Options {
  selector: string
}

declare class Marquee3k {
  constructor(element: HTMLElement, options: Options)
  animate(): void
  repopulate(difference: number, isLarger: boolean): void
  static refresh(index: number): void
  static pause(index: number): void
  static play(index: number): void
  static toggle(index: number): void
  static refreshAll(): void
  static playAll(): void
  static toggleAll(): void
  static init(options?: Options): void
}

declare module 'marquee3000' {
  export = Marquee3k
}
