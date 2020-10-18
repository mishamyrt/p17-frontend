declare module 'local-echo' {
  import { ITerminalAddon } from 'xterm'

  interface AutocompleteHandler {
    (index: number, tokens: string[]): string[]
  }

  export default class LocalEchoController implements ITerminalAddon {
    activate()
    dispose()
    read(prompt: string): Promise<string>
    print(m: string)
    println(m: string)
    printWide(m: string[], padding?: number)
    addAutocompleteHandler(fn: AutocompleteHandler, ...args: string[])
    removeAutocompleteHandler(fn: AutocompleteHandler)
  }
}
