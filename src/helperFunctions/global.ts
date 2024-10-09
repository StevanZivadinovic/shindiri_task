export const handleScroll = (fetchNextPage: any,hasNextPage:boolean, isLoading:boolean):any => {
    console.log('here')
    
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Check if user has scrolled to the bottom
    if (scrollY + windowHeight >= documentHeight - 50 && hasNextPage && !isLoading) {
        console.log('here')
      fetchNextPage(); // Fetch next page
    }
  };

  export const getNumbersFromEndOfURL = (array: (string | null)[]): number[] => {
    const residentIds = array?.map((url) => {
      const match = url?.match(/(\d+)$/);
      return match ? match[1] : null; 
    }).filter((id): id is string => id !== null); // Type predicate to filter out nulls
    const convertedIntoNumberArray =
     residentIds?.map((a)=>{
        return Number(a)
     })
     return convertedIntoNumberArray;
  };

  
  