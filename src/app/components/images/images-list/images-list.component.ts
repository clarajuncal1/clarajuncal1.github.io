import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UnsplashApiService } from 'src/app/api/unsplash-api.service';
import { images } from 'src/app/models/images';
import { MatDialog } from '@angular/material/dialog';
import { ImageDetailsComponent } from 'src/app/components/images/image-details/image-details.component';
import { User } from 'src/app/models/user';
import { UserDetailsComponent } from 'src/app/components/user-details/user-details.component';


@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.scss']
})
export class ImagesListComponent implements OnInit {

  imagesList: images[] = [];

  columns: number = 3;
  pageNumber:number = 1;
  pageSize:number = 10;

  query: string = '';
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
    this.subscription$.add(
      this.unsplashApiService.getPhotosByQuery(query, { page: this.pageNumber, per_page: this.pageSize })
      .subscribe(data => 
          data.results.forEach(element => this.imagesList.push(element))
      )
    );
  }

  getImagesWithoutQuery() {
    this.subscription$.add(
      this.unsplashApiService.getPhotosList({ page: 1, per_page: 10 })
      .subscribe(data => 
        data.forEach(element => this.imagesList.push(element))
      )
    )
  }

  public getImages(query?: string) {
    if (this.newQuery) {
      this.imagesList = [];
      this.pageNumber = 1;
    }

    if (query) {
      this.newQuery = false;
      this.getImagesByQuery(query);
    }
    else {
      this.getImagesWithoutQuery();
    }
  }

  public clearSearch(cancel: boolean): void {
    if (cancel) {
      this.newQuery = true;
      this.imagesList = [];
      this.getImages('');
    }
  }

  loadImages() {
    //the if should check if <= total_page number returned in the images collection
    if (!this.newQuery) {
      this.pageNumber++;
      if (this.pageNumber <= 8) {
        this.getImages(this.query);
      } 
    }
  }

  ngOnDistroy(): void {
    this.subscription$.unsubscribe();
  }
}


