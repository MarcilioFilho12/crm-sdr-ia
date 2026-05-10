import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { UsersListPageComponent } from './users-list.page';

describe('UsersListPageComponent', () => {
  let fixture: ComponentFixture<UsersListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersListPageComponent, NoopAnimationsModule],
      providers: [
        {
          provide: MatDialog,
          useValue: {
            open: () => ({
              afterClosed: () => of(undefined),
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersListPageComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.componentInstance.termo.value).toBe('');
  });
});
