import { PseudoFile, PseudoFSNode } from './types'

export const isFile = (n: PseudoFSNode | PseudoFile): n is PseudoFile =>
  Boolean(n.content)
