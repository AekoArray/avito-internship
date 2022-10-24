import { CommentDisplayed, Story } from '../types'

export function updateTreeData(list: CommentDisplayed[], id: number, children: Story[]): Story[] {
  return list.map((node) => {
    if (node.id == id) {
      return {
        ...node,
        children,
      }
    }
    if (node.children && node.children?.length !== 0) {
      return {
        ...node,
        children: updateTreeData(node.children, id, children),
      }
    }
    return node
  })
}
