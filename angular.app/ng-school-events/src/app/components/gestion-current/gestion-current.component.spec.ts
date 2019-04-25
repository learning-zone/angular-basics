import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCurrentComponent } from './gestion-current.component';

import { GestionService } from '../../services/gestion.service';
import { ConfigurationService } from '../../services/configuration.service';
import { HttpModule } from "@angular/http";


describe('GestionCurrentComponent', () => {
  let component: GestionCurrentComponent;
  let fixture: ComponentFixture<GestionCurrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GestionCurrentComponent],
      imports: [HttpModule],
      providers: [GestionService, ConfigurationService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
