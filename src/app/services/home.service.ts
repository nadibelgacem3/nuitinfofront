import { Injectable } from '@angular/core';
import {SERVER_API_URL} from '../app.constants';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {HttpClient} from '@angular/common/http';
import {ISlider, Slider} from '../shared/models/home/slider.model';
import {IFooter} from '../shared/models/home/footer.model';
import {ISection} from '../shared/models/home/section.model';
import {IContact} from '../shared/models/home/contact.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public resourceUrl = SERVER_API_URL + 'eshop/api';
  public resourceUrl_2 = SERVER_API_URL + 'eshop/api/public';
  constructor(protected http: HttpClient) { }

  querySlide(schemaName: string): Observable<ISlider[]> {
    return this.http.get<ISlider[]>(`${this.resourceUrl}/slides/slidePublic/${schemaName}`).pipe(
      catchError(e => {
        Swal.fire({
         icon: 'info',
           title: 'Network Error',
          text: "the operation couldn't be completed.",
        });
        return throwError(e);
      })
    );
  }

  queryFooter(schemaName: string): Observable<IFooter[]> {
    return this.http.get<IFooter[]>(`${this.resourceUrl}/footers/footerPublic/${schemaName}`).pipe(
      catchError(e => {
        Swal.fire({
         icon: 'info',
           title: 'Network Error',
          text: "the operation couldn't be completed.",
        });
        return throwError(e);
      })
    );
  }

  querySection(schemaName: string): Observable<ISection[]> {
    return this.http.get<ISection[]>(`${this.resourceUrl}/sections/sectionPublic/${schemaName}`).pipe(
      catchError(e => {
        Swal.fire({
         icon: 'info',
           title: 'Network Error',
          text: "the operation couldn't be completed.",
        });
        return throwError(e);
      })
    );
  }

  queryHeader(schemaName: string): Observable<IContact[]> {
    return this.http.get<IContact[]>(`${this.resourceUrl_2}/company-configs/${schemaName}`).pipe(
      catchError(e => {
        Swal.fire({
         icon: 'info',
           title: 'Network Error',
          text: "the operation couldn't be completed.",
        });
        return throwError(e);
      })
    );
  }

  queryContact(schemaName: string): Observable<IContact[]> {
    return this.http.get<IContact[]>(`${this.resourceUrl}/public/company-configs/${schemaName}`).pipe(
      catchError(e => {
        Swal.fire({
         icon: 'info',
           title: 'Network Error',
          text: "the operation couldn't be completed.",
        });
        return throwError(e);
      })
    );
  }


}
