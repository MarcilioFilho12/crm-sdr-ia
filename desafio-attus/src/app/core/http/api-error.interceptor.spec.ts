import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { apiErrorInterceptor } from './api-error.interceptor';

describe('apiErrorInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([apiErrorInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should map Http error to Error', (done) => {
    http.get('/test').subscribe({
      next: () => fail('expected error'),
      error: (err: Error) => {
        expect(err.message).toContain('fail');
        done();
      },
    });

    const req = httpMock.expectOne('/test');
    req.flush({ message: 'fail' }, { status: 500, statusText: 'Server' });
  });
});
