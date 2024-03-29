import Link from "next/link";
import Image from "next/image";

import classes from "./meal-item.module.css";
import { IMeal } from "@/interfaces";

interface Props {
  meal: IMeal;
}

export default function MealItem({
  meal: { title, slug, image, summary, creator },
}: Props) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image
            src={`https://nextlevel-food-nextjs-app.s3.eu-north-1.amazonaws.com/${image}`}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
