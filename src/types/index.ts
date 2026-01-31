export interface Model {
  id: number;
  name: string;
  nationality: string;
  image: string;        // thumbnail
  profileLink: string;
  workingTime?: string;
  startTime?: string;
  endTime?: string;
  slug: string;
}

export interface Service {
  name: string;
  available: boolean;
}

export interface RosterModel extends Model {
  workingTime: string;
  isNew: boolean;
  isRealPhoto: boolean;   // 👈 badge
  services?: Service[];
}
export interface NewsItem {
  id: number;
  image: string;
  title: string;
  link: string;
}