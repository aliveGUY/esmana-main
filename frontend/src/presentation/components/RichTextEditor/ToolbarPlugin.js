import React, { useCallback, useEffect, useState } from 'react'
import {
  $createParagraphNode,
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

import { Divider, IconButton, Stack, Typography } from '@mui/material'

import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import LinkIcon from '@mui/icons-material/Link'

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

  const applyOrderedList = () => {
    if (activeFormats.ol) {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    } else {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
    }
  }

  const applyUnorderedList = () => {
    if (activeFormats.ul) {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    } else {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
    }
  }

  const applyAlignmentLeft = () => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')
  }
  const applyAlignmentCenter = () => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')
  }
  const applyAlignmentRight = () => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')
  }

  const applyBold = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
  }

  const applyItalic = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
  }

  const applyUnderline = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
  }

  const getHeadingNode = () => {
    const selection = $getSelection()
    if (!$isRangeSelection(selection)) {
      return { error: true, targetNode: null }
    }

    const anchorNode = selection.anchor.getNode()
    const targetNode = $findMatchingParent(anchorNode, (node) => $isElementNode(node) && !$isListNode(node))

    if (!targetNode) {
      return { error: true, targetNode: null }
    }

    return { error: false, targetNode }
  }

  const convertHeadingNodeToParagraph = (targetNode) => {
    const paragraph = $createParagraphNode()
    targetNode.replace(paragraph, true)
  }

  const applyHeading = (tag) => {
    editor.update(() => {
      const { error, targetNode } = getHeadingNode()

      if (error) return

      if ($isHeadingNode(targetNode) && targetNode.getTag() === tag) {
        convertHeadingNodeToParagraph(targetNode)
        return
      }

      const newNode = $createHeadingNode(tag)

      if (targetNode.getChildren) {
        const children = targetNode.getChildren()
        children.forEach((child) => {
          newNode.append(child)
        })
      }

      targetNode.replace(newNode, true)
    })
  }

  const applyQuote = () => {
    editor.update(() => {
      const { error, targetNode } = getHeadingNode()

      if (error) return

      if (targetNode.getType() === 'quote') {
        convertHeadingNodeToParagraph(targetNode)
        return
      }

      const newNode = $createQuoteNode()

      if (targetNode.getChildren) {
        const children = targetNode.getChildren()
        children.forEach((child) => {
          newNode.append(child)
        })
      }

      targetNode.replace(newNode, true)
    })
  }

  const applyHeading1 = () => {
    applyHeading('h1')
  }

  const applyHeading2 = () => {
    applyHeading('h2')
  }

  const applyHeading3 = () => {
    applyHeading('h3')
  }

  return (
    <Stack
      direction="row"
      spacing={2}
      flexWrap="wrap"
      sx={{
        borderBottom: '1px solid',
        borderColor: 'stormWave.main',
        p: 1,
      }}
    >
      <Stack direction="row" spacing={1}>
        <IconButton variant="richText" onClick={applyBold} className={activeFormats.bold && 'active'}>
          <FormatBoldIcon />
        </IconButton>
        <IconButton variant="richText" onClick={applyItalic} className={activeFormats.italic && 'active'}>
          <FormatItalicIcon />
        </IconButton>
        <IconButton variant="richText" onClick={applyUnderline} className={activeFormats.underline && 'active'}>
          <FormatUnderlinedIcon />
        </IconButton>
      </Stack>

      <Divider orientation="vertical" flexItem sx={{ borderColor: 'stormWave.main', my: '8px !important' }} />

      <Stack direction="row" spacing={1}>
        <IconButton variant="richText" onClick={applyHeading1} className={activeFormats.h1 && 'active'}>
          <Typography fontSize={18}>H1</Typography>
        </IconButton>
        <IconButton variant="richText" onClick={applyHeading2} className={activeFormats.h2 && 'active'}>
          <Typography fontSize={18}>H2</Typography>
        </IconButton>
        <IconButton variant="richText" onClick={applyHeading3} className={activeFormats.h3 && 'active'}>
          <Typography fontSize={18}>H3</Typography>
        </IconButton>
        <IconButton variant="richText" onClick={applyQuote} className={activeFormats.quote && 'active'}>
          <FormatQuoteIcon />
        </IconButton>
      </Stack>

      <Divider orientation="vertical" flexItem sx={{ borderColor: 'stormWave.main', my: '8px !important' }} />

      <Stack direction="row" spacing={1}>
        <IconButton variant="richText" onClick={applyUnorderedList} className={activeFormats.ul && 'active'}>
          <FormatListBulletedIcon />
        </IconButton>
        <IconButton variant="richText" onClick={applyOrderedList} className={activeFormats.ol && 'active'}>
          <FormatListNumberedIcon />
        </IconButton>
      </Stack>

      <Divider orientation="vertical" flexItem sx={{ borderColor: 'stormWave.main', my: '8px !important' }} />

      <IconButton variant="richText" onClick={insertLink} className={activeFormats.link && 'active'}>
        <LinkIcon />
      </IconButton>

      <Divider orientation="vertical" flexItem sx={{ borderColor: 'stormWave.main', my: '8px !important' }} />

      <Stack direction="row" spacing={1}>
        <IconButton variant="richText" onClick={applyAlignmentLeft} className={activeFormats.alignLeft && 'active'}>
          <FormatAlignLeftIcon />
        </IconButton>
        <IconButton variant="richText" onClick={applyAlignmentCenter} className={activeFormats.alignCenter && 'active'}>
          <FormatAlignCenterIcon />
        </IconButton>
        <IconButton variant="richText" onClick={applyAlignmentRight} className={activeFormats.alignRight && 'active'}>
          <FormatAlignRightIcon />
        </IconButton>
      </Stack>
    </Stack>
  )
}

export default ToolbarPlugin
