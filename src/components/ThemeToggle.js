import { useState } from 'react';
import { DARK_MODE_SVG, LIGHT_MODE_SVG } from '../pages/constants';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  const modeBtns = [
    {
      logo: DARK_MODE_SVG,
      onClick: ()=>{setIsDark((prev) => !prev)}
    },
    {
      logo:  LIGHT_MODE_SVG ,
      onClick: ()=>{setIsDark((prev) => !prev)}
    },
  ]

  return (
    <div
      className='mb-3 mx-2 relative h-[50px] border cursor-pointer overflow-y-hidden border-none'
      onClick={() => setIsDark((prev) => !prev)}
    >
      {modeBtns.map((btn) => {
        return (
          <div
            className={`flex flex-col items-center justify-center text-white p-3 w-full transition-transform 
                      duration-300 ${isDark ? "-translate-y-[100%]" : ""} rounded  md:hover:bg-[#4f46e5]`}
          >
        {   btn.logo}
          </div>
      )})}
    </div>
  );
}
