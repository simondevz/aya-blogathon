"use client";

import { Dispatch, SetStateAction } from "react";

export default function Input({
  id,
  // setValue,
  value,
  onChange,
  classNameDiv,
  classNameLabel,
  classNameInput,
}: {
  id: string;
  // setValue: Dispatch<SetStateAction<string>>;
  value: string;
  onChange: any;
  classNameDiv?: string;
  classNameLabel?: string;
  classNameInput?: string;
}) {
  return (
    <div className={classNameDiv + " my-auto flex-col w-full"}>
      <label className={"capitalize text-[0.875rem] text-black"} htmlFor={id}>
        {id.replace(/_/g, " ")}
      </label>
      <input
        id={id}
        name={id}
        placeholder={id}
        className={
          (classNameInput as string) +
          " p-4 outline-none border-2 w-full border-black rounded"
        }
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
