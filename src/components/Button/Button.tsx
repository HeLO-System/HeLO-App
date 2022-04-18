import classNames from "classnames";
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

interface ButtonProps {
  icon?: JSX.Element;
  text: string;
  className?: string;
}

export const Button: FC<
  ButtonProps &
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
> = ({ text, icon, className, ...props }) => (
  <button
    className={classNames(
      "bg-e-2 p-2 rounded-lg shadow-elevation-1 text-font flex justify-center items-center gap-2 hover:scale-105 ",
      className
    )}
    {...props}
  >
    {icon}
    {text}
  </button>
);
