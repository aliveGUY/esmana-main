import React, { useCallback, useEffect, useState } from 'react'
import {
  $createParagraphNode,
  $getRoot,
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical'

import { $isLinkNode, LinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import { $isListNode, ListNode } from '@lexical/list'
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND } from '@lexical/list'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $createHeadingNode, $createQuoteNode, $isHeadingNode, HeadingNode, QuoteNode } from '@lexical/rich-text'
import { $findMatchingParent, $getNearestNodeOfType, mergeRegister } from '@lexical/utils'

// Icons for the toolbar buttons
const BoldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z" />
  </svg>
)

const ItalicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z" />
  </svg>
)

const UnderlineIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57-1.709 0-2.687-1.08-2.687-2.57V3.136zM12.5 15h-9v-1h9v1z" />
  </svg>
)

const H1Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8.637 13V3.669H7.379V7.62H2.758V3.67H1.5V13h1.258V8.728h4.62V13h1.259zm5.329 0V3.669h-1.244L10.5 5.316v1.265l2.16-1.565h.062V13h1.244z" />
  </svg>
)

const H2Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M7.638 13V3.669H6.38V7.62H1.759V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.022-6.733v-.048c0-.889.63-1.668 1.716-1.668.957 0 1.675.608 1.675 1.572 0 .855-.554 1.504-1.067 2.085l-3.513 3.999V13H15.5v-1.094h-4.245v-.075l2.481-2.844c.875-.998 1.586-1.784 1.586-2.953 0-1.463-1.155-2.556-2.919-2.556-1.941 0-2.966 1.326-2.966 2.74v.049h1.223z" />
  </svg>
)

const H3Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M7.637 13V3.669H6.379V7.62H1.758V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.625-4.272h1.018c1.142 0 1.935.67 1.949 1.674.013 1.005-.78 1.737-2.01 1.73-1.08-.007-1.853-.588-1.935-1.32H9.108c.069 1.327 1.224 2.386 3.083 2.386 1.935 0 3.343-1.155 3.309-2.789-.027-1.51-1.251-2.16-2.037-2.249v-.068c.704-.123 1.764-.91 1.723-2.229-.035-1.353-1.176-2.4-2.954-2.385-1.873.006-2.857 1.162-2.898 2.358h1.196c.062-.69.711-1.299 1.696-1.299.998 0 1.695.622 1.695 1.525.007.922-.718 1.592-1.695 1.592h-.964v1.074z" />
  </svg>
)

const QuoteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
  </svg>
)

const ListUlIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path
      fillRule="evenodd"
      d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
    />
  </svg>
)

const ListOlIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path
      fillRule="evenodd"
      d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"
    />
    <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zm2.188-3.668H3.13v.094h-.252v.777h.252V3.5h.76c.04 0 .054.015.072.033l.527.641.527-.641c.017-.018.031-.033.072-.033h.084v2.545h-.252v-.094h-.252V2.426c0-.007-.003-.014-.007-.021l-.017-.016-.03-.02-.019-.009-.024-.006h-.035l-.007.001-.002.001-.002.002-.003.002-.004.003-.003.002-.01.01-.01.01-.003.004-.036.046-.523.651-.532-.663-.069-.085-.004-.005h-.046z" />
  </svg>
)

const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
  </svg>
)

// Text alignment icons
const AlignLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path
      fillRule="evenodd"
      d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
    />
  </svg>
)

const AlignCenterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path
      fillRule="evenodd"
      d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
    />
  </svg>
)

const AlignRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path
      fillRule="evenodd"
      d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
    />
  </svg>
)

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext()
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    h1: false,
    h2: false,
    h3: false,
    quote: false,
    ul: false,
    ol: false,
    link: false,
    alignLeft: false,
    alignCenter: false,
    alignRight: false,
  })

  const updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if (!$isRangeSelection(selection)) return

    try {
      // Check text format
      const anchorNode = selection.anchor.getNode()
      const headingNode = $getNearestNodeOfType(anchorNode, HeadingNode)
      const quoteNode = $getNearestNodeOfType(anchorNode, QuoteNode)
      const listNode = $getNearestNodeOfType(anchorNode, ListNode)
      const linkNode = $getNearestNodeOfType(anchorNode, LinkNode)

      // Get the parent element to check for alignment
      const parentElement = anchorNode.getParent()

      // Check for alignment classes
      const format = parentElement ? parentElement.getFormat() : ''

      setActiveFormats({
        bold: selection.hasFormat('bold'),
        italic: selection.hasFormat('italic'),
        underline: selection.hasFormat('underline'),
        h1: $isHeadingNode(headingNode) && headingNode.getTag() === 'h1',
        h2: $isHeadingNode(headingNode) && headingNode.getTag() === 'h2',
        h3: $isHeadingNode(headingNode) && headingNode.getTag() === 'h3',
        quote: Boolean(quoteNode),
        ul: $isListNode(listNode) && listNode.getTag() === 'ul',
        ol: $isListNode(listNode) && listNode.getTag() === 'ol',
        link: Boolean($isLinkNode(linkNode)),
        alignLeft: format === 'left',
        alignCenter: format === 'center',
        alignRight: format === 'right',
      })
    } catch (error) {
      console.error('Error updating toolbar:', error)
    }
  }, [])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar()
        })
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar()
          return false
        },
        1,
      ),
    )
  }, [editor, updateToolbar])

  const applyFormat = (format) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format)
  }

  const applyHeading = (tag) => {
    editor.update(() => {
      const selection = $getSelection()
      if (!$isRangeSelection(selection)) {
        return
      }

      const anchorNode = selection.anchor.getNode()
      const targetNode = $findMatchingParent(anchorNode, (node) => $isElementNode(node) && !$isListNode(node))

      if (!targetNode) {
        return
      }

      // If we're already using the specified format, toggle back to paragraph
      if (
        ($isHeadingNode(targetNode) && targetNode.getTag() === tag) ||
        (tag === 'quote' && targetNode.getType() === 'quote')
      ) {
        // Convert to paragraph
        const paragraph = $createParagraphNode()
        targetNode.replace(paragraph, true)
        return
      }

      // Apply the specified format
      let newNode
      if (tag === 'quote') {
        newNode = $createQuoteNode()
      } else {
        newNode = $createHeadingNode(tag)
      }

      // Transfer the children
      if (targetNode.getChildren) {
        const children = targetNode.getChildren()
        children.forEach((child) => {
          newNode.append(child)
        })
      }

      // Replace the target node with our new node
      targetNode.replace(newNode, true)
    })
  }

  const insertLink = () => {
    if (activeFormats.link) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
    } else {
      const url = prompt('Enter URL')
      if (url) {
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, url)
      }
    }
  }

  const insertList = (type) => {
    if (type === 'ul') {
      if (activeFormats.ul) {
        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
      } else {
        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
      }
    } else if (type === 'ol') {
      if (activeFormats.ol) {
        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
      } else {
        editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
      }
    }
  }

  const applyAlignment = (alignment) => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment)
  }

  return (
    <div className="rich-text-editor-toolbar">
      <div className="toolbar-group">
        <button
          className={`toolbar-button ${activeFormats.bold ? 'active' : ''}`}
          onClick={() => applyFormat('bold')}
          title="Bold"
        >
          <BoldIcon />
        </button>
        <button
          className={`toolbar-button ${activeFormats.italic ? 'active' : ''}`}
          onClick={() => applyFormat('italic')}
          title="Italic"
        >
          <ItalicIcon />
        </button>
        <button
          className={`toolbar-button ${activeFormats.underline ? 'active' : ''}`}
          onClick={() => applyFormat('underline')}
          title="Underline"
        >
          <UnderlineIcon />
        </button>
      </div>

      <div className="toolbar-group">
        <button
          className={`toolbar-button ${activeFormats.h1 ? 'active' : ''}`}
          onClick={() => applyHeading('h1')}
          title="Heading 1"
        >
          <H1Icon />
        </button>
        <button
          className={`toolbar-button ${activeFormats.h2 ? 'active' : ''}`}
          onClick={() => applyHeading('h2')}
          title="Heading 2"
        >
          <H2Icon />
        </button>
        <button
          className={`toolbar-button ${activeFormats.h3 ? 'active' : ''}`}
          onClick={() => applyHeading('h3')}
          title="Heading 3"
        >
          <H3Icon />
        </button>
        <button
          className={`toolbar-button ${activeFormats.quote ? 'active' : ''}`}
          onClick={() => applyHeading('quote')}
          title="Quote"
        >
          <QuoteIcon />
        </button>
      </div>

      <div className="toolbar-group">
        <button
          className={`toolbar-button ${activeFormats.ul ? 'active' : ''}`}
          onClick={() => insertList('ul')}
          title="Bullet List"
        >
          <ListUlIcon />
        </button>
        <button
          className={`toolbar-button ${activeFormats.ol ? 'active' : ''}`}
          onClick={() => insertList('ol')}
          title="Numbered List"
        >
          <ListOlIcon />
        </button>
      </div>

      <div className="toolbar-group">
        <button className={`toolbar-button ${activeFormats.link ? 'active' : ''}`} onClick={insertLink} title="Link">
          <LinkIcon />
        </button>
      </div>

      <div className="toolbar-group">
        <button
          className={`toolbar-button ${activeFormats.alignLeft ? 'active' : ''}`}
          onClick={() => applyAlignment('left')}
          title="Align Left"
        >
          <AlignLeftIcon />
        </button>
        <button
          className={`toolbar-button ${activeFormats.alignCenter ? 'active' : ''}`}
          onClick={() => applyAlignment('center')}
          title="Align Center"
        >
          <AlignCenterIcon />
        </button>
        <button
          className={`toolbar-button ${activeFormats.alignRight ? 'active' : ''}`}
          onClick={() => applyAlignment('right')}
          title="Align Right"
        >
          <AlignRightIcon />
        </button>
      </div>
    </div>
  )
}

export default ToolbarPlugin
