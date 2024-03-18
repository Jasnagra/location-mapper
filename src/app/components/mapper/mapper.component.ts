import { Component, Input, SimpleChanges, input } from '@angular/core';
import { GoogleMap, MapAdvancedMarker } from '@angular/google-maps';

@Component({
  selector: 'app-mapper',
  standalone: true,
  imports: [GoogleMap, MapAdvancedMarker],
  templateUrl: './mapper.component.html',
  styleUrl: './mapper.component.scss'
})
export class MapperComponent {
  @Input() markerDetailsList: any;

  markerList: any = [];
  mapOptions: google.maps.MapOptions = {
    mapId: '5b9d1aba6a424115',
    center: { lat: 53.486, lng: -2.229 },
    zoom: 5
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.markerDetailsList && changes.hasOwnProperty('markerDetailsList')) {
      this.buildMarkerList(this.markerDetailsList.data);
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

  private buildMarkerContent(property: any) {
    const content = document.createElement("div");
    content.classList.add("property");
    content.innerHTML = `
      <div class="icon">
          <i aria-hidden="true" class="fa fa-icon fa-${property.type}" title="${property.type}"></i>
          <span class="fa-sr-only">${property.type}</span>
      </div>
      <div class="details">
          <div class="price">${property.price}</div>
          <div class="address">${property.address}</div>
          <div class="features">
          <div>
              <i aria-hidden="true" class="fa fa-bed fa-lg bed" title="bedroom"></i>
              <span class="fa-sr-only">bedroom</span>
              <span>${property.bed}</span>
          </div>
          <div>
              <i aria-hidden="true" class="fa fa-bath fa-lg bath" title="bathroom"></i>
              <span class="fa-sr-only">bathroom</span>
              <span>${property.bath}</span>
          </div>
          <div>
              <i aria-hidden="true" class="fa fa-ruler fa-lg size" title="size"></i>
              <span class="fa-sr-only">size</span>
              <span>${property.size} ft<sup>2</sup></span>
          </div>
          </div>
      </div>
      `;
    return content;
  }
}
