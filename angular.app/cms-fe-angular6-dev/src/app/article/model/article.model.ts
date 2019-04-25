
export class ArticleModel {
    public id: string;
    public title: string;
    public is_top: number = 0;
    public type_id: string;
    public abstract: string;
    public pics: string;
    public content: string;
    public praise: number;
    public view_count: number;
    public is_original: boolean = true;
    public tag: string;
    public created_at: string;
}

export interface ITag {
    id: string;
    name: string;
}
