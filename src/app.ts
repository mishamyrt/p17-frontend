import { fs } from './fs'
import { createFs } from 'modules/pseudo-fs'
import { createShell, runLoop } from 'modules/shell'
import { createTerminal } from 'modules/terminal'

const helloMsg = 'Welcome to Player17 home page'

createTerminal('app')
  .then(t => createShell(t, createFs(fs)))
  .then(s => runLoop(s, helloMsg))
