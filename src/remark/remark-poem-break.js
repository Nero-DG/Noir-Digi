// src/remark/remark-poem-break.js
// Remark plugin to turn paragraphs that are exactly two spaces (or only whitespace)
// into a poem-break paragraph containing a non-breaking space so it occupies
// exactly one text line in the rendered output.

export default function remarkPoemBreak() {
  return (tree) => {
    function walk(node, parent) {
      if (!node || !node.type) return;

      if (node.type === 'paragraph' && parent && Array.isArray(parent.children)) {
        const idx = parent.children.indexOf(node);
        if (idx !== -1 && node.children && node.children.length === 1) {
          const child = node.children[0];
          if (child.type === 'text') {
            const value = child.value || '';
            // Match exactly two spaces or any paragraph that's only whitespace.
            if (value === '  ' || value.trim() === '') {
              // Replace with an HTML paragraph containing a non-breaking space so
              // the element preserves text-line height but appears empty.
              parent.children.splice(idx, 1, {
                type: 'html',
                value: '<p class="poem-break" aria-hidden="true">&nbsp;</p>',
              });
              return; // replaced this node
            }
          }
        }
      }

      if (node.children && Array.isArray(node.children)) {
        // copy to avoid mutation issues while iterating
        for (const child of Array.from(node.children)) {
          walk(child, node);
        }
      }
    }

    walk(tree, null);
  };
}
