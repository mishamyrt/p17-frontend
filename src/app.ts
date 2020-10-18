import { createFs } from 'modules/pseudo-fs'
import { PseudoFSNode } from 'modules/pseudo-fs/types'
import { createShell, runLoop } from 'modules/shell'
import { createTerminal } from 'modules/terminal'

const fs: PseudoFSNode = {
  'skills.md': {
    content: `
# Skills

* PHP
* Go
* etc
`
  },
  'projects.md': {
    content: '# Projects'
  }
}

const helloMsg = 'Welcome to Player17 home page'

createTerminal('app')
  .then(t => createShell(t, createFs(fs)))
  .then(s => runLoop(s, helloMsg))
