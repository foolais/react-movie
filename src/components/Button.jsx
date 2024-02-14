import { twMerge } from "tailwind-merge";

/* eslint-disable react/prop-types */
const Button = (props) => {
  const { children, classname } = props;

  return (
    <div
      className={twMerge(
        "flex w-max items-center justify-center gap-3 rounded-md border-2 border-tertiary font-semibold",
        "text-lg",
        classname,
      )}
    >
      {children}
    </div>
  );
};

export default Button;
