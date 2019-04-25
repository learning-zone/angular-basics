import { TestBed, inject } from '@angular/core/testing';

import { LoginService } from './login.service';
import { ConfigurationService } from './configuration.service';
import { HttpModule } from "@angular/http";

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService, ConfigurationService],
      imports: [HttpModule]
    });
  });

  it('should be created', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));
});
