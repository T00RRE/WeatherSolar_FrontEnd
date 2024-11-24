import { Sun, Cloud, Thermometer, Wind, Droplets } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchWeatherData } from '../services/weatherService';
import Footer from './ui/Footer';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchWeatherData(52.237049, 21.017532); // Warszawa
        setWeatherData(data);
        setError(null);
      } catch (err) {
        setError('Nie udało się pobrać danych pogodowych');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Spróbuj ponownie
          </button>
        </div>
      </div>
    );
  }

  if (!weatherData) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Prognoza pogody</h1>
          <p className="text-gray-600">Warszawa, Polska</p>
        </header>

        {/* Daily Forecast */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Prognoza 7-dniowa</h2>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {weatherData.dailyForecasts.map((day: any, i: number) => (
              <div 
                key={day.date} 
                className="text-center p-4 hover:bg-gray-50 rounded-md transition-colors"
              >
                {/* Display date in day-month-year format */}
                <div className="text-gray-600 mb-2">
                  {new Date(day.date).toLocaleDateString('pl-PL', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </div>
                <Cloud className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <div className="font-medium">{day.maxTemperature.toFixed(1)}°C</div>
                <div className="text-gray-500 text-sm">{day.minTemperature.toFixed(1)}°C</div>
              </div>
            ))}
          </div>
        </div>

        <Footer weatherData={weatherData} />
      </div>
    </div>
  );
};

export default WeatherDashboard;
