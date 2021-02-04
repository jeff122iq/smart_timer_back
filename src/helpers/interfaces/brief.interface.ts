import { ICard } from './card.interface';
export interface IBrief {
  id: number;
  name: string;
  cards: ICard[];
}
