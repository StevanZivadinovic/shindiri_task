export const handleScroll = (
  fetchNextPage: any,
  hasNextPage: boolean,
  isLoading: boolean
): any => {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  // Check if user has scrolled to the bottom
  if (
    scrollY + windowHeight >= documentHeight - 50 &&
    hasNextPage &&
    !isLoading
  ) {
    fetchNextPage();
  }
};

export const getNumbersFromEndOfURL = (array: (string | null)[]): number[] => {
  const residentIds = array
    ?.map((url) => {
      const match = url?.match(/(\d+)$/);
      return match ? match[1] : null;
    })
    .filter((id): id is string => id !== null);
  const convertedIntoNumberArray = residentIds?.map((a) => {
    return Number(a);
  });
  return convertedIntoNumberArray;
};

export const formatDate = (date: string) => {
  const dateTime = new Date(date);
  const formattedDate = dateTime.toISOString().slice(0, 10); // YYYY-MM-DD
  const formattedTime = dateTime.toISOString().slice(11, 16);
  return `${formattedDate} ${formattedTime}`;
};
