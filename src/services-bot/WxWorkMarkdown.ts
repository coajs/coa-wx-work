export class WxWorkMarkdown {
  private data = ''

  text(text: string, color?: 'info' | 'comment' | 'warning') {
    if (!color) this.data += text
    else this.data += `<font color="${color}">${text}</font>`
    return this
  }

  header3(text: string) {
    return this.text(`### ${text}`)
  }

  header4(text: string) {
    return this.text(`#### ${text}`)
  }

  header5(text: string) {
    return this.text(`##### ${text}`)
  }

  header6(text: string) {
    return this.text(`###### ${text}`)
  }

  red(text: string) {
    return this.text(text, 'warning')
  }

  green(text: string) {
    return this.text(text, 'info')
  }

  gray(text: string) {
    return this.text(text, 'comment')
  }

  bold(text: string) {
    return this.text(`**${text}**`)
  }

  link(title: string, url: string) {
    return this.text(`[${title}](${url})`)
  }

  commentText(text: string) {
    return this.text(text, 'comment')
  }

  warningText(text: string) {
    return this.text(text, 'warning')
  }

  infoText(text: string) {
    return this.text(text, 'info')
  }

  br() {
    this.data += '\n'
    return this
  }

  quote() {
    this.data += '> '
    return this
  }

  value() {
    return this.data
  }
}
