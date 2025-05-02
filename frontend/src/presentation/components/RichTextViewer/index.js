import React, { useCallback, useEffect, useState } from 'react'
import { $getRoot } from 'lexical'

import { LinkNode } from '@lexical/link'
import { ListItemNode, ListNode } from '@lexical/list'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'

import '../RichTextEditor/editor-styles.css'

// Google Docs-inspired theme (same as editor)
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

// Component to handle content updates
const ContentUpdater = ({ content }) => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (editor && content) {
      try {
        // Parse the serialized state
        const editorState = editor.parseEditorState(JSON.parse(content))
        // Set the editor state
        editor.setEditorState(editorState)
      } catch (error) {
        console.error('Error updating viewer content:', error)
      }
    }
  }, [editor, content])

  return null
}

const RichTextViewer = ({ content }) => {
  const editorConfig = {
    namespace: 'RichViewer',
    theme,
    editable: false,
    onError(error) {
      console.error(error)
    },
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode, TableNode, TableCellNode, TableRowNode],
  }

  return (
    <div className="rich-text-viewer">
      <LexicalComposer initialConfig={editorConfig}>
        <div className="rich-text-editor-container">
          <div className="rich-text-editor-content">
            <RichTextPlugin
              contentEditable={<ContentEditable className="outline-none" />}
              placeholder={<div className="rich-text-editor-placeholder">No content available</div>}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <ListPlugin />
            <LinkPlugin />
            {/* Add the ContentUpdater to handle updates when content prop changes */}
            {content && <ContentUpdater content={content} />}
          </div>
        </div>
      </LexicalComposer>
    </div>
  )
}

export default RichTextViewer
