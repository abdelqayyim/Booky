import { useState, useEffect } from 'react';
import { DARK_MODE_SVG, LIGHT_MODE_SVG } from '../pages/constants';

export default function ThemeToggle({ showLabel }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const modeBtns = [
    {
      label: "Dark",
      logo: DARK_MODE_SVG,
    },
    {
      label: "Light",
      logo: LIGHT_MODE_SVG,
    },
  ];

  return (
    <div
      className="relative w-full h-[56px] overflow-hidden rounded cursor-pointer transition-colors duration-300 hover:sm:bg-[var(--primary)] hover:text-[var(--light)] text-[var(--dark)]
                px-[15px]
      "
      onClick={() => setIsDark((prev) => !prev)}
    >
      <div
        className="absolute top-0 left-0 w-full transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateY(${isDark ? '-50%' : '0%'})`,
        }}
      >
        {modeBtns.map((btn, index) => (
          <div key={btn.label} className=" text-[var(--text-opposite-primary)] md:text-[var(--text-primary)] w-full h-[56px] flex items-center px-3 gap-3">
            {btn.logo}
            <span className={showLabel ? "block flex-grow text-left" : "hidden"}>
              {btn.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
