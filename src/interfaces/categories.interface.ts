export interface ICategory {
  id: string;
  name: string;
  title: {
    en: string;
    ru: string;
  };
  icon: string;
}

export interface ICategories extends Array<ICategory> {}
