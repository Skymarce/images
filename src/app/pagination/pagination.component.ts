import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IImage, IImages } from '../models/images';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Output() pageEvent = new EventEmitter<number>();
  @Input() pageNumber: number;
  @Input() total: number;
  @ViewChild('pageInput') pageInput: ElementRef;
  
  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
  }

  public checkPage(): boolean {
    return this.pageNumber <= 1 ? true : false;
  }

  public goToPrevPage() {
    this.pageNumber = --this.pageInput.nativeElement.value;
    this.pageEvent.emit(this.pageInput.nativeElement.value);
  }

  public goToNextPage() {
    this.pageNumber = ++this.pageInput.nativeElement.value;
    this.pageEvent.emit(this.pageInput.nativeElement.value);
  }

  public changePage() {
    this.pageNumber = this.pageInput.nativeElement.value;
    this.pageEvent.emit(this.pageInput.nativeElement.value);
  }

}
