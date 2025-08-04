export class StringHelper {
  static insertStringDelimeter(delimeter: string, ...args: string[]): string {
    return Object.values(args).reduce<string>((acc, value) => {
      if (value) {
        acc += `${value}${delimeter}`
      }
      return acc
    }, "")
  }

  static cutText(text: string, countSymbols: number = 250) {
    if (text.length > 150) {
      return `${text.slice(0, countSymbols)}...`
    }
    return text
  }
}
