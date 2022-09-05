import { HttpClientProtected } from '@/api/httpClientProtected';
import { Album, PhoneNumber, SelectedAlbum } from '@/store/reducers/user';

export interface GetPreassignedUrlRequest {
  amount: number,
  numbers: PhoneNumber[]
}

export class MainApiProtected extends HttpClientProtected {
  private static instanceCached: MainApiProtected;

  constructor() {
    super();
  }

  public static getInstance() {
    if (!MainApiProtected.instanceCached) return MainApiProtected.instanceCached = new MainApiProtected();

    return MainApiProtected.instanceCached;
  }

  public getAlbums = () => this.instance.get<Album[]>('/albums');

  public getAlbum = (albumName: string) => this.instance.get<SelectedAlbum>(`/albums/${albumName}`);

  public createAlbum = (album: Album) => this.instance.post<{ message: string }>(`/albums`, album);

  public getPreassignedUrl = (body: GetPreassignedUrlRequest, albumName: string) => (
    this.instance.post<GetPreassignedUrlRequest, string[]>(`/getPresignedUrl/${albumName}`, body)
  );

  public searchClient = (number: string) => this.instance.get<PhoneNumber[]>(`searchClient?contains=${number}`);
}
