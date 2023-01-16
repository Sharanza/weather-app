import { Paper, TextInput, Button, Text, Group } from "@mantine/core";
import { useState } from 'react';

const API_KEY = '3db70ceb3f7893404ff3c84127466fa5';

export default function Home() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<any>({});

  async function getWeatherData() {
    console.log(city);
    try {
      const serverResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      const data = await serverResponse.json();
      console.log(data);
      if (data?.cod === '404') throw data;
      setWeatherData(data);
    } catch (error) {      
      console.log(error);
    }
  }

  return (
    <div
      style={{
        position: 'static',
        height: '100vh',
        backgroundImage: 'url(/persona-weather.jpg)',
        backgroundSize: 'cover',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
      <Paper withBorder p='lg' style={{maxWidth: '500px'}}>
        <Group position='apart'>
          <Text size='xl' weight={500}>
            Get The Weather!
          </Text>
        </Group>
        <Group position='apart'>
          <Text size='lg'>
            Enter a city, and get the weather below!
          </Text>
        </Group>
        <Group position='apart' mb='xs'>
          <TextInput
          label='City Name'
          placeholder='Enter a city e.g. London'
          onChange={(e) => setCity(e.target.value)}
          />
        </Group>
        <Group position='apart'>
          <Button size='md' variant='gradient' onClick={() => getWeatherData()}>
            Get Weather
          </Button>
        </Group>
        {weatherData?.main && (
          <>
          <Group position='left' mt='xs'>
              <Text size='xl' weight={500}>
                {weatherData?.name}
              </Text>
            </Group>
            <Group position='left'>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@4x.png`}
                width={100}
                height={100} 
              />
              <Text size='xl' weight={500}>
                Temperature: {Math.round(weatherData?.main?.temp - 273.15)}°C
                <Text size='md' weight={500}>
                  Wind speed: {weatherData?.wind?.speed} m/s
                  Wind degree: {weatherData?.wind?.deg}°
                </Text>
              </Text>
            </Group>
          </>
        )}
      </Paper>
      </div>
    </div>
  )
}
