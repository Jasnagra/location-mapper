import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { mapperConfig } from "../../assets/mapper-config";

@Injectable({ providedIn: 'root' })
export class MarkerService {

    constructor(private httpClient: HttpClient) { }

    getMarkerDetailsList() {
        return this.httpClient.get(mapperConfig.markerDetailsListUrl);
    }
}