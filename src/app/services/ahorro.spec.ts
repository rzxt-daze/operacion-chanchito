import { TestBed } from '@angular/core/testing';
import { Ahorro } from './ahorro';

describe('Ahorro', () => {
  let service: Ahorro;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ahorro);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
