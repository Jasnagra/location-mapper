import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class MarkerService {

    constructor(private httpClient: HttpClient) { }

    getMarkerDetailsList() {
        return this.httpClient.get('assets/marker-details-list.json');
    }
}