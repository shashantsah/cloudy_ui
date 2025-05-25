export const aiTextAreaMention = {
  render: () => ({
    onStart: (props) => console.log("Mention suggestion started:", props),
    onUpdate: (props) => console.log("Mention suggestion updated:", props),
    onKeyDown: (props) => {
      console.log("Mention keydown:", props.event.key);
      if (props.event.key === "Escape") {
        props.hide();
        return true;
      }
      return false;
    },
    onExit: () => console.log("Mention suggestion exited"),
  }),
};

export const AiTextAreaMention = {
  name: "mention",
  addOptions: () => ({
    HTMLAttributes: {},
    renderText: ({ node }) => `@${node.attrs.label ?? node.attrs.id}`,
    renderHTML: ({ node }) => [
      "a",
      { class: "mention", href: node.attrs.url, "data-type": "mention" },
      `@${node.attrs.label ?? node.attrs.id}`,
    ],
    suggestion: {
      char: "@",
    },
  }),
};