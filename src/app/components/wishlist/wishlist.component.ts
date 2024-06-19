import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: any[] = [];
  user: any;

  constructor(private router: Router, private userService : UserService) {}

  ngOnInit(): void {
    this.userService.userData$.subscribe(userData => {
      this.user = userData;
      console.log(this.user);
    });
    }

}
