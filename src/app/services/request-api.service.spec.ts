import { TestBed } from '@angular/core/testing';

import { RequestApiService } from './request-api.service';
import { HttpClientModule } from '@angular/common/http';

describe('RequestApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: RequestApiService = TestBed.get(RequestApiService);
    expect(service).toBeTruthy();
  });
});
