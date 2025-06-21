import React from 'react';
import { WeatherForecastResponse } from '../../../types/weather.types';

interface FooterProps {
  weatherData: WeatherForecastResponse;
}

const Footer: React.FC<FooterProps> = ({ weatherData }) => {
  const maxTemp = Math.max(...weatherData.dailyForecasts.map(day => day.maxTemperature));
  const minTemp = Math.min(...weatherData.dailyForecasts.map(day => day.minTemperature));
  const averagePressure = weatherData.averagePressure;
  
  // Obliczanie średniej energii słonecznej
  const averageSolarEnergy = weatherData.dailyForecasts.reduce(
    (acc, day) => acc + day.solarEnergy, 
    0
  ) / weatherData.dailyForecasts.length;

  const summaryCards = [
    {
      title: 'Skrajne temperatury',
      value: `${maxTemp.toFixed(1)}°C`,
      subtitle: `Min: ${minTemp.toFixed(1)}°C`,
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-900 dark:text-blue-100'
    },
    {
      title: 'Średnie ciśnienie',
      value: `${averagePressure.toFixed(0)} hPa`,
      subtitle: 'atmosferyczne',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-900 dark:text-green-100'
    },
    {
      title: 'Średnia energia słoneczna',
      value: `${averageSolarEnergy.toFixed(1)} kWh`,
      subtitle: 'dziennie',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      textColor: 'text-yellow-900 dark:text-yellow-100'
    },
    {
      title: 'Prognoza',
      value: weatherData.weatherSummary,
      subtitle: 'na najbliższe dni',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-900 dark:text-purple-100'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mt-8 transition-colors">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Podsumowanie prognozy
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg transition-colors ${card.bgColor}`}
          >
            <div className={`text-lg font-medium mb-2 ${card.textColor}`}>
              {card.title}
            </div>
            <div className={`text-2xl font-bold ${card.textColor} ${index === 3 ? 'text-base' : ''}`}>
              {card.value}
            </div>
            <div className={`text-sm opacity-75 ${card.textColor}`}>
              {card.subtitle}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;