export interface IMealBase {
  title: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
}

export interface IMeal extends IMealBase {
  id: number;
  slug: string;
  image: string;
}

export interface IMealFormData extends IMealBase {
  image: File | string;
  slug?: string;
}
