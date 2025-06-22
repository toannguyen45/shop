"use client";

import { ImageUp, List, Video } from "lucide-react";
import { Toggle } from "../ui/toggle";
import {
  Heading1,
  Heading2,
  Heading3,
  Code,
  Bold,
  Italic,
  Strikethrough,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Highlighter,
} from "lucide-react";
import { ListOrdered } from "lucide-react";
import type { Editor } from "@tiptap/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface ToolBarProps {
  editor: Editor | null;
}

export default function ToolBar({ editor }: ToolBarProps) {
  if (!editor) return null;

  // const [height, setHeight] = useState(480)
  // const [width, setWidth] = useState(640)

  const addImage = () => {
    const url = window.prompt("URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addYoutubeVideo = () => {
    const url = prompt("Nhập YouTube URL");

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 480,
      });
    }
  };

  const Options = [
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      preesed: editor.isActive("heading", { level: 1 }),
      tooltip: "Heading 1",
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      preesed: editor.isActive("heading", { level: 2 }),
      tooltip: "Heading 2",
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      preesed: editor.isActive("heading", { level: 3 }),
      tooltip: "Heading 3",
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      preesed: editor.isActive("bold"),
      tooltip: "Bold (Ctrl+B)",
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      preesed: editor.isActive("italic"),
      tooltip: "Italic (Ctrl+I)",
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      preesed: editor.isActive("strike"),
      tooltip: "Strikethrough",
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      preesed: editor.isActive({ textAlign: "left" }),
      tooltip: "Align Left",
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      preesed: editor.isActive({ textAlign: "center" }),
      tooltip: "Align Center",
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      preesed: editor.isActive({ textAlign: "right" }),
      tooltip: "Align Right",
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      preesed: editor.isActive("bulletList"),
      tooltip: "Bullet List",
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      preesed: editor.isActive("orderedList"),
      tooltip: "Numbered List",
    },
    {
      icon: <Code className="size-4" />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      preesed: editor.isActive("code"),
      tooltip: "Code Block",
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      preesed: editor.isActive("highlight"),
      tooltip: "Highlight",
    },
    {
      icon: <ImageUp className="size-4" />,
      onClick: () => addImage(),
      preesed: editor.isActive("image"),
      tooltip: "Insert Image",
    },
    {
      icon: <Video className="size-4" />,
      onClick: () => addYoutubeVideo(),
      preesed: editor.isActive("youtube"),
      tooltip: "Insert YouTube Video",
    },
  ];

  return (
    <TooltipProvider>
      <div className="border rounded-md p-1.5 mb-1 bg-slate-50 space-x-1 sticky top-10 z-50">
        {Options.map((option, i) => (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={option.preesed}
                onPressedChange={option.onClick}
              >
                {option.icon}
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>{option.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
