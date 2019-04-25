
export class SystemLogModel {
  public date: string;
  public total: number;
}

export interface ISystemLog {
  date: string;
  total: number;
}

export interface IArticleType {
  type_name: string;
  total: number;
}

export interface IArticleTag {
  name: string;
  total: number;
}
