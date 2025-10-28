export interface Model {
  id: number;
  name: string;
  nationality: string;
  image: string;
  profileLink: string;
}

export interface RosterModel extends Model {
  workingTime: string;
  isNew: boolean;
  isAvailableNow?: boolean;
  filming: boolean;
  cim: boolean;
  dfk: boolean;
}

export interface NewsItem {
  id: number;
  image: string;
  title: string;
  link: string;
}