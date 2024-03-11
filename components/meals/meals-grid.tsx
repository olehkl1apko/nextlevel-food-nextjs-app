import { IMeal } from "@/interfaces";
import MealItem from "./meal-item";
import classes from "./meals-grid.module.css";

interface Props {
  meals: IMeal[];
}

export default function MealsGrid({ meals }: Props) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem meal={meal} />
        </li>
      ))}
    </ul>
  );
}
