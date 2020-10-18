import { isFile } from './helpers'
import { PseudoFile, PseudoFSController, PseudoFSNode } from './types'

const deepRead = (
  node: PseudoFSNode,
  path: string[]
): PseudoFile | PseudoFSNode | null => {
  if (path[0] in node) {
    const currentNode = node[path[0]]
    if (path.length === 1) {
      return currentNode
    } else if (!isFile(currentNode)) {
      return deepRead(currentNode, path.slice(1))
    }
  }
  return null
}

export function createFs (tree: PseudoFSNode): PseudoFSController {
  const storage = tree

  const list = (path: string): string[] | null => {
    if (path === '/') {
      return Object.keys(tree)
    }
    const result = deepRead(tree, path.split('/'))
    return result && !isFile(result)
      ? Object.keys(result)
      : null
  }

  return {
    tree: storage,
    read: (s) => deepRead(tree, s.split('/')),
    writeFile: () => true,
    list
  }
}
