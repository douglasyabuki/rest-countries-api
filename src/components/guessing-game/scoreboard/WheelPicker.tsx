import React, { useCallback, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface WheelPicker {
  items: string[];
  selectedIndex?: number;
  onSelectionChange?: (index: number, value: string) => void;
  itemHeight?: number;
  visibleItems?: number;
  className?: string;
  infinite?: boolean;
}

export const WheelPicker = ({
  items,
  selectedIndex = 0,
  onSelectionChange,
  itemHeight = 50,
  visibleItems = 5,
  infinite = true,
}: WheelPicker) => {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [initialScrollTop, setInitialScrollTop] = useState(0);
  const [scrollTop, setScrollTop] = useState(selectedIndex * itemHeight);

  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const containerHeight = visibleItems * itemHeight;
  const centerOffset = ((visibleItems - 1) * itemHeight) / 2;

  // For infinite scroll, we multiply items to create seamless loop
  const repeats = infinite ? 5 : 1;
  const extendedItems = infinite
    ? Array.from(
        { length: items.length * repeats },
        (_, i) => items[i % items.length],
      )
    : items;
  const centerStart = infinite ? Math.floor(repeats / 2) * items.length : 0;

  // Normalize index for infinite scroll
  const normalizeIndex = useCallback(
    (index: number) => {
      if (!infinite) return Math.max(0, Math.min(items.length - 1, index));
      return ((index % items.length) + items.length) % items.length;
    },
    [infinite, items.length],
  );

  // Get scroll position for infinite scroll
  const getScrollPosition = useCallback(
    (index: number) => {
      if (!infinite) return index * itemHeight;
      return (centerStart + index) * itemHeight;
    },
    [infinite, centerStart, itemHeight],
  );

  // Update selected index based on scroll position
  const updateSelection = useCallback(
    (newScrollTop: number) => {
      const rawIndex = Math.round(newScrollTop / itemHeight);
      let actualIndex: number;

      if (infinite) {
        actualIndex = normalizeIndex(rawIndex - centerStart);
      } else {
        actualIndex = Math.max(0, Math.min(items.length - 1, rawIndex));
      }

      if (actualIndex !== currentIndex) {
        setCurrentIndex(actualIndex);
        onSelectionChange?.(actualIndex, items[actualIndex]);
      }
    },
    [
      currentIndex,
      itemHeight,
      items,
      onSelectionChange,
      infinite,
      centerStart,
      normalizeIndex,
    ],
  );

  // Smooth scroll to target position
  const scrollToIndex = useCallback(
    (index: number) => {
      const normalizedIndex = normalizeIndex(index);
      const targetScrollTop = getScrollPosition(normalizedIndex);
      setScrollTop(targetScrollTop);
      setCurrentIndex(normalizedIndex);
      onSelectionChange?.(normalizedIndex, items[normalizedIndex]);
    },
    [normalizeIndex, getScrollPosition, items, onSelectionChange],
  );

  // Handle infinite scroll repositioning
  const handleInfiniteScroll = useCallback(
    (newScrollTop: number) => {
      if (!infinite) return newScrollTop;

      const totalHeight = extendedItems.length * itemHeight;
      const sectionHeight = items.length * itemHeight;
      const firstSectionEnd = sectionHeight;
      const lastSectionStart = totalHeight - sectionHeight * 2;

      // If we're near the beginning, jump to the equivalent position near the end
      if (newScrollTop < firstSectionEnd) {
        return newScrollTop + sectionHeight * 2;
      }

      // If we're near the end, jump to the equivalent position near the beginning
      if (newScrollTop > lastSectionStart) {
        return newScrollTop - sectionHeight * 2;
      }

      return newScrollTop;
    },
    [infinite, extendedItems.length, items.length, itemHeight],
  );

  // Handle mouse/touch drag start
  const handleDragStart = useCallback(
    (clientY: number) => {
      setIsDragging(true);
      setDragStartY(clientY);
      setInitialScrollTop(scrollTop);
      isScrollingRef.current = true;
    },
    [scrollTop],
  );

  // Handle mouse/touch drag move
  const handleDragMove = useCallback(
    (clientY: number) => {
      if (!isDragging) return;

      const deltaY = clientY - dragStartY;
      let newScrollTop = initialScrollTop - deltaY;

      if (infinite) {
        newScrollTop = handleInfiniteScroll(newScrollTop);
      } else {
        newScrollTop = Math.max(
          0,
          Math.min(newScrollTop, (items.length - 1) * itemHeight),
        );
      }

      setScrollTop(newScrollTop);
    },
    [
      isDragging,
      dragStartY,
      initialScrollTop,
      infinite,
      handleInfiniteScroll,
      items.length,
      itemHeight,
    ],
  );

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);
    updateSelection(scrollTop);

    // Snap to nearest item
    const rawIndex = Math.round(scrollTop / itemHeight);
    let targetIndex: number;

    if (infinite) {
      const actualIndex = normalizeIndex(rawIndex - centerStart);
      targetIndex = rawIndex;
      setCurrentIndex(actualIndex);
      onSelectionChange?.(actualIndex, items[actualIndex]);
    } else {
      targetIndex = Math.max(0, Math.min(items.length - 1, rawIndex));
      setCurrentIndex(targetIndex);
      onSelectionChange?.(targetIndex, items[targetIndex]);
    }

    setScrollTop(targetIndex * itemHeight);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 150);
  }, [
    isDragging,
    scrollTop,
    itemHeight,
    infinite,
    normalizeIndex,
    centerStart,
    items,
    onSelectionChange,
    updateSelection,
  ]);

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    containerRef.current?.focus();
    handleDragStart(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientY);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    containerRef.current?.focus();
    handleDragStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Wheel event
  const handleWheel = (e: React.WheelEvent) => {
    if (isScrollingRef.current) return;

    const delta = e.deltaY > 0 ? 1 : -1;
    let newIndex: number;

    if (infinite) {
      newIndex = currentIndex + delta;
    } else {
      newIndex = Math.max(0, Math.min(items.length - 1, currentIndex + delta));
    }

    scrollToIndex(newIndex);
  };

  // Keyboard events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isScrollingRef.current) return;

    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        if (infinite) {
          scrollToIndex(currentIndex - 1);
        } else {
          scrollToIndex(Math.max(0, currentIndex - 1));
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (infinite) {
          scrollToIndex(currentIndex + 1);
        } else {
          scrollToIndex(Math.min(items.length - 1, currentIndex + 1));
        }
        break;
      case "Home":
        e.preventDefault();
        scrollToIndex(0);
        break;
      case "End":
        e.preventDefault();
        scrollToIndex(items.length - 1);
        break;
    }
  };

  // Handle global mouse events when dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      handleDragMove(e.clientY);
    };

    const handleGlobalMouseUp = () => {
      handleDragEnd();
    };

    document.addEventListener("mousemove", handleGlobalMouseMove);
    document.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  // Initialize infinite scroll position
  useEffect(() => {
    if (infinite && scrollTop === selectedIndex * itemHeight) {
      const initialPosition = getScrollPosition(selectedIndex);
      setScrollTop(initialPosition);
    }
  }, [infinite, selectedIndex, itemHeight, getScrollPosition, scrollTop]);

  // Update scroll position when selectedIndex prop changes
  useEffect(() => {
    if (
      selectedIndex !== currentIndex &&
      !isDragging &&
      !isScrollingRef.current
    ) {
      scrollToIndex(selectedIndex);
    }
  }, [selectedIndex, currentIndex, isDragging, scrollToIndex]);

  const getItemOpacity = useCallback(
    (index: number) => {
      const displayIndex = infinite
        ? (index - centerStart + items.length) % items.length
        : index;
      const distance = Math.abs(displayIndex - currentIndex);
      const minDistance = infinite
        ? Math.min(distance, items.length - distance)
        : distance;

      if (minDistance === 0) return 1;
      if (minDistance === 1) return 0.7;
      if (minDistance === 2) return 0.4;
      return 0.2;
    },
    [currentIndex, infinite, centerStart, items.length],
  );

  const getItemScale = useCallback(
    (index: number) => {
      const displayIndex = infinite
        ? (index - centerStart + items.length) % items.length
        : index;
      const distance = Math.abs(displayIndex - currentIndex);
      const minDistance = infinite
        ? Math.min(distance, items.length - distance)
        : distance;

      if (minDistance === 0) return 1;
      if (minDistance === 1) return 0.9;
      return 0.8;
    },
    [currentIndex, infinite, centerStart, items.length],
  );

  return (
    <div className="mb-6 flex flex-col items-center">
      <div
        ref={containerRef}
        className={twMerge(
          "relative box-border cursor-grab select-none overflow-hidden border-y-4 border-double border-transparent duration-150 focus:border-indigo-400/40 outline-none dark:focus:border-indigo-400/40",
          isDragging ? "cursor-grabbing" : "",
        )}
        style={{
          height: containerHeight,
          width: "200px",
          overscrollBehavior: "contain",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {/* Selection indicator */}
        <div
          className="pointer-events-none absolute left-0 right-0 z-10 rounded-lg border-b-2 border-t-2 border-indigo-400 bg-transparent opacity-40"
          style={{
            top: centerOffset,
            height: itemHeight,
          }}
        />

        {/* Items container */}
        <div
          className="relative transition-transform duration-200 ease-out"
          style={{
            transform: `translateY(${centerOffset - scrollTop}px)`,
            transitionDuration: isDragging ? "0ms" : "200ms",
          }}
        >
          {extendedItems.map((item, index) => {
            const isSelected = infinite
              ? (index - centerStart + items.length) % items.length ===
                currentIndex
              : index === currentIndex;

            return (
              <div
                key={index}
                className={twMerge(
                  "flex items-center justify-center text-center font-medium transition-all duration-200",
                  isSelected
                    ? "text-lg font-bold text-light-mode-text dark:text-dark-mode-text"
                    : "text-base font-normal text-light-mode-text/80 dark:text-dark-mode-text/80",
                )}
                style={{
                  height: itemHeight,
                  opacity: getItemOpacity(index),
                  transform: `scale(${getItemScale(index)})`,
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
