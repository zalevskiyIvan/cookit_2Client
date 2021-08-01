export type postType = {
  title: string;
  description: string;
  ingridients: string[];
  category: string;
  img: string;
  recipe: {
    id: number;
    stepDescription: string;
  }[];
  cook: string;
  comments: never[];
  likesCount: string[];
  bookmarks: string[];
  createdAt: string;
  _id: string;
};
