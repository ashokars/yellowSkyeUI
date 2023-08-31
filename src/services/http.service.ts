"use client"

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class HttpService {
  private instance: AxiosInstance | null = null;

  private createInstance() {
    const http = axios.create({
      baseURL: process.env.BASE_URL || "https://funny-kimono-bear.cyclic.app",
      withCredentials: false,
    });
    http.interceptors.request.use((config: any) => {
      config.headers.Authorization = `Bearer Token`;
      return config;
    });
    http.interceptors.response.use(
      (response) => response,
      (error) => {
        return new Promise((resolve, reject) => {
          // if unauthorized status
          if (error.response.status === 401) {
            //check we have refresh token
            // let rfToken = SessionStorageService.getRefreshToken();
            let rfToken = "token";
            if (rfToken) {
              //if we have get new token using refresh
              return;
            } else {
              //   SessionStorageService.clearToken();
              window.location.reload();
            }
          }
          reject(error);
        });
        // if (error.response.status === FORBIDDEN) window.location.replace('/access');
        //throw error on all other cases
        // return error;
      }
    );
    this.instance = http;
    return http;
  }

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.createInstance();
  }

  getInstance(): AxiosInstance {
    return this.instance != null ? this.instance : this.createInstance();
  }

  get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return this.http.get<T>(url, config);
  }

  post(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return this.http.post(url, data, config);
  }

  put(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return this.http.put(url, data, config);
  }

  delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.http.delete(url, config);
  }

  patch(url: string, data: any): Promise<AxiosResponse> {
    return this.http.request({
      method: "PATCH",
      url,
      responseType: "json",
      data,
    });
  }

  request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.http.request(config);
  }
}

export const HttpClient = new HttpService();
