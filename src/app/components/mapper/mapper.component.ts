import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { GoogleMap, MapAdvancedMarker } from '@angular/google-maps';
import { MapperConfig } from '../../../assets/mapper-config';
import { CommonModule } from '@angular/common';
import { MapUtils } from '../../utils/map-utils';

@Component({
  selector: 'app-mapper',
  standalone: true,
  imports: [GoogleMap, MapAdvancedMarker, CommonModule],
  templateUrl: './mapper.component.html',
  styleUrl: './mapper.component.scss'
})
export class MapperComponent {
  @Input() markerDetailsList: any;

  // define angular google component using @ViewChild decorator 
  @ViewChild(GoogleMap) googleMap: GoogleMap | undefined;
  bounds: any;
  markerList: any = [];
  mapOptions: google.maps.MapOptions = {};
  mapperConfig = MapperConfig;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if(this.markerDetailsList && changes.hasOwnProperty('markerDetailsList')) {
      this.mapOptions = this.mapperConfig.onLoadMapOptions;
      this.buildMarkerList(this.markerDetailsList.data);  
    }
  }

  mapInitialized(evt: any) {
    if(this.markerList.length && this.mapperConfig.fitMapToMarkers) {
      this.bounds = MapUtils.getBounds(this.markerList);
      this.googleMap?.fitBounds(this.bounds, {top:95,right:30,left:30});  
    }
  }

  toggleHighlight(markerView: any) {
    if (markerView.content.classList.contains("highlight")) {
      markerView.content.classList.remove("highlight");
      markerView.zIndex = null;
    } else {
      markerView.content.classList.add("highlight");
      markerView.zIndex = 1;
    }
  }

  private buildMarkerList(markerDetailsList: any[]) {
    this.markerList = markerDetailsList.map(item => {
      return ({
        id: item.id,
        position: item.position,
        title: item.description,
        content: this.buildMarkerContent(item)
      })
    });
  }

  private buildMarkerContent(markerDetails: any) {
    const content = document.createElement("div");
    content.classList.add("property");
    content.innerHTML = `
      <div class="icon">
          <i aria-hidden="true" class="fa fa-icon fa-${markerDetails.type}" title="${markerDetails.type}"></i>
          <span class="fa-sr-only">${markerDetails.type}</span>
      </div>
      <div class="details">
          <div class="price">${markerDetails.price}</div>
          <div class="address">${markerDetails.address}</div>
          <div class="features">
          <div>
              <i aria-hidden="true" class="fa fa-bed fa-lg bed" title="bedroom"></i>
              <span class="fa-sr-only">bedroom</span>
              <span>${markerDetails.bed}</span>
          </div>
          <div>
              <i aria-hidden="true" class="fa fa-bath fa-lg bath" title="bathroom"></i>
              <span class="fa-sr-only">bathroom</span>
              <span>${markerDetails.bath}</span>
          </div>
          <div>
              <i aria-hidden="true" class="fa fa-ruler fa-lg size" title="size"></i>
              <span class="fa-sr-only">size</span>
              <span>${markerDetails.size} ft<sup>2</sup></span>
          </div>
          </div>
      </div>
      `;
    return content;
  }
}
