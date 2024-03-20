export class MapUtils {
  static getBounds(markers: any){
    let north;
    let south;
    let east;
    let west;
  
    for (const marker of markers){
      north = north !== undefined ? Math.max(north, marker.position.lat) : marker.position.lat;
      south = south !== undefined ? Math.min(south, marker.position.lat) : marker.position.lat;
      east = east !== undefined ? Math.max(east, marker.position.lng) : marker.position.lng;
      west = west !== undefined ? Math.min(west, marker.position.lng) : marker.position.lng;
    };
  
    const bounds = { north, south, east, west };
    return bounds;
  }
}