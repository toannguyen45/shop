"use client";

import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Counter from "yet-another-react-lightbox/plugins/counter";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";

interface iAppProps {
  images: string[];
}

export function ImageSlider({ images }: iAppProps) {
  const [mainIndex, setMainIndex] = useState(0);
  const [thumbStart, setThumbStart] = useState(0);
  const [open, setOpen] = useState(false);
  const maxThumbs = 4;
  const mainImageRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  // Handle drag/swipe for main image
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };
  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = e.clientX - dragStartX;
    if (diff > 50 && mainIndex > 0) setMainIndex(mainIndex - 1);
    else if (diff < -50 && mainIndex < images.length - 1)
      setMainIndex(mainIndex + 1);
  };
  // Gộp logic mouse leave: vừa reset drag vừa trả lại cursor
  const handleMainImageMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.style.cursor = "grab";
  };

  // Open lightbox at current mainIndex
  const openLightbox = () => setOpen(true);

  // Carousel infinite logic
  const handleThumbUp = () => {
    if (thumbStart === 0) setThumbStart(images.length - maxThumbs);
    else setThumbStart(thumbStart - 1);
  };
  const handleThumbDown = () => {
    if (thumbStart >= images.length - maxThumbs) setThumbStart(0);
    else setThumbStart(thumbStart + 1);
  };

  return (
    <div className="flex gap-6">
      {/* Thumbnails Carousel */}
      <div className="flex flex-col items-center w-32 bg-gray-50 rounded-xl shadow p-2">
        <Button
          onClick={handleThumbUp}
          size="icon"
          variant="ghost"
          className="mb-2"
        >
          <ChevronUp />
        </Button>
        <div className="flex flex-col gap-2 overflow-hidden h-[420px] w-[104px] items-center justify-center">
          {images.slice(thumbStart, thumbStart + maxThumbs).map((img, idx) => (
            <div
              key={img}
              className={`w-[100px] h-[100px] box-border rounded-lg overflow-hidden cursor-pointer transition border ${
                mainIndex === thumbStart + idx
                  ? "border-blue-500 bg-blue-50"
                  : "border-transparent bg-white"
              }`}
              onClick={() => setMainIndex(thumbStart + idx)}
            >
              <Image
                src={img}
                alt={`thumb-${idx}`}
                width={100}
                height={100}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
        <Button
          onClick={handleThumbDown}
          size="icon"
          variant="ghost"
          className="mt-2"
        >
          <ChevronDown />
        </Button>
      </div>
      {/* Main Image */}
      <div className="flex-1 flex items-center justify-center min-h-[520px]">
        <div
          ref={mainImageRef}
          className="rounded-xl overflow-hidden shadow-lg max-w-[520px] transition"
          style={{ cursor: "grab" }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMainImageMouseLeave}
          onMouseEnter={(e) => (e.currentTarget.style.cursor = "pointer")}
          onClick={openLightbox}
        >
          <Image
            src={images[mainIndex]}
            alt={`main-image`}
            width={520}
            height={520}
            className="object-contain bg-white w-full h-full"
          />
        </div>
        <Lightbox
          noScroll={{ disabled: true }}
          open={open}
          close={() => setOpen(false)}
          slides={images.map((img) => ({ src: img }))}
          index={mainIndex}
          plugins={[Zoom, Fullscreen, Counter]}
          on={{ view: ({ index }) => setMainIndex(index) }}
          counter={{ container: { style: { top: 0 } } }}
        />
      </div>
    </div>
  );
}
