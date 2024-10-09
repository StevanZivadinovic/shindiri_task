// src/context/CharacterContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { useInfiniteQuery } from 'react-query';
import { fetchCharacters } from '../consts/Api';
import { CharacterContextType } from '../types/global';



const CharacterContext = createContext<CharacterContextType | undefined>(undefined);


export const CharacterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery('characters', fetchCharacters, {
    getNextPageParam: (lastPage) => {
      return lastPage.info.next ? lastPage.info.next.split('page=')[1] : false;
    },
  });

  const characters = data?.pages.flatMap(page => page.results); 

  return (
    <CharacterContext.Provider value={{ characters, isLoading, isError, fetchNextPage, hasNextPage}}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacters = () => {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error('useCharacters must be used within a CharacterProvider');
  }
  return context;
};
