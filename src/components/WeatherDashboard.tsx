import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudDrizzle, 
  CloudLightning, 
  CloudFog, 
  CloudHail, 
  Cloudy, 
  Compass
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchWeatherData } from '../services/weatherService';
import Footer from './ui/Footer';
import LocationMap from './LocationMap';
import ThemeToggle from './ThemeToggle';

const getWeatherIcon = (weatherCode: number) => {
  switch (true) {
    case weatherCode === 0:
      return { 
        icon: Sun, 
        color: 'text-yellow-500'
      };
    case weatherCode <= 3:
      return { 
        icon: Cloudy, 
        color: 'text-gray-400'
      };
    case weatherCode <= 48:
      return { 
        icon: CloudFog, 
        color: 'text-gray-400'
      };
    case weatherCode <= 55:
      return { 
        icon: CloudDrizzle, 
        color: 'text-blue-400'
      };
    case weatherCode <= 65:
      return { 
        icon: CloudRain, 
        color: 'text-blue-500'
      };
    case weatherCode <= 77:
      return { 
        icon: CloudSnow, 
        color: 'text-blue-300'
      };
    case weatherCode <= 82:
      return { 
        icon: CloudRain, 
        color: 'text-blue-600'
      };
    case weatherCode <= 86:
      return { 
        icon: CloudSnow, 
        color: 'text-blue-400'
      };
    case weatherCode === 95:
      return { 
        icon: CloudLightning, 
        color: 'text-yellow-600'
      };
    case weatherCode >= 96:
      return { 
        icon: CloudHail, 
        color: 'text-gray-600'
      };
    default:
      return { 
        icon: Cloud, 
        color: 'text-gray-400'
      };
  }
};

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState({
    lat: 52.237049,
    lng: 21.017532
  });
  
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  useEffect(() => {
    // Próbuj pobrać lokalizację przy pierwszym załadowaniu
    getCurrentLocation();
  }, []); // pusty array oznacza, że efekt wykona się tylko raz przy montowaniu komponentu
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchWeatherData(location.lat, location.lng);
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
  }, [location]); // Dodano location do dependencies

  const handleLocationSelect = (lat: number, lng: number) => {
    setLocation({ lat, lng });
  };

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Prognoza pogody</h1>
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-gray-600 dark:text-gray-400">
              Współrzędne: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </p>
            <button
              onClick={getCurrentLocation}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
            >
              <Compass size={20} />
              Pobierz moją lokalizację
            </button>
          </div>
        </header>

        {/* Map Component */}
        <div className="mb-8">
          <LocationMap 
            onLocationSelect={handleLocationSelect}
            initialPosition={[location.lat, location.lng]}
          />
        </div>

        {/* Daily Forecast */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Prognoza 7-dniowa</h2>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {weatherData.dailyForecasts.map((day: any) => {
              const { icon: WeatherIcon, color } = getWeatherIcon(day.weatherCode);
              
              return (
                <div 
                  key={day.date} 
                  className="text-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  <div className="text-gray-600 dark:text-gray-400 mb-2">
                    {new Date(day.date).toLocaleDateString('pl-PL', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </div>
                  <WeatherIcon className={`h-8 w-8 mx-auto ${color} mb-2`} />
                  <div className="font-medium text-gray-900 dark:text-white">
                    {day.maxTemperature.toFixed(1)}°C
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">
                    {day.minTemperature.toFixed(1)}°C
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                    <div className="text-yellow-600 dark:text-yellow-500 font-medium">
                      {day.solarEnergy.toFixed(1)} kWh
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      energia słoneczna
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer z takim samym stylem dark mode */}
        <Footer weatherData={weatherData} />
      </div>
    </div>
  );
};
export default WeatherDashboard;