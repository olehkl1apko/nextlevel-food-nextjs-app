"use server";

import { redirect } from "next/navigation";

import { saveMeal } from "./meals";
import { IMeal } from "@/interfaces";

export async function shareMeal(formData: FormData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  await saveMeal(meal as IMeal);
  redirect("/meals");
}
