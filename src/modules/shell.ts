import { PseudoFSController } from './pseudo-fs/types'
import { Terminal } from 'xterm'
import LocalEchoController from 'local-echo'
import { commands, execute } from './commands'

export interface ShellInstance {
  cwd: string
  fs: PseudoFSController
  echo: LocalEchoController
}

function attachEcho (term: Terminal) {
  const localEcho = new LocalEchoController()
  term.loadAddon(localEcho)
  return localEcho
}

export async function runLoop (s: ShellInstance, hello: string) {
  let state = s
  state.echo.println(hello)
  state.echo.println('\n')

  s.echo.addAutocompleteHandler(index =>
    index === 0
      ? Object.keys(commands)
      : [])

  // Main loop
  while (true) {
    const completeFiles = (i: number, tokens: string[]) => {
      if (tokens.length > 0 && tokens[0] === 'cat') {
        const files = state.fs.list(state.cwd)
        return files || []
      }
      return []
    }

    state.echo.addAutocompleteHandler(completeFiles)
    const cmd = await state.echo.read('~$ ')
    state = await execute(cmd, state)
    state.echo.removeAutocompleteHandler(completeFiles)
  }
}

export const createShell = (
  terminal: Terminal,
  fs: PseudoFSController
): ShellInstance => ({
  echo: attachEcho(terminal),
  cwd: '/',
  fs
})
