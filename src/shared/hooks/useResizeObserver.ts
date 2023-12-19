import { RefObject, useEffect } from 'react'

export const useResizeObserver = (
  ref: RefObject<Element>,
  callback: ResizeObserverCallback,
) => {
  useEffect(() => {
    if (ref.current) {
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback]);
}
