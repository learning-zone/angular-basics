import { UserModel } from '@app/user/model/user.model';
import { ArticleModel } from '@app/article/model/article.model';

export class CommentModel {
  public id: string;
  public article_id: string;
  public content: string;
  public ip: string;
  public client: string;
  public parent_id: string;
  public created_by: string;
  public created_at: string;
  public updated_by: string;
  public updated_at: string;
  public deleted_by: string;
  public deleted_at: string;
  public version: number;
  public creator: UserModel = new UserModel();
  public article: ArticleModel = new ArticleModel();
}
