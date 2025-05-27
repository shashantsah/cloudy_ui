import { Mark, mergeAttributes } from '@tiptap/core';

export const UnderlineHighlight = Mark.create({
  name: 'underlineHighlight',

  addAttributes() {
    return {
      color: {
        default: 'red',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'mark',
        getAttrs: (node) => ({
          color: node.getAttribute('data-color'),
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['mark', mergeAttributes({
      class: 'underline-highlight',
      style: `text-decoration: underline; background-color: rgb(var(--color-${HTMLAttributes.color}) / 0.2);`,
    }, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      toggleUnderlineHighlight:
        () =>
          ({ commands }: any) => {
            return commands.toggleMark('underlineHighlight');
          },
    } as Partial<Record<string, any>>;
  },
});