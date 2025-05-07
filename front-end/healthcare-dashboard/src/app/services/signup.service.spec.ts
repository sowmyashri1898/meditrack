import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SignupService } from './signup.service';  // Import the service you're testing

describe('SignupService', () => {
  let service: SignupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    // Set up the TestBed module
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Import testing module for HTTP requests
      providers: [SignupService],          // Provide the service to test
    });

    // Create instances of the service and mock HTTP controller
    service = TestBed.inject(SignupService);
    httpMock = TestBed.inject(HttpTestingController);

    // Mock localStorage methods for the test
    spyOn(localStorage, 'getItem').and.returnValue('someToken');  // Mocking token return value
    spyOn(localStorage, 'setItem').and.callFake(() => {});         // Mocking the setItem method (no-op)
  });

  it('should save the token in localStorage after login', () => {
    const credentials = { email: 'test@test.com', password: 'password' };

    service.login(credentials).subscribe((response) => {
      expect(localStorage.setItem).toHaveBeenCalledWith('authToken', 'someToken');
      expect(localStorage.setItem).toHaveBeenCalledWith('isLoggedIn', 'true');
    });
    const req = httpMock.expectOne(`${service.apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    req.flush({ token: 'someToken', role: 'USER' });  // Mock the response from the API
  });

  afterEach(() => {
    // Verify no outstanding HTTP requests after each test
    httpMock.verify();
  });
});
