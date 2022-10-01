import HttpClient from '@/api/httpClient';

export interface LoginData {
  username: string,
  password: string
}

class MainApi extends HttpClient {
  private static instanceCached: MainApi;

  constructor() {
    super('https://vvul9mfs1m.execute-api.us-east-1.amazonaws.com/dev');
  }

  public static getInstance = () => {
    if (!MainApi.instanceCached) MainApi.instanceCached = new MainApi();

    return MainApi.instanceCached;
  }

  public login = (data: LoginData) => this.instance.post<{ token: string }>('/login', data);
}

export default MainApi;
