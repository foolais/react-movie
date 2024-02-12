import { twMerge } from "tailwind-merge";

/* eslint-disable react/prop-types */
const Button = (props) => {
  const { children, classname, isBgFilled } = props;

  return (
    <div
      className={twMerge(
        "flex w-max items-center justify-center gap-3 rounded-md border-[3px] border-tertiary font-semibold",
        "text-lg md:text-xl",
        isBgFilled ? "bg-tertiary text-secondary" : " text-tertiary",
        isBgFilled
          ? "hover:opacity-80"
          : "hover:bg-tertiary hover:text-secondary",
        classname,
      )}
    >
      {children}
    </div>
  );
};

export default Button;
