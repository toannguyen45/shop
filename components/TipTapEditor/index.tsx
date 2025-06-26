"use client";

import { useEditor, EditorContent, EditorContext } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import ImageResize from "tiptap-extension-resize-image";
import Youtube from "@tiptap/extension-youtube";
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";
import "@/components/tiptap-node/image-node/image-node.scss";
import ToolBar from "./ToolBar";
import "./styles.scss";
import { ImageUploadNode } from "../tiptap-node/image-upload-node";
import { useEffect } from "react";

interface RichTextEditorProps {
  content?: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({
  content = "",
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-3",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-3",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      ImageResize,
      Youtube,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
    ],
    content: content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3",
        spellcheck: "false",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }
  }, [editor]);

  return (
    <EditorContext.Provider value={{ editor }}>
      <ToolBar editor={editor} />
      <EditorContent editor={editor} role="presentation" />
    </EditorContext.Provider>
  );
}
