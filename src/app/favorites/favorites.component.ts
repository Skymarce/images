import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { IImage } from '../models/images';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {

  images: IImage[] = [];
  gSup = new Subscription();

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.getFavorites()
  }

  ngOnDestroy(): void {
    this.gSup && this.gSup.unsubscribe()
  }

  public remove(id: string) {
    this.searchService.remove(id)
      .subscribe({
        next: (data) => {
          this.getFavorites()
        }
      })
  }

  public getFavorites() {
    this.gSup = this.searchService.getFavoritesImages()
      .pipe(
        map(response => {
          return Object.keys(response).map(key => ({
            ...response[key],
            fbId: key
          }))
        })
      ).subscribe({
        next: (data) => {
          this.images = data
        }
      })
  }

}
