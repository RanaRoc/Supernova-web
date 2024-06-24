import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: { key: string, data: User }[] = [];
  confirmedUsers: { key: string, data: User }[] = [];
  selectedUser: { key: string, data: User } | null = null;

  constructor( private userService : UserService, private router: Router) { }

  async ngOnInit(): Promise<void> {
this.updateConfirmedUsers();

  }

  goBack() {
    this.router.navigate(['/login']);
  }
  selectUser(user: { key: string, data: User }): void {
    this.selectedUser = user;
  }
  updateConfirmedUsers() {
    this.userService.getAllU().subscribe(
      (data) => this.users = data,

      (error) => console.error(error)
    );
    this.userService.getAllC().subscribe(
      (data) => this.confirmedUsers = data,

      (error) => console.error(error)
    );
  }
  async removeUser(): Promise<void> {
    if (this.selectedUser) {
      try {
        await this.userService.removeUser(this.selectedUser.key);
        this.users = this.users.filter(u => u.key !== this.selectedUser?.key);
        this.selectedUser = null;
      } catch (error) {
        console.error('Error removing user:', error);
      }
    }
    this.updateConfirmedUsers();
  }

  async confirmUser(): Promise<void> {
    if (this.selectedUser) {
      try {
        await this.userService.confirmUser(this.selectedUser.key);
        const userIndex = this.users.findIndex(u => u.key === this.selectedUser?.key);
        if (userIndex > -1) {

          this.users[userIndex].data.Confirmed = true;

        }

        this.selectedUser = null;
      } catch (error) {
        console.error('Error confirming user:', error);
      }
    }
    this.updateConfirmedUsers();
  }

  async unConfirmUser(): Promise<void> {
    if (this.selectedUser) {
      try {
        await this.userService.unconfirmUser(this.selectedUser.key);
        const userIndex = this.users.findIndex(u => u.key === this.selectedUser?.key);
        if (userIndex > -1) {

          this.users[userIndex].data.Confirmed = false;

        }

        this.selectedUser = null;
      } catch (error) {
        console.error('Error confirming user:', error);
      }
    }
    this.updateConfirmedUsers();
  }

}
