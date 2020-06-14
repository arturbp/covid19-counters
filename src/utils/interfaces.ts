export interface GlobalCounter {
  cases: number;
  confirmed: number;
  deaths: number;
  recovered: number;
}

export interface Countries {
  country: string;
  cases: number;
  confirmed: number;
  deaths: number;
  recovered: number;
  updated_at: string;
  alpha2Code: string;
}