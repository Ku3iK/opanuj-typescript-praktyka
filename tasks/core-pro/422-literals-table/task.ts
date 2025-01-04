import type { Entities, Order, Product, User } from './table-models.ts';

type EntityMap = {
  user: User;
  product: Product;
  order: Order;
};

type ModelToEntity<Model> = {
  [Key in keyof EntityMap]: EntityMap[Key] extends Model
    ? Model extends EntityMap[Key]
      ? Key
      : never
    : never;
}[keyof EntityMap];

type Get<Model> = {
  [K in ModelToEntity<Model> as `get${Capitalize<K & string>}`]: (id: number) => Model;
};

type Update<Model> = {
  [K in ModelToEntity<Model> as `update${Capitalize<K & string>}`]: (
    id: number,
    update: Partial<Model>,
  ) => Model;
};

type Delete<Model> = {
  [K in ModelToEntity<Model> as `delete${Capitalize<K & string>}`]: (id: number) => Model;
};

export type Table<Model> = Get<Model> & Update<Model> & Delete<Model>;
