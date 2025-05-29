export type Inputs = {
  name: string;
  description: string;
  category_id: number;
  current_stock: number;
  minimum_stock: number;
  purchase_price: number;
  sale_price: number;
  currency: string;
}

export enum Step {
  Information = 1,
  Inventory = 2,
  Pricing = 3,
}

const fieldsByStep: Record<Step, readonly (keyof Inputs)[]> = {
  [Step.Information]: ["name", "description", "category_id"],
  [Step.Inventory]: ["current_stock", "minimum_stock"],
  [Step.Pricing]: ["purchase_price", "sale_price", "currency"],
} as const;

export function getFieldsByStep(step: Step): readonly (keyof Inputs)[] {
  return fieldsByStep[step];
}