class BaseModel {
    public current_page: number;
    public per_page: number = 10;
    public total: number;
}

export class TagModel extends BaseModel {
    public id: string;
    public name: string;
    public remark: string;
    public created_at: string;
}
