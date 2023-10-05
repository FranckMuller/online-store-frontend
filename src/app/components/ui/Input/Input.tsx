"use client";
import type { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

// type, disabled

const Input = ({ name, label, ...rest }: IProps) => {
  return (
    <div>
      <input {...rest} />
    </div>
  );
};

export default Input;
