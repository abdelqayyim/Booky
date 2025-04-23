import React from 'react';
import { SEARCH_SVG } from '../pages/constants';
const SearchBar = () => {
    return (
      <div className='md:flex md:w-[300px] lg:w-[300px] flex-row items-center px-2 bg-[var(--light)] rounded md:mr-4 lg:mr-4'>
        <div className='mr-1 text-[var(--secondary)]'>{SEARCH_SVG}</div>
        <input className='text-[var(--dark)] bg-transparent border-none p-[5px] w-full outline-none' placeholder='Search for users or providers...'/>
      </div>
    )
}
  
export default SearchBar;