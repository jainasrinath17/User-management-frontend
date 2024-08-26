import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    users: User[] = [];
  displayedColumns: string[] = ['user_name', 'first_name', 'last_name', 'email', 'user_status', 'department', 'actions'];

  constructor(
    private userService: UserService,
    public router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  onEdit(userId: number): void {
    console.log("Inside EDIT", userId);
    this.router.navigate(['/users/edit', userId]);
  }

  onDelete(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.snackBar.open('User deleted successfully', 'Close', { duration: 3000 });
        this.loadUsers();
      }, error => {
        this.snackBar.open('Error deleting user', 'Close', { duration: 3000 });
      });
    }
  }
}
