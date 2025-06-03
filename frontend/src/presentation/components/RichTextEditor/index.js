import React, { useEffect, useState } from 'react'

import { LinkNode } from '@lexical/link'
import { ListItemNode, ListNode } from '@lexical/list'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'

import { Box } from '@mui/material'
import TabPlugin from './TabPlugin.js'
import ToolbarPlugin from './ToolbarPlugin.js'

import './editor-styles.css'

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
  alignment: {
    left: 'editor-text-left',
    center: 'editor-text-center',
    right: 'editor-text-right',
  },
}

// Component to handle initial content loading only
const ContentUpdater = ({ content }) => {
  const [editor] = useLexicalComposerContext()
  const [hasLoadedInitialContent, setHasLoadedInitialContent] = useState(false)

  useEffect(() => {
    // Only load content once when component mounts and content is available
    if (editor && content && content.trim() !== '' && !hasLoadedInitialContent) {
      try {
        const parsedContent = JSON.parse(content)
        console.log({ parsedContent })
        const editorState = editor.parseEditorState(parsedContent)
        editor.setEditorState(editorState)
        setHasLoadedInitialContent(true)
      } catch (e) {
        console.warn('Failed to parse editor content:', e)
        setHasLoadedInitialContent(true) // Mark as loaded even if failed to prevent retries
      }
    }
  }, [editor, content, hasLoadedInitialContent])

  return null
}

const RichTextEditor = ({ content, onChange, readOnly = false }) => {
  const editorConfig = {
    namespace: 'RichEditor',
    theme,
    editable: !readOnly,
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode, TableNode, TableCellNode, TableRowNode],
  }

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'stormWave.main',
          borderRadius: '12px',
        }}
      >
        {!readOnly && <ToolbarPlugin />}
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
              const serializedState = JSON.stringify(editorState.toJSON())
              onChange(serializedState)
            }}
          />
        )}
        {/* Load initial content only once */}
        {content && <ContentUpdater content={content} />}
      </Box>
    </LexicalComposer>
  )
}

export default RichTextEditor
