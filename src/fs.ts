import { PseudoFSNode } from 'modules/pseudo-fs/types'

const skills = `
# Skills
* PHP
* Go
* etc
`

const projects = `
# Projects
Some information about projects
`

export const fs: PseudoFSNode = {
  'skills.md': {
    content: skills
  },
  'projects.md': {
    content: projects
  }
}
