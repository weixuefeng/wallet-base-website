export class PageModel {
  title: string
  description: string
  name: string
  constructor(title: string, description: string = '', name: string) {
    this.title = title
    this.description = description
    this.name = name
  }
}
