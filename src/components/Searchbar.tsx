import React from 'react';

interface SearchbarProps {
  onSearch: (query: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ onSearch }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    onSearch(query);
  };

  return (
    <div className="relative my-4 ml-28">
      <input
        type="text"
        placeholder="Search by name..."
        className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        onChange={handleInputChange}
      />
     
    </div>
  );
};

export default Searchbar;
