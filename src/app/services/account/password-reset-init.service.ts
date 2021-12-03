import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from '../../app.constants';
import {  CompanyUser } from '../../core/user/user.model';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  constructor(private http: HttpClient) {}

  save(account: CompanyUser): Observable<{}> {
    return this.http.post(SERVER_API_URL + 'api/register', account);
  }
}

