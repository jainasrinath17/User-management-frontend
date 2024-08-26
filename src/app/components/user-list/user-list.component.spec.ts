import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { UserListComponent } from './user-list.component';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        MatTableModule
      ],
      providers: [UserService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the list of users on init', () => {
    const users = [
      { id: 1, user_name: 'user1', first_name: 'User', last_name: 'One', email: 'user1@example.com', user_status: 'A', department: 'HR' },
      { id: 2, user_name: 'user2', first_name: 'User', last_name: 'Two', email: 'user2@example.com', user_status: 'I', department: 'Finance' }
    ];
    spyOn(userService, 'getUsers').and.returnValue(of(users));
    component.ngOnInit();
    expect(component.users.length).toEqual(2);
  });

  it('should delete a user when deleteUser is called', () => {
    spyOn(userService, 'deleteUser');
    spyOn(component, 'loadUsers');
    component.onDelete(1);
    expect(userService.deleteUser).toHaveBeenCalledWith(1);
    expect(component.loadUsers).toHaveBeenCalled();
  });
});
