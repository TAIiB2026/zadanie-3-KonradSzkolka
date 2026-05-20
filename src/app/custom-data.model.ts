export interface CustomData {
  id: string;
  amount: number;
  date: Date;
  description: string;
}

export interface CustomDataRepository {
  getAll(): CustomData[];
  add(item: CustomData): void;
  remove(id: string): void;
}
