import { isFile } from 'modules/pseudo-fs/helpers'
import { CommandHandler } from './types'

export const handleCat: CommandHandler = (c, s) =>
  new Promise(resolve => {
    if (c.args.length < 1) {
      s.echo.println('cat: File is not specified')
    } else {
      const file = s.fs.read(c.args[0])
      if (file) {
        if (isFile(file)) {
          s.echo.println(file.content)
        } else {
          s.echo.println(`cat: ${c.args[0]}: Is a directory`)
        }
      } else {
        s.echo.println(`cat: ${c.args[0]}: No such file or directory`)
      }
      console.log(file)
    }
    resolve(s)
  })
