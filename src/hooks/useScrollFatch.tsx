import { useEffect, useCallback } from "react";

const useScrollFetch = (
  fetchNextPage: () => void,
  hasNextPage: boolean,
  isLoading: boolean
) => {
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (
      scrollY + windowHeight >= documentHeight - 50 &&
      hasNextPage &&
      !isLoading
    ) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
};

export default useScrollFetch;
