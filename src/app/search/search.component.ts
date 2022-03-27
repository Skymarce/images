import { AfterViewInit, Component, Output, ViewChild } from '@angular/core';
import { observable, Subscription } from 'rxjs';
import { IImage, IImages } from '../models/images';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements AfterViewInit {

  isPagination: boolean = false;
  subscription: Subscription;
  imagesData: IImage[];
  searchValue = '';
  pageNumber: number;

  @Output() total: number;
  @ViewChild('searchTerm') searchTerm: any;

  constructor(
    private searchService: SearchService
  ) { }

  ngAfterViewInit(): void {
    this.searchTerm.nativeElement.value = '';
  }

  public searchImage(pageNumber?: number): void {

    this.searchValue = this.searchTerm.nativeElement.value;
    let searchTerm = this.searchTerm.nativeElement.value;
    if (searchTerm) {
      this.subscription = this.searchService.getImages(searchTerm, pageNumber)
        .subscribe({
          next: (response) => {
            this.imagesData = response.photos.photo;
            this.isPagination = true;
            console.log(this.isPagination)
            this.pageNumber = response.photos.page;
            this.total = response.photos.total;
            console.log(response);
          }
        })
    } else {
      this.isPagination = !this.isPagination;
    }
    
  }

  public addToFavorites(image: IImage) {
    this.searchService.addImageToFavorite(image)
      .subscribe({
        next: () => {
          alert('Ваша фотография добавлена в любимые');
        }
      })
  }

}