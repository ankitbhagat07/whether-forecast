import fetch from 'node-fetch';

export async function handler(event) {
  const { entryText, units } = JSON.parse(event.body);
  const apiKey = process.env.WEATHER_API_KEY;

  const isZip = /^\d+$/.test(entryText);
  const flag = isZip ? "zip" : "q";
  const url = `https://api.openweathermap.org/data/2.5/weather?${flag}=${entryText}&units=${units}&appid=${apiKey}`;
  const encodedUrl = encodeURI(url);

  try {
    const response = await fetch(encodedUrl);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}