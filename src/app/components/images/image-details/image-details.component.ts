import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { map, Subscription } from 'rxjs';
import { UnsplashApiService } from 'src/app/api/unsplash-api.service';
import { ImageStatistics } from 'src/app/models/image-statistics';
import { images } from 'src/app/models/images';

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

  subscription$ = new Subscription();

  constructor(@Inject(MAT_DIALOG_DATA) public data: images,
              public dialogRef: MatDialogRef<ImageDetailsComponent>,
              private unsplashApiService: UnsplashApiService) { }

  ngOnInit(): void {
    this.subscription$.add(
      this.unsplashApiService.getPhotoStatistics(this.data.id).subscribe(
        (statistics: ImageStatistics) => {
          this.downloads = statistics.downloads.total;
          this.views = statistics.views.total;
          this.likes = statistics.likes.total;
        }
      )
    );
  }

  togglePanel() {
      this.panelOpenState = !this.panelOpenState
  }

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}
