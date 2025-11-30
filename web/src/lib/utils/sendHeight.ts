/**
 * Sends the current iframe height to the parent window.
 * This allows the parent page to dynamically adjust the iframe height
 * and eliminate internal scrollbars.
 */
export function sendHeight(): void {
  // Only execute if we're inside an iframe
  if (typeof window === 'undefined' || window.self === window.top) {
    return;
  }

  // Get the full document height including all content
  const height = Math.max(
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight,
    document.body.scrollHeight,
    document.body.offsetHeight
  );

  // Send height to parent window
  // Using "*" as targetOrigin for broader compatibility
  // In production, you may want to specify the exact parent origin
  window.parent.postMessage({ iframeHeight: height }, '*');
}

/**
 * Sends height with a small delay to ensure DOM updates are complete.
 * Useful for cases where content is being dynamically rendered.
 */
export function sendHeightDelayed(delayMs: number = 100): void {
  setTimeout(() => {
    sendHeight();
  }, delayMs);
}
