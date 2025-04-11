import React, { useState, useRef, useEffect } from "react";

export type SelectorOption = {
  label: string;
  codename: string;
};

type SelectorProps = {
  label: string;
  options: ReadonlyArray<SelectorOption>;
  selectedOption: string;
  onChange: (option: SelectorOption) => void;
  className?: string;
};

const Selector: React.FC<SelectorProps> = ({
  label,
  options,
  selectedOption,
  onChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: SelectorOption) => {
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className} w-[30ch]`} ref={dropdownRef}>
      <label className="block text-grey text-body-md pb-4">{label}</label>
      <div
        className={`flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer ${
          isOpen ? "border-azure" : "border-black"
        }`}
        onClick={toggleDropdown}
      >
        <span className="text-body-lg text-grey line-clamp-1">{selectedOption}</span>
        <svg
          className={"w-5 h-5"}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white shadow-2xl rounded">
          <ul className="flex flex-col gap-6 py-6 px-1">
            {options.map((option) => (
              <li
                key={option.codename}
                className={`px-4 py-2 cursor-pointer text-body-lg text-grey hover:text-azure`}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Selector;
