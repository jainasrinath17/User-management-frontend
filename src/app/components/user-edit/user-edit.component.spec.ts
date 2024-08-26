import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { UserEditComponent } from './user-edit.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { UserService } from '../../services/user.service';

describe('UserEditComponent', () => {
  let editComponent: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;
  let userService: UserService;
  let snackBar: MatSnackBarModule;
  const user = {
    id: 1,
    user_name: 'testuser',
    first_name: 'Test',
    last_name: 'User',
    email: 'testuser@example.com',
    user_status: 'A',
    department: 'Engineering'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserEditComponent],
      imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        HttpClientTestingModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatSelectModule,
        MatFormFieldModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => '1' })  // a simulated parameter (id: 1)
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditComponent);
    editComponent = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(editComponent).toBeTruthy();
  });

  it('should load user data on init', () => {
    spyOn(userService, 'getUserById').and.returnValue(of(user));
    editComponent.ngOnInit();
    expect(editComponent.editForm.value.user_name).toEqual('testuser');
  });

  it('should call the updateUser method when form is valid and submitted', () => {
    spyOn(userService, 'updateUser').and.returnValue(of(user));
    editComponent.editForm.setValue({
      user_name: 'testuser',
      first_name: 'Test',
      last_name: 'User',
      email: 'testuser@example.com',
      user_status: 'A',
      department: 'Engineering'
    });
    editComponent.onSubmit;
  });
});
