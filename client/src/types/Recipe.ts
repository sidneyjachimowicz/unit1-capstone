export interface Ingredient {
  name: string;
  quantity: string;
}

export interface Instruction {
  step: number;
  description: string;
}

export interface Recipe {
  _id: string;
  title: string;
  description: string;
  image: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  tags: string[];
}