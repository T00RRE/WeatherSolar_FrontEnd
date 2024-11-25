const Footer = ({ weatherData }: { weatherData: any }) => {
  const maxTemp = Math.max(...weatherData.dailyForecasts.map((day: any) => day.maxTemperature));
  const minTemp = Math.min(...weatherData.dailyForecasts.map((day: any) => day.minTemperature));
  const averagePressure = weatherData.averagePressure;
  
  // Obliczanie średniego czasu ekspozycji na słońce w godzinach
  const sunExposureHours = weatherData.dailyForecasts.reduce((acc: number, day: any) => {
      // Zakładamy, że mamy dane o wschodzie i zachodzie słońca
      const sunriseTime = new Date(day.sunrise);
      const sunsetTime = new Date(day.sunset);
      const daylight = (sunsetTime.getTime() - sunriseTime.getTime()) / (1000 * 60 * 60); // konwersja na godziny
      return acc + daylight;
  }, 0) / weatherData.dailyForecasts.length;
  const averageDaylightHours = weatherData.dailyForecasts.reduce(
    (acc: number, day: any) => acc + day.daylightHours, 
    0
) / weatherData.dailyForecasts.length;

  return (
      <div className="bg-white p-6 rounded-lg shadow-sm mt-8">
          <h2 className="text-xl font-semibold mb-4">Podsumowanie prognozy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Skrajne temperatury */}
              <div className="p-4 bg-gray-50 rounded-md">
                  <div className="text-lg font-medium mb-2">Skrajne temperatury</div>
                  <div className="text-2xl font-bold">{maxTemp.toFixed(1)}°C</div>
                  <div className="text-gray-600 text-sm">Min: {minTemp.toFixed(1)}°C</div>
              </div>

              {/* Średnie ciśnienie */}
              <div className="p-4 bg-gray-50 rounded-md">
                  <div className="text-lg font-medium mb-2">Średnie ciśnienie</div>
                  <div className="text-2xl font-bold">{averagePressure.toFixed(0)} hPa</div>
              </div>

              {/* Średni czas ekspozycji na słońce */}
              <div className="p-4 bg-gray-50 rounded-md">
                <div className="text-lg font-medium mb-2">Średni czas ekspozycji na słońce</div>
                <div className="text-2xl font-bold">{averageDaylightHours.toFixed(1)} h</div>
                <div className="text-gray-600 text-sm">
                    Średnia produkcja: {weatherData.averageSunExposure.toFixed(1)} kWh
                </div>
            </div>

              {/* Komentarz podsumowujący prognozę */}
              <div className="p-4 bg-gray-50 rounded-md">
                  <div className="text-lg font-medium mb-2">Komentarz</div>
                  <div className="text-lg text-gray-600">{weatherData.weatherSummary}</div>
              </div>
          </div>
      </div>
  );
};

export default Footer;