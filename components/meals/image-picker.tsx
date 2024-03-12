"use client";

import { useRef } from "react";

import classes from "./image-picker.module.css";

interface Props {
  label?: string;
  name?: string;
}

export default function ImagePicker({ label, name }: Props) {
  const imageInput = useRef<HTMLInputElement>();

  function handlePickClick() {
    if (imageInput.current) {
      imageInput.current.click();
    }
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
