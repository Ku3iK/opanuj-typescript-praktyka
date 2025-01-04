type PagesMap = {
  homepage: string;
  about: string;
  contact: string;
};

type TypesPages<Type> = keyof Type;

type PagesAccess<Type, AllowedPages extends TypesPages<Type>> = {
  [Prop in AllowedPages]: boolean;
};

export function checkAccess<Type extends PagesMap>(map: Type): PagesAccess<Type, TypesPages<Type>> {
  return Object.keys(map).reduce(
    (accessMap, key) => {
      accessMap[key as TypesPages<Type>] = true;
      return accessMap;
    },
    {} as PagesAccess<Type, TypesPages<Type>>,
  );
}
