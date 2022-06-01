export interface IComments {
  id: string;
  comment: string;
}
export interface INews {
  id: string;
  title: string;
  url: string;
  description: string;
  enclosure: string;
  isLike: boolean;
  comments?: IComments[];
}
