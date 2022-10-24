import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UnsplashApiService } from 'src/app/api/unsplash-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  searchText = new FormControl('');
  @Output() searchEvent: EventEmitter<string>;
  @Output() cancelEvent: EventEmitter<boolean>;

  constructor(private unsplashApiService: UnsplashApiService) {
    this.searchEvent = new EventEmitter<string>();
    this.cancelEvent = new EventEmitter<boolean>();
  }

  search() : void {
    this.searchEvent.emit(this.searchText.value!);
  }

  cancelSearch() : void {
    this.searchText.reset();
    this.cancelEvent.emit(true);
  }
 }
