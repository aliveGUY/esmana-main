import { useEffect } from 'react'
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_HIGH } from 'lexical'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { mergeRegister } from '@lexical/utils'

/**
 * TabPlugin - Handles tab key presses in the editor to create indentation
 *
 * This plugin allows users to:
 * - Press Tab to indent a paragraph
 * - Press Shift+Tab to outdent a paragraph
 * - Prevents the tab key from moving focus away from the editor
 */
export default function TabPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return mergeRegister(
      // Handle keydown events
      editor.registerCommand(
        'keydown',
        (event) => {
          // Only handle Tab key
          if (event.key !== 'Tab') {
            return false
          }

          // Prevent default tab behavior (moving focus)
          event.preventDefault()

          // Get current selection
          editor.update(() => {
            const selection = $getSelection()

            // Only handle range selections
            if (!$isRangeSelection(selection)) {
              return
            }

            // Get the anchor node (where the cursor is)
            const anchorNode = selection.anchor.getNode()

            // Find the parent paragraph node
            let paragraphNode = anchorNode
            while (paragraphNode && paragraphNode.getType() !== 'paragraph') {
              paragraphNode = paragraphNode.getParent()
            }

            // If we found a paragraph node
            if (paragraphNode) {
              // Get current classes
              const currentClasses = paragraphNode.getClass() || ''
              const classes = currentClasses.split(' ').filter(Boolean)

              if (event.shiftKey) {
                // Shift+Tab: Remove indentation
                if (classes.includes('tab-indented-2')) {
                  // Remove second level, go back to first level
                  classes.splice(classes.indexOf('tab-indented-2'), 1)
                  classes.push('tab-indented')
                } else if (classes.includes('tab-indented')) {
                  // Remove first level indentation
                  classes.splice(classes.indexOf('tab-indented'), 1)
                }
              } else {
                // Tab: Add indentation
                if (classes.includes('tab-indented')) {
                  // Already at first level, go to second level
                  classes.splice(classes.indexOf('tab-indented'), 1)
                  classes.push('tab-indented-2')
                } else {
                  // No indentation yet, add first level
                  classes.push('tab-indented')
                }
              }

              // Set the updated classes
              paragraphNode.setClass(classes.join(' '))
            }
          })

          // We handled the event
          return true
        },
        COMMAND_PRIORITY_HIGH,
      ),
    )
  }, [editor])

  // This plugin doesn't render anything
  return null
}
