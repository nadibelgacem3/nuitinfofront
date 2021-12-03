import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CacheControlService {
  private getrequest: any = [];
  constructor() {}

  bringInUrl(url: string, response: HttpResponse<any>): void {
    this.getrequest[url] = response;
  }

  getUrl(url: string): HttpResponse<any> | undefined {
    return this.getrequest[url];
  }

  errorUrl(url: string): void {
    this.getrequest[url] = undefined;
  }

  errorCache(): void {
    this.getrequest = {};
  }
}
