const WEATHER_API_KEY = '2e81a6e587002fb0038b30d2257a9640';

export const setLocationObject = (locationObj, coordsObj) => {
  const { lat, lon, name, unit } = coordsObj;
  locationObj.setLat(lat);
  locationObj.setLon(lon);
  locationObj.setName(name);
  if (unit) {
    locationObj.setUnit(unit);
  }
};

export const getHomeLocation = () => {
  return localStorage.getItem("defaultWeatherLocation");
};

export const getWeatherFromCoords = async (locationObj) => {
  const lat = locationObj.getLat();
  const lon = locationObj.getLon();
  const units = locationObj.getUnit();

  try {
    const response = await fetch("/.netlify/functions/get_weather", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ lat, lon, units })
    });

    if (!response.ok) throw new Error("Weather fetch failed");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Serverless error:", err);
  }
};

export const getCoordsFromApi = async (entryText, units) => {
  try {
    const response = await fetch("/.netlify/functions/get_coords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ entryText, units })
    });

    if (!response.ok) throw new Error("Location fetch failed");
    const jsonData = await response.json();
    return jsonData;
  } catch (err) {
    console.error("Serverless error:", err.stack);
  }
};

export const cleanText = (text) => {
  const regex = / {2,}/g;
  const entryText = text.replaceAll(regex, " ").trim();
  return entryText;
};