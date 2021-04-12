export type CellTypes = 'code' | 'text';

export type cellDirection = 'up' | 'down';
export interface Cell {
  id: string;
  type: CellTypes;
  content: string;
}