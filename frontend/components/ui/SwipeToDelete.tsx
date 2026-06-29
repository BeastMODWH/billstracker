'use client';
import { useRef, useState } from 'react';
import { Trash2 } from 'lucide-react';

type Props = {
  onDelete: () => void;
  children: React.ReactNode;
};

export function SwipeToDelete({ onDelete, children }: Props) {
  const [offset, setOffset] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const isDragging = useRef(false);
  const threshold = 75;

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    isDragging.current = false;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const diffX = startX.current - e.touches[0].clientX;
    const diffY = Math.abs(startY.current - e.touches[0].clientY);

    // Only swipe if horizontal movement is dominant
    if (!isDragging.current) {
      if (Math.abs(diffX) < 5 && diffY < 5) return;
      isDragging.current = Math.abs(diffX) > diffY;
    }

    if (isDragging.current && diffX > 0) {
      e.preventDefault();
      setOffset(Math.min(diffX, 100));
    }
  };

  const onTouchEnd = () => {
    if (offset >= threshold) {
      setDeleting(true);
      setTimeout(() => {
        onDelete();
        setDeleting(false);
        setOffset(0);
      }, 200);
    } else {
      setOffset(0);
    }
    isDragging.current = false;
  };

  const opacity = Math.min(1, offset / threshold);

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Delete background - only visible when swiping */}
      <div
        className="absolute inset-y-0 right-0 flex items-center justify-end px-5 rounded-2xl bg-red-500/20 transition-opacity"
        style={{ opacity }}
      >
        <div className="flex items-center gap-2">
          <Trash2 size={18} className="text-red-400" />
          <span className="text-xs text-red-400 font-medium">Delete</span>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          transform: `translateX(-${offset}px)`,
          transition: offset === 0 ? 'transform 0.3s ease' : 'none',
          opacity: deleting ? 0 : 1,
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="relative z-10"
      >
        {children}
      </div>
    </div>
  );
}
