import { CommandMeta } from './types'

function parseCommand (input: string): CommandMeta {
  const parts = input.trim().split(' ')
  const result = {
    app: parts[0],
    args: [],
    flags: []
  } as CommandMeta
  for (let i = 1; i < parts.length; i++) {
    if (parts[i][0] === '-') {
      result.flags.push(
        ...parts[i]
          .substring(1)
          .split('')
      )
    } else {
      result.args.push(parts[i])
    }
  }
  return result
}

export const parseCommands = (input: string): CommandMeta[] =>
  input
    .replace(/\\\n/gm, '')
    .split('&&')
    .map(parseCommand)
