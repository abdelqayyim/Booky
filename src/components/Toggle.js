import React from 'react';

const Toggle = ({ options, height, width, currentValue }) => {
  // example options: [{ title: "", onClick }]
  return (
    <div
      className={`${height} ${width} flex flex-row justify-center bg-[var(--toggle-background)] rounded-xl mx-[5px]`}
    >
      {options.map((option, index) => (
        <div
          className="w-1/2 h-full flex flex-row items-center justify-center hover:cursor-pointer"
          key={index}
          onClick={option.onClick}
        >
          <div
            className={`w-[90%] h-[80%] flex flex-col items-center justify-center font-semibold ${
              currentValue === option.title
                ? 'bg-[var(--toggle-button-background)] shadow-md'
                : ''
            } rounded-xl`}
          >
            {option.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Toggle;
