interface IPersonMainValue {
  value: string;
}

export interface IPersonSearchDoc {
  id: number;
  name?: string;
  enName?: string;
  photo?: string;
  sex?: string;
  growth?: number;
  birthday?: string;
  death?: string;
  age?: number;
  birthPlace?: IPersonMainValue[];
  deathPlace?: IPersonMainValue[];
  profession?: IPersonMainValue[];
}

export interface IPersonSearchResponse {
  docs: IPersonSearchDoc[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}
