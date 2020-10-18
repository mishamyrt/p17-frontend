import { CommandHandler } from './types'

export const handleLs: CommandHandler = (c, s) =>
  new Promise(resolve => {
    const result = s.fs.list(s.cwd)
    if (result) {
      s.echo.printWide(result)
    } else {
      s.echo.println('Whoops')
    }
    resolve(s)
  })
