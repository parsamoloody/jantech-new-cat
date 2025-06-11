import { useRef, useCallback } from "react";

type Options = {
  hasMore: boolean;
  onLoadMore: () => void;
  threshold?: number;
};

export function useInfiniteScroll({ hasMore, onLoadMore, threshold = 1 }: Options) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const setLoaderRef = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) observerRef.current.disconnect();

    if (node && hasMore) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            onLoadMore();
          }
        },
        { threshold }
      );
      observerRef.current.observe(node);
    }

    loaderRef.current = node;
  }, [hasMore, onLoadMore, threshold]);

  return setLoaderRef;
}