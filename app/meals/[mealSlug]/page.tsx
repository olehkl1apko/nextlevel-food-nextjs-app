import Image from "next/image";
import { notFound } from "next/navigation";

import { getMeal } from "@/lib/meals";
import classes from "./page.module.css";

interface Props {
  params: {
    mealSlug: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const meal = await getMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default async function MealDetailsPage({ params }: Props) {
  const meal = await getMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            src={`https://nextlevel-food-nextjs-app.s3.eu-north-1.amazonaws.com/${meal.image}`}
            alt={meal.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
}
