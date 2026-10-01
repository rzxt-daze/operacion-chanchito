import { TestBed } from '@angular/core/testing';
import { AuthCodigo } from './auth-codigo';

describe('AuthCodigo', () => {
  let service: AuthCodigo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthCodigo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
