export interface IMealBase {
  slug: string;
  title: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
}

export interface IMeal extends IMealBase {
  id: number;
  image: string;
}

export interface IMealFormData extends IMealBase {
  image: File | string;
}
