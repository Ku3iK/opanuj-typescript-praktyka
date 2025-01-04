type Person = {
  firstName: string;
  lastName: string;
};

type InteriorField<Fields> = {
  [Field in keyof Fields]: Fields[Field];
};

type FieldExtender<T, K> = {
  [Prop in keyof T]: InteriorField<K> & {
    value: string;
  };
};

type PersonUpdateHistory = FieldExtender<
  Person,
  {
    isUpdated: boolean;
    updatedAt: number | null;
  }
>;

export const history: PersonUpdateHistory = {
  firstName: {
    value: 'John',
    isUpdated: false,
    updatedAt: null,
  },
  lastName: {
    value: 'Doe',
    isUpdated: true,
    updatedAt: new Date().getTime(),
  },
};
