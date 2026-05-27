export async function getCoordinates(placeName, cityName = "") {
  const searchQuery = encodeURIComponent(`${placeName}${cityName ? ', ' + cityName : ''}`);
  const url = `https://nominatim.openstreetmap.org/search?q=${searchQuery}&format=json&limit=1`;

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'TourEase-OpenSource-Map-Feature' }
    });
    const data = await response.json();
    if (data && data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
    return null; 
  } catch (error) {
    console.error(`Lookup mismatch for ${placeName}:`, error);
    return null;
  }
}