import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MarkerService } from './services/marker-service';
import { MapperComponent } from './components/mapper/mapper.component';
import { MarkerDetailsComponent } from './components/marker-details/marker-details.component';
import { CommonModule } from '@angular/common';
import { GoogleMap, MapAdvancedMarker } from '@angular/google-maps';

describe('AppComponent', () => {
  let mockMarkerService = jasmine.createSpyObj('MarkerService', ['getMarkerDetailsList']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, MapperComponent, MarkerDetailsComponent, CommonModule, GoogleMap, MapAdvancedMarker],
      providers: [ { provide: MarkerService, useValue: mockMarkerService } ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call the MarkerService service on init', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges(); 
    expect(mockMarkerService.getMarkerDetailsList).toHaveBeenCalled();
  });

  it('should set selectedMarkerId value', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.selectedMarkerId = '1234';
    expect(app['_selectedMarkerId']).toBe('1234');
  });

  it('should get selectedMarkerId value', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.selectedMarkerId = '4321';
    expect(app.selectedMarkerId).toBe('4321');
  });
});
