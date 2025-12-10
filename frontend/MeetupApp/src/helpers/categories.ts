import { CategoryKey, Categories } from '../enums/categories';

export const getCategoryName = (category: string): string | undefined => {
  if (
    !category ||
    !Object.values(CategoryKey).includes(category as CategoryKey)
  ) {
    return undefined;
  } else {
    return Categories[category as CategoryKey].name;
  }
};

export const getCategoryIcon = (category: string): string | undefined => {
  if (
    !category ||
    !Object.values(CategoryKey).includes(category as CategoryKey)
  ) {
    return undefined;
  } else {
    return Categories[category as CategoryKey].icon;
  }
};
