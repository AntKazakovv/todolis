import { useRef, useState, useCallback, type ReactEventHandler } from 'react'

export type SwipeDirection = 'left' | 'right' | null

interface UseSwipeOptions {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  threshold?: number
}

interface UseSwipeReturn {
  swipeDirection: SwipeDirection
  swipeOffset: number
  handleTouchStart: ReactEventHandler<HTMLDivElement>
  handleTouchMove: ReactEventHandler<HTMLDivElement>
  handleTouchEnd: ReactEventHandler<HTMLDivElement>
}

export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  threshold = 80,
}: UseSwipeOptions): UseSwipeReturn {
  const touchStartX = useRef(0)
  const [swipeOffset, setSwipeOffset] = useState(0)
  const [direction, setDirection] = useState<SwipeDirection>(null)

  const handleTouchStart: ReactEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      const touch = (e.nativeEvent as unknown as TouchEvent).touches[0]
      if (touch) {
        touchStartX.current = touch.clientX
      }
    },
    [],
  )

  const handleTouchMove: ReactEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      const touch = (e.nativeEvent as unknown as TouchEvent).touches[0]
      if (touch) {
        const currentX = touch.clientX
        const diff = currentX - touchStartX.current
        setSwipeOffset(diff)
        setDirection(diff > 0 ? 'right' : 'left')
      }
    },
    [],
  )

  const handleTouchEnd: ReactEventHandler<HTMLDivElement> = useCallback(
    () => {
      const offset = swipeOffset
      setSwipeOffset(0)
      setDirection(null)

      if (Math.abs(offset) > threshold) {
        if (offset > 0) {
          onSwipeRight?.()
        } else {
          onSwipeLeft?.()
        }
      }
    },
    [swipeOffset, threshold, onSwipeLeft, onSwipeRight],
  )

  return {
    swipeDirection: direction,
    swipeOffset,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  }
}
