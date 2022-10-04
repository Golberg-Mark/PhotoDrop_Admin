import { AxiosRequestConfig } from 'axios';

import HttpClient from '@/api/httpClient';

export class HttpClientProtected extends HttpClient {
  constructor() {
    super('https://14agml0pn4.execute-api.us-east-1.amazonaws.com/dev');

    this.initializeInterceptors();
  }

  private initializeInterceptors() {
    this.instance.interceptors.request.use(this.requestInterceptor);
  }

  private requestInterceptor(config: AxiosRequestConfig) {
    const token = localStorage.getItem('token');

    config.headers!.Authorization = `Bearer ${token}`;

    return config;
  }
}
