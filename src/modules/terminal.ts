import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'

function fit (t: Terminal) {
  const fitAddon = new FitAddon()
  t.loadAddon(fitAddon)
  fitAddon.fit()
}

/**
 * Creates xterm.js instance
 * @param nodeId - The element to create the terminal within
 */
export const createTerminal = (nodeId: string): Promise<Terminal> =>
  new Promise((resolve, reject) => {
    const term = new Terminal()
    const node = document.getElementById(nodeId)
    if (node) {
      term.open(node)
      fit(term)
      return resolve(term)
    }
    reject(new Error('Could not create terminal instance'))
  })
