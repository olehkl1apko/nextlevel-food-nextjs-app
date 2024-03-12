// import fs from "node:fs";
import { S3 } from "@aws-sdk/client-s3";

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

import { IMeal, IMealFormData } from "@/interfaces";

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

if (!accessKeyId || !secretAccessKey) {
  throw new Error("AWS credentials are not provided");
}

const s3 = new S3({
  region: "eu-north-1",
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const db = sql("meals.db");

export async function getMeals(): Promise<IMeal[]> {
  return db.prepare("SELECT * FROM meals").all() as IMeal[];
}

export function getMeal(slug: string) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug) as IMeal;
}

export async function saveMeal(meal: IMealFormData) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions); // protect against cross-browser attacks

  let fileName: string;
  if (meal.image instanceof File) {
    const extension = meal.image.name.split(".").pop();
    fileName = `${meal.slug}.${extension}`;
    const bufferedImage = await meal.image.arrayBuffer();

    // const stream = fs.createWriteStream(`public/images/${fileName}`);
    // stream.write(Buffer.from(bufferedImage), (error: any) => {
    //   if (error) {
    //     throw new Error("Saving image failed!");
    //   }
    // });
    s3.putObject({
      Bucket: "nextlevel-food-nextjs-app",
      Key: fileName,
      Body: Buffer.from(bufferedImage),
      ContentType: meal.image.type,
    });
  } else {
    fileName = meal.image;
  }

  meal.image = fileName;

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run(meal);
}
