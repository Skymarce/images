import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IImage, IImages } from '../models/images';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public searchTerm = new BehaviorSubject('');
  public pageNumber = new BehaviorSubject(1);

  constructor(
    private http: HttpClient
  ) { }

  public getImages(searchImage: string, pageNumber: number): Observable<IImages> {
    return this.http.get<IImages>(`${environment.webApi}?method=flickr.photos.search.echo&name=value`, {
      params: {
        tags: searchImage,
        method: 'flickr.photos.search',
        format: 'json',
        nojsoncallback: '1',
        tag_mode: 'all',
        media: 'photos',
        per_page: '15',
        page: pageNumber,
        extras: 'tags,date_taken,owner_name,url_q,url_m',
        api_key: `${environment.apiKey}`
      }
    })
  }

  public addImageToFavorite(image: IImage) {
    return this.http.post(`${environment.fbDBUrl}favoritesimages.json`, image)
  }

  public getFavoritesImages(): Observable<IImage[]> {
    return this.http.get<IImage[]>(`${environment.fbDBUrl}favoritesimages/.json`)
  }

  public remove(id: string): Observable<void> {
    console.log(`${environment.fbDBUrl}favoritesimages/${id}.json`) 
    return this.http.delete<void>(`${environment.fbDBUrl}favoritesimages/${id}.json`)
  }

}