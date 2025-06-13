import { LinkNode } from '@lexical/link'

export class ExternalLinkNode extends LinkNode {
  static getType() {
    return 'link'
  }

  static clone(node) {
    return new ExternalLinkNode(node.__url, { target: node.__target, rel: node.__rel }, node.__key)
  }

  constructor(url, attributes = {}, key) {
    super(url, attributes, key)
    // Ensure external link attributes are always set
    this.__target = '_blank'
    this.__rel = 'noopener noreferrer'
  }

  createDOM(config) {
    const element = super.createDOM(config)
    // Always set external link attributes
    element.target = '_blank'
    element.rel = 'noopener noreferrer'
    // Add a class for external links if needed for styling
    element.classList.add('external-link')
    return element
  }

  updateDOM(prevNode, dom, config) {
    const updated = super.updateDOM(prevNode, dom, config)
    // Ensure external attributes are maintained on updates
    dom.target = '_blank'
    dom.rel = 'noopener noreferrer'
    dom.classList.add('external-link')
    return updated
  }

  static importJSON(serializedNode) {
    const { url, target, rel } = serializedNode
    const node = new ExternalLinkNode(url, { target, rel })
    node.setFormat(serializedNode.format)
    node.setIndent(serializedNode.indent)
    node.setDirection(serializedNode.direction)
    return node
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      target: this.__target,
      rel: this.__rel,
      type: 'link',
      version: 1,
    }
  }
}

export function $createExternalLinkNode(url, attributes) {
  return new ExternalLinkNode(url, attributes)
}

export function $isExternalLinkNode(node) {
  return node instanceof ExternalLinkNode
}
