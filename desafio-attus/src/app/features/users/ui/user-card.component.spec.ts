import { ComponentFixture, TestBed } from '@angular/core/testing';
import { USUARIOS_MOCK_INICIAL } from '../data-access/usuarios.mock';
import { UserCardComponent } from './user-card.component';

describe('UserCardComponent', () => {
  let fixture: ComponentFixture<UserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    fixture.componentRef.setInput('usuario', USUARIOS_MOCK_INICIAL[0]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should emit editar when clicking button', () => {
    const cmp = fixture.componentInstance;
    spyOn(cmp.editar, 'emit');
    const btn = fixture.nativeElement.querySelector('button');
    btn.click();
    expect(cmp.editar.emit).toHaveBeenCalledWith(USUARIOS_MOCK_INICIAL[0]);
  });
});
