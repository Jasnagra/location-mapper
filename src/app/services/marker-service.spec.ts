import { TestBed } from "@angular/core/testing";
import { MarkerService } from "./marker-service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Straight Jasmine testing without Angular's testing support
describe('MarkerService', () => {
  let service: MarkerService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MarkerService]
    });

    service = TestBed.inject(MarkerService);
    httpController = TestBed.inject(HttpTestingController);
  });
    
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpController.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should make GET call to json file',(done: DoneFn) => {
    // expect(service.getMarkerDetailsList()).toBe('real value');
    service.getMarkerDetailsList().subscribe(res => {
      done()
    });
    const req = httpController.expectOne('assets/marker-details-list.json');
    expect(req.request.method).toEqual('GET');
    req.flush({});
  });
});

