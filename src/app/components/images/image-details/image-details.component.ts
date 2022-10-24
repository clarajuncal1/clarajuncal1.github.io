import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UnsplashApiService } from 'src/app/api/unsplash-api.service';
import { ImageStatistics } from 'src/app/models/image-statistics';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss']
})
export class ImageDetailsComponent implements OnInit {
  downloads: number = 0;
  views: number = 0;
  likes: number = 0;
  panelOpenState: boolean = false;

  data: any;

  subscription$ = new Subscription();

  constructor(private unsplashApiService: UnsplashApiService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.subscription$.add(
      this.unsplashApiService.getPhotoStatistics(id ?? '').subscribe(
        (statistics: ImageStatistics) => {
          this.downloads = statistics.downloads.total;
          this.views = statistics.views.total;
          this.likes = statistics.likes.total;
        }
      )
    )
    this.subscription$.add(
      this.unsplashApiService.getPhotoById(id ?? '').subscribe(
        image => {
          this.data = image;
        }
      )
    )
  }

  togglePanel(): void {
      this.panelOpenState = !this.panelOpenState
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}
