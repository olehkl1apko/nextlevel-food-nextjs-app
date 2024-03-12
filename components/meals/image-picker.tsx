"use client";

import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";

import classes from "./image-picker.module.css";

interface Props {
  label: string;
  name: string;
}

export default function ImagePicker({ label, name }: Props) {
  const [pickedImage, setPickedImage] = useState<string | ArrayBuffer | null>();
  const imageInput = useRef<HTMLInputElement | null>(null);

  function handlePickClick() {
    if (imageInput.current) {
      imageInput.current.click();
    }
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {typeof pickedImage === "string" && (
            <Image
              src={pickedImage}
              alt="The image selected by the user."
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required
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
