import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { images } from '../models/images';
import { environment } from 'src/environments/environment';
import { Page } from '../models/pages';
import { ImagesCollection } from '../models/images-collection-result';
import { User } from '../models/user';
import { ImageStatistics } from '../models/image-statistics';

@Injectable({
  providedIn: 'root'
})
export class UnsplashApiService {

  constructor(private http: HttpClient) { 
    console.log('Servicio Http:')
  }

  getPhotosList(page: Page = {page:1, per_page:10}): Observable<images[]> {
    let query = `?page=${page.page}&per_page=${page.per_page}`;
    return this.http.get<images[]>(`${environment.url_base}photos/?query=${query}`);
  }

  getPhotosByQuery(query: string, page: Page = {page:1, per_page:10}): Observable<ImagesCollection<images>> {
    return this.http.get<ImagesCollection<images>>(`${environment.url_base}search/photos?query=${query}&page=${page.page}&per_page=${page.per_page}`);
  }

  getPhotoStatistics(id: string): Observable<ImageStatistics> {
    return this.http.get<ImageStatistics>(`${environment.url_base}photos/${id}/statistics`)
  }

  getUserData(username: string): Observable<User> {
    return this.http.get<User>(`${environment.url_base}users/${username}`);
  }
}
