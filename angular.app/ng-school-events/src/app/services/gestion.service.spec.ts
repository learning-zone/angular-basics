import { TestBed, inject } from '@angular/core/testing';

import { GestionService } from './gestion.service';
import { ConfigurationService } from './configuration.service';
import { HttpModule } from "@angular/http";

describe('GestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GestionService, ConfigurationService],
      imports: [HttpModule]
    });
  });

  it('should be created', inject([GestionService], (service: GestionService) => {
    expect(service).toBeTruthy();
  }));
});
