import { ShellInstance } from 'modules/shell'

export interface CommandMeta {
  app: string,
  flags: string[],
  args: string[]
}

export interface CommandHandler {
  (c: CommandMeta, s: ShellInstance): Promise<ShellInstance>
}

export interface CommandList {
  [key: string]: CommandHandler
}
