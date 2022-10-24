import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UnsplashApiService } from 'src/app/api/unsplash-api.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  subscription$ = new Subscription();

  constructor(@Inject(MAT_DIALOG_DATA) public user: User,
          public dialogRef: MatDialogRef<UserDetailsComponent>,
          private unsplashApiService: UnsplashApiService) { }

  ngOnInit(): void {
    this.subscription$.add(
      this.unsplashApiService.getUserData(this.user.username).subscribe(data => this.user = data)
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }

}
