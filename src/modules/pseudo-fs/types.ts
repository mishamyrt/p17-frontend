export interface PseudoFile {
  content: string,
}

export interface PseudoFSNode {
  [fileName: string]: PseudoFile | PseudoFSNode
}

export interface PseudoFSController {
  tree: Readonly<PseudoFSNode>,
  read: (path: string) => PseudoFile | PseudoFSNode | null
  writeFile: (path: string, content: string) => boolean
  list: (path: string) => string[] | null
}
