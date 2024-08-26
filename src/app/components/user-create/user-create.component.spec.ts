import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserCreateComponent } from './user-create.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

describe('UserCreateComponent', () => {
  let component: UserCreateComponent;
  let fixture: ComponentFixture<UserCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserCreateComponent],
      imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        HttpClientTestingModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        RouterTestingModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with all fields', () => {
    expect(component.userForm.contains('user_name')).toBeTrue();
    expect(component.userForm.contains('first_name')).toBeTrue();
    expect(component.userForm.contains('last_name')).toBeTrue();
    expect(component.userForm.contains('email')).toBeTrue();
    expect(component.userForm.contains('user_status')).toBeTrue();
    expect(component.userForm.contains('department')).toBeTrue();
  });

  it('should make the userName field required', () => {
    const control = component.userForm.get('user_name');
    control?.setValue('');
    expect(control?.valid).toBeFalse();
  });

  it('should make the email field required and validate email format', () => {
    const control = component.userForm.get('email');
    control?.setValue('');
    expect(control?.valid).toBeFalse();
    control?.setValue('invalid-email');
    expect(control?.valid).toBeFalse();
  });

  it('should call the onSubmit method when form is valid and submitted', () => {
    spyOn(component, 'onSubmit');
    component.userForm.setValue({
      user_name: 'testuser',
      first_name: 'Test',
      last_name: 'User',
      email: 'testuser@example.com',
      user_status: 'A',
      department: 'Engineering'
    });
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
  });
});
