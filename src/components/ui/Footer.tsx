const Footer = ({ weatherData }: { weatherData: any }) => {
  const maxTemp = Math.max(...weatherData.dailyForecasts.map((day: any) => day.maxTemperature));
  const minTemp = Math.min(...weatherData.dailyForecasts.map((day: any) => day.minTemperature));
  const averagePressure = weatherData.averagePressure;
  
  // Obliczanie średniej energii słonecznej
  const averageSolarEnergy = weatherData.dailyForecasts.reduce(
    (acc: number, day: any) => acc + day.solarEnergy, 
    0
  ) / weatherData.dailyForecasts.length;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mt-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Podsumowanie prognozy</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
          <div className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Skrajne temperatury</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{maxTemp.toFixed(1)}°C</div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">Min: {minTemp.toFixed(1)}°C</div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
          <div className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Średnie ciśnienie</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{averagePressure.toFixed(0)} hPa</div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
          <div className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Średnia energia słoneczna</div>
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-500">
            {averageSolarEnergy.toFixed(1)} kWh
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            dziennie
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
          <div className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Komentarz</div>
          <div className="text-lg text-gray-600 dark:text-gray-400">{weatherData.weatherSummary}</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;