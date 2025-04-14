type IconButtonProps = {
  onClick: (e: React.MouseEvent) => void;
  icon: React.ReactNode;
  className?: string;
  isSelected?: boolean;
};

export const IconButton: React.FC<IconButtonProps> = ({ onClick, icon, className, isSelected }) => (
  <button
    onClick={onClick}
    className={`w-fit h-fit text-[0px] ${className} ${isSelected ? "border-[3px] border-azure rounded-full" : ""}  `}
  >
    {icon}
  </button>
);
