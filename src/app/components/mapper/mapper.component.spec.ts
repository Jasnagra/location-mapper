import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapperComponent } from './mapper.component';
import { SimpleChange } from '@angular/core';
import { MapUtils } from '../../utils/map-utils';

describe('MapperComponent', () => {
  let component: MapperComponent;
  let fixture: ComponentFixture<MapperComponent>;
  const mockMarkerView = {
    content: { classList: {
      contains: () => {},
      remove: () =>  [],
      add: () => {}
    }},
    zIndex: 1
  };
  const mockMarkerDetailsObj = {
    id: '123',
    position: { lat: 53.222, lng: 0.223 },
    description: 'some description',
    type: 'building',
    price: '53432',
    address: 'some address',
    bed: '4',
    bath: '2',
    size: '2000 sq ft'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build marker list when Input returns markers', () => {
    const spy = spyOn<any>(component, 'buildMarkerList');
    component.markerDetailsList = [];
    component.ngOnChanges({
      markerDetailsList: new SimpleChange(null, { someKey: '123' }, false)
    });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should add highlight class to marker', () => {
    spyOn<any>(mockMarkerView.content.classList, 'contains').and.returnValue(false);
    const spy2 = spyOn<any>(mockMarkerView.content.classList, 'add');
    component.toggleHighlight(mockMarkerView);
    expect(spy2).toHaveBeenCalledWith('highlight');
    expect(mockMarkerView.zIndex).toBe(1);
  });

  it('should remove highlight class from marker', () => {
    spyOn<any>(mockMarkerView.content.classList, 'contains').and.returnValue(true);
    const spy2 = spyOn<any>(mockMarkerView.content.classList, 'remove');
    component.toggleHighlight(mockMarkerView);
    expect(spy2).toHaveBeenCalledWith('highlight');
    expect(mockMarkerView.zIndex).toBeNull();
  });

  it('should create marker list for Map', () => {
    component.markerList = [];
    component['buildMarkerList']([mockMarkerDetailsObj]);
    expect(component.markerList.length).toBe(1);
  });

  it('should should fit map around markers', () => {
    const spy = spyOn(MapUtils, 'getBounds');
    component.markerList = [{ item: 1}];
    component.mapperConfig.fitMapToMarkers = true;
    component.mapInitialized({someEvent: true});
    expect(spy).toHaveBeenCalled();
  });
});
