export type Inputs = {
  name: string;
  weight: number;
  description: string;
  category: string;
  size: string;
  image?: string;
  price: number;
  currency: string;
  sku: string;
  project_tags: string[];
}

export enum Step {
  Information = 1,
  Media = 2,
  Pricing = 3,
}

const fieldsByStep: Record<Step, readonly (keyof Inputs)[]> = {
  [Step.Information]: ["name", "weight", "description", "category", "size"],
  [Step.Media]: ["image"],
  [Step.Pricing]: ["price", "currency", "sku", "project_tags"],
} as const;

export function getFieldsByStep(step: Step): readonly (keyof Inputs)[] {
  return fieldsByStep[step];
}