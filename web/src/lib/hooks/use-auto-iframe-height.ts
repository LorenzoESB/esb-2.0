import { useEffect } from 'react';
import { sendHeight, sendHeightDelayed } from '@/lib/utils/sendHeight';

/**
 * Hook to automatically send iframe height to parent window.
 *
 * @param dependencies - Array of dependencies that trigger height recalculation.
 *                       Typically includes state variables like `data`, `isLoading`, `results`, etc.
 * @param options - Configuration options
 * @param options.delay - Optional delay in ms before sending height (useful for animations)
 * @param options.observeResize - Whether to use ResizeObserver for automatic updates (default: true)
 *
 * @example
 * ```tsx
 * // Basic usage - sends height when data changes
 * useAutoIframeHeight([data, isLoading]);
 *
 * // With delay for animations
 * useAutoIframeHeight([results], { delay: 300 });
 *
 * // Without ResizeObserver
 * useAutoIframeHeight([data], { observeResize: false });
 * ```
 */
export function useAutoIframeHeight(
  dependencies: any[] = [],
  options: {
    delay?: number;
    observeResize?: boolean;
  } = {}
): void {
  const { delay = 0, observeResize = true } = options;

  // Send height on initial mount
  useEffect(() => {
    if (delay > 0) {
      sendHeightDelayed(delay);
    } else {
      sendHeight();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Send height when dependencies change
  useEffect(() => {
    if (delay > 0) {
      sendHeightDelayed(delay);
    } else {
      sendHeight();
    }
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  // Optional: Use ResizeObserver to detect any DOM changes
  useEffect(() => {
    if (!observeResize || typeof window === 'undefined') {
      return;
    }

    // ResizeObserver callback
    const handleResize = () => {
      if (delay > 0) {
        sendHeightDelayed(delay);
      } else {
        sendHeight();
      }
    };

    // Create observer
    const resizeObserver = new ResizeObserver(handleResize);

    // Observe the body element
    resizeObserver.observe(document.body);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
    };
  }, [delay, observeResize]);
}
