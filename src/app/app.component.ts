import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapperComponent } from './components/mapper/mapper.component';
import { MarkerDetailsComponent } from './components/marker-details/marker-details.component';
import { MarkerService } from './services/marker-service';

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

  constructor(private markerService: MarkerService) {}

  ngOnInit() {
    this._markerDetailsList = this.markerService.getMarkerDetailsList();
  }
  
  public get selectedMarkerId(): string {
    return this._selectedMarkerId;
  }
  public set selectedMarkerId(value: string) {
    this._selectedMarkerId = value;
  }
}
