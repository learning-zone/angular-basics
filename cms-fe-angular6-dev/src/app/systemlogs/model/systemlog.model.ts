
export class SystemLogModel {
  public id: string;
  public request_ip: string;
  public request_url: string;
  public request_method: string;
  public request_params: string;
  public request_client: string;
  public client_type: string;
  public client_version: string;
  public host: string;
  public hostname: string;
  public request_header: string;
  public path: string;
  public origin: string;
  public time: number;
  public msg: string;
  public source: string;
  public created_by: string;
  public created_at: string;
  public updated_by: string;
  public updated_at: string;
  public deleted_by: string;
  public deleted_at: string;
  public version: number;
  public creator: UserModel = new UserModel();
}

class UserModel {
  public id: string;
  public username: string;
  public nick_name: string;
  public sex: number;
  public user_type: number;
}
