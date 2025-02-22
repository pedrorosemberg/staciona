
import { forwardRef } from 'react';

interface SearchInputProps {
  className?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        placeholder="Digite o endereço ou local"
        className={className}
        aria-label="Endereço para busca"
      />
    );
  }
);

SearchInput.displayName = 'SearchInput';
