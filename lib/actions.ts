"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { IMealFormData } from "@/interfaces";

function isInvalidText(text: string | null): boolean {
  return !text || text.trim() === "";
}

export async function shareMeal(
  prevState: { message: string },
  formData: FormData
) {
  const title = formData.get("title") as string;
  const summary = formData.get("summary") as string;
  const instructions = formData.get("instructions") as string;
  const image = formData.get("image") as File;
  const creator = formData.get("name") as string;
  const creator_email = formData.get("email") as string;

  if (
    isInvalidText(title) ||
    isInvalidText(summary) ||
    isInvalidText(instructions) ||
    isInvalidText(creator) ||
    isInvalidText(creator_email) ||
    !creator_email.includes("@") ||
    !image ||
    image.size === 0
  ) {
    return {
      message: "Invalid input",
    };
  }

  const meal: IMealFormData = {
    title,
    summary,
    instructions,
    image,
    creator,
    creator_email,
  };

  await saveMeal(meal);
  redirect("/meals");
}
