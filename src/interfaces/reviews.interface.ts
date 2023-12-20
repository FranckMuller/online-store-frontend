export interface IProductReview {
  id: string;
  rating: number;
  text?: string;
}

export interface IProductReviews extends Array<IProductReview> {}
