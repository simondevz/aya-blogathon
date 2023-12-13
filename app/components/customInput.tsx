"use client";

import { Dispatch, SetStateAction } from "react";

export default function Input({
  id,
  value,
  onChange,
  placeholder,
  classNameDiv,
  classNameLabel,
  classNameInput,
}: {
  id: string;
  value: string;
  onChange: any;
  placeholder?: string;
  classNameDiv?: string;
  classNameLabel?: string;
  classNameInput?: string;
}) {
  return (
    <div className={classNameDiv + " my-auto flex-col w-full"}>
      <label
        className={
          "capitalize md:text-[0.875rem] text-[0.75rem] text-black " +
          classNameLabel
        }
        htmlFor={id}
      >
        {id.replace(/_/g, " ")}
      </label>
      <input
        id={id}
        name={id}
        placeholder={placeholder || id}
        className={
          (classNameInput as string) +
          " md:p-4 p-2 outline-none md:text-base text-[0.875rem] border-2 w-full border-black rounded"
        }
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
