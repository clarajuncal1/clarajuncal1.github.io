import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UnsplashApiService } from 'src/app/api/unsplash-api.service';
import { images } from 'src/app/models/images';
import { MatDialog } from '@angular/material/dialog';
import { ImageDetailsComponent } from '../image-details/image-details.component';
import { User } from 'src/app/models/user';
import { UserDetailsComponent } from '../../user-details/user-details.component';


@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.scss']
})
export class ImagesListComponent implements OnInit {

  imagesList: images[] = [];
  paginatedList: images[] = [];
  columns = 3;
  pageNumber = 1;
  pageSize = 10;
  query = '';
  totalPages = 10;
  newQuery: boolean = true;

  subscription$ = new Subscription();

  constructor(private unsplashApiService: UnsplashApiService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getImages();
  }

  openImageDetails(imageDetails: images): void {
    this.dialog.open(ImageDetailsComponent, { width: '500px', data: imageDetails });
  }

  openUserDetails(userDetails: User): void {
    this.dialog.open(UserDetailsComponent, { width: '500px', data: userDetails });
  }

  getImagesByQuery(query: string) {
    this.query = query;
    this.unsplashApiService.getPhotosByQuery(query, { page: this.pageNumber, per_page: this.pageSize })
      .subscribe(data => 
          data.results.forEach(element => this.imagesList.push(element))
      );
  }

  getImagesWithoutQuery() {
    this.unsplashApiService.getPhotosList({ page: this.pageNumber, per_page: this.pageSize })
      .subscribe(data => 
        data.forEach(element => this.imagesList.push(element))
      );
  }

  public getImages(query?: string) {
    if (this.newQuery) {
      this.imagesList = [];
    }

    if (query) {
      this.newQuery = false;
      return this.getImagesByQuery(query);
    }
      return this.getImagesWithoutQuery();
  }

  public clearSearch(cancel: boolean): void {
    if (cancel) {
      this.imagesList = [];
      this.getImages('');
    }
  }

  loadImages() {
    this.pageNumber++;
    if (!this.newQuery) {
      if (this.pageNumber <= this.totalPages) {
        this.getImages(this.query);
      }
    }
  }

  ngOnDistroy(): void {
    this.subscription$.unsubscribe();
  }
}


