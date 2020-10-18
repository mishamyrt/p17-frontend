import { ShellInstance } from 'modules/shell'
import { handleCat } from './cat'
import { handleLs } from './ls'
import { parseCommands } from './parse'
import { CommandHandler, CommandList } from './types'

export const commands: CommandList = {
  ls: handleLs,
  cat: handleCat
}

commands.help = (c, s) =>
  new Promise(resolve => {
    s.echo.println('Available commands:')
    s.echo.printWide(Object.keys(commands))
    resolve(s)
  })

const tryExec: CommandHandler = (c, t) =>
  new Promise((resolve, reject) => {
    if (c.app in commands) {
      commands[c.app](c, t)
        .then(() => resolve(t))
    } else {
      reject(new Error(`${c.app}: command not found`))
    }
  })

export async function execute (
  i: string,
  s: ShellInstance
): Promise<ShellInstance> {
  const commands = parseCommands(i)
  let state = s
  for (const cmd of commands) {
    if (!cmd.app) {
      continue
    }
    try {
      state = await tryExec(cmd, state)
    } catch (e) {
      s.echo.println((e as Error).message)
    }
  }
  return state
}
