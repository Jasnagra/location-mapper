import { MapUtils } from "./map-utils";

// Straight Jasmine testing without Angular's testing support
describe('MapUtils', () => {
 const mapUtils = new MapUtils();

 const mockMarkers = [
  { position: { lat: 53.99, lng: 0.234 } },
  { position: { lat: 53.99, lng: 0.234 } },
  { position: { lat: 53.99, lng: 0.234 } }
 ]

  it('should be created', () => {
    expect(mapUtils).toBeTruthy();
  });

  it('should be created', () => {
    const bounds = MapUtils.getBounds(mockMarkers);
    expect(bounds).toEqual({ north: 53.99, south: 53.99, east: 0.234, west: 0.234});
  });
});

