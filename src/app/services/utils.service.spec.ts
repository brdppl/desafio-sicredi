import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';
import { MaterialModule } from '../material.module';

describe('UtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      MaterialModule
    ]
  }));

  it('should be created', () => {
    const service: UtilsService = TestBed.get(UtilsService);
    expect(service).toBeTruthy();
  });
});
