import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})

export class UserEditComponent implements OnInit {
  editForm: FormGroup;
  userId: number | null = null ;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.editForm = this.fb.group({
      user_name: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      user_status: ['', Validators.required],
      department: ['']
    });
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');  
      if (id) {
        this.userId = +id;
        this.userService.getUserById(id).subscribe(data => {
          this.editForm.patchValue({
            user_name: data.user_name,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            department: data.department,
            user_status: data.user_status
          });
        });
      }
    });
  }

  onSubmit(): void {
    if (this.editForm.valid && this.userId !== null) {
      this.userService.updateUser(this.userId, this.editForm.value).subscribe(() => {
        this.snackBar.open('User updated successfully', 'Close', { duration: 3000 });
        this.router.navigate(['/users']);
      }, error => {
        this.snackBar.open('Error updating user: ' + error.error.message, 'Close', { duration: 3000 });
      });
    }
  }
}
