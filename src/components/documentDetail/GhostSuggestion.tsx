// src/extensions/GhostSuggestion.ts
import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";

import { Decoration, DecorationSet } from "@tiptap/pm/view";

const key = new PluginKey("ghostSuggestion");

export const GhostSuggestion = Extension.create({
  name: "ghostSuggestion",

  addOptions() {
    return {
      suggestion: "",          // injected string
      onAccept: () => {},      // callback after Tab
    };
  },

  addCommands() {
    return {
      /** update the ghost text (empty string = clear it) */
      setGhostSuggestion:
        (text: string) =>
        ({
          tr,
          dispatch,
        }: {
          tr: import("prosemirror-state").Transaction;
          dispatch?: (tr: import("prosemirror-state").Transaction) => void;
        }) => {
          if (dispatch) {
            dispatch(tr.setMeta(key, text));
          }
          return true;
        },
    } as Partial<import('@tiptap/core').RawCommands>;
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key,
        state: {
          init: (_, { doc }) => "",
          apply(tr, value) {
            // ── override if we carried a meta value ──────────────
            const meta = tr.getMeta(key);
            if (meta !== undefined) return meta as string;

            // ── clear suggestion on any doc change except ours ───
            if (tr.docChanged) return "";
            return value;
          },
        },

        props: {
          decorations(state) {
            const suggestion = key.getState(state) as string;
            if (!suggestion) return null;

            // Use $cursor if available (for TextSelection), otherwise use selection.from
            const from =
              (state.selection as any).$cursor?.pos ??
              state.selection.from;
            const deco = Decoration.widget(from, () => {
              const span = document.createElement("span");
              span.className =
                "pointer-events-none opacity-40 text-gray-500 whitespace-pre";
              span.textContent = suggestion;
              return span;
            });
            return DecorationSet.create(state.doc, [deco]);
          },

          handleKeyDown(view, event) {
            const suggestion = key.getState(view.state) as string;

            if (event.key === "Tab" && suggestion) {
              view.dispatch(view.state.tr.insertText(suggestion));
              view.dispatch(view.state.tr.setMeta(key, "")); // clear
              (view.props as any).onAccept?.();              // callback
              event.preventDefault();
              return true;
            }

            if (event.key === "Escape" && suggestion) {
              view.dispatch(view.state.tr.setMeta(key, ""));
              return true;
            }

            return false;
          },
        },
      }),
    ];
  },
});
