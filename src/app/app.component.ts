import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapperComponent } from './components/mapper/mapper.component';
import { MarkerDetailsComponent } from './components/marker-details/marker-details.component';
import { MarkerService } from './services/marker-service';
import { delay } from 'rxjs';
import { MapperConfig } from '../assets/mapper-config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapperComponent, MarkerDetailsComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private _selectedMarkerId: string = '';
  _markerDetailsList: any;
  mapperConfig = MapperConfig;

  constructor(private markerService: MarkerService) {}

  ngOnInit() {
    this._markerDetailsList = this.markerService.getMarkerDetailsList().pipe(
      delay(2000)
    );
  }
  
  public get selectedMarkerId(): string {
    return this._selectedMarkerId;
  }
  public set selectedMarkerId(value: string) {
    this._selectedMarkerId = value;
  }
}
