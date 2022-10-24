import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounce, debounceTime, distinctUntilChanged, filter, tap } from 'rxjs';
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
    console.log(this.searchText.value);
    this.searchEvent.emit(this.searchText.value!);
  }

  cancelSearch() : void {
    this.searchText.reset();
    this.cancelEvent.emit(true);
  }
 }
