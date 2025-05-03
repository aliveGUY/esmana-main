import React from 'react'

import { LinkNode } from '@lexical/link'
import { ListItemNode, ListNode } from '@lexical/list'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'

import TabPlugin from './TabPlugin.js'
import ToolbarPlugin from './ToolbarPlugin.js'

import './editor-styles.css'

// Google Docs-inspired theme
const theme = {
  paragraph: 'editor-paragraph',
  heading: {
    h1: 'editor-heading-h1',
    h2: 'editor-heading-h2',
    h3: 'editor-heading-h3',
  },
  quote: 'editor-quote',
  list: {
    nested: {
      listitem: 'editor-nested-listitem',
    },
    ol: 'editor-list-ol',
    ul: 'editor-list-ul',
    listitem: 'editor-listitem',
  },
  link: 'editor-link',
  table: 'editor-table',
  tableRow: 'editor-table-row',
  tableCell: 'editor-table-cell',
  text: {
    bold: 'editor-text-bold',
    italic: 'editor-text-italic',
    underline: 'editor-text-underline',
    strikethrough: 'editor-text-strikethrough',
    underlineStrikethrough: 'editor-text-underline-strikethrough',
  },
  // Text alignment classes
  alignment: {
    left: 'editor-text-left',
    center: 'editor-text-center',
    right: 'editor-text-right',
  },
}

const RichTextEditor = ({ initialContent, onChange, readOnly = false }) => {
  const editorConfig = {
    namespace: 'RichEditor',
    theme,
    editable: !readOnly,
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode, TableNode, TableCellNode, TableRowNode],
  }

  // Add initial state if provided
  if (initialContent) {
    editorConfig.editorState = initialContent
  }

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="rich-text-editor-container">
        {!readOnly && <ToolbarPlugin />}
        <div className="rich-text-editor-content">
          <RichTextPlugin
            contentEditable={<ContentEditable className="outline-none" />}
            placeholder={<div className="rich-text-editor-placeholder">Enter some text...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          {!readOnly && <AutoFocusPlugin />}
          <ListPlugin />
          <LinkPlugin />
          {!readOnly && <TabPlugin />}
          {onChange && (
            <OnChangePlugin
              onChange={(editorState) => {
                // Serialize the editor state to JSON
                const serializedState = JSON.stringify(editorState.toJSON())
                onChange(serializedState)
              }}
            />
          )}
        </div>
      </div>
    </LexicalComposer>
  )
}

export default RichTextEditor
