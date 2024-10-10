import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import debounce from "lodash/debounce";

interface SearchInputType {
  characterName: string;
  setCharacterName: Dispatch<SetStateAction<string>>;
}

const SearchInput = ({ characterName, setCharacterName }: SearchInputType) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCharacterName(event.target.value);
  };

  const debouncedSetCharacterName = debounce(handleChange, 300);

  useEffect(() => {
    return () => {
      debouncedSetCharacterName.cancel();
    };
  }, [debouncedSetCharacterName]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = characterName; // Maintain the input value
      inputRef.current.focus(); // Refocus the input field
    }
  }, [characterName]);

  return (
    <div className="mb-4 sticky top-0">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search characters..."
        onChange={debouncedSetCharacterName}
        className="border border-gray-300 rounded p-2 w-full"
      />
    </div>
  );
};

export default SearchInput;
