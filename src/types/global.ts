interface Character {
    id: number;
    name: string;
    image: string;
    status: string;
  }
  
  interface CharacterContextType {
    characters: Character[] | undefined;
    isLoading: boolean;
    isError: boolean;
    fetchNextPage: () => void;
    hasNextPage:any;
  }

  export type {Character, CharacterContextType}