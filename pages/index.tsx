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
    } catch (err) { 
      console.log(err);
      return alert('City not found');
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
      <Paper withBorder radius='lg' p='xl' style={{maxWidth: '500px'}}>
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
          icon={<img src='https://img.icons8.com/ios/50/000000/search--v1.png' width={20} height={20} />}
          alt='Search Icon'
          placeholder='Enter a city e.g. London'
          onChange={(e) => setCity(e.target.value)}
          />
        </Group>
        <Group position='apart'>
          <Button size='md' variant='gradient' gradient={{ from: 'teal', to: 'blue' }} onClick={() => getWeatherData()}>
            Get Weather
          </Button>
          <Button size='md' variant='gradient' gradient={{ from: 'teal', to: 'blue' }} onClick={() => window.location.reload()}>
            Reset Search
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
                alt='Weather Icon'
                width={100}
                height={100} 
              />
              <Text size='xl' weight={500}>
                Temperature: {Math.round(weatherData?.main?.temp - 273.15)}°C
                <Text size='md' weight={500}>
                Wind Speed: {weatherData?.wind?.speed} m/s
                <img
                src={`https://img.icons8.com/ios/50/000000/wind.png`}
                alt='Wind Icon'
                width={20}
                height={20}
                style={{marginLeft: '5px', verticalAlign: 'middle'}} 
              />
                </Text>
                <Text size='md' weight={500}>
                Wind Direction: {weatherData?.wind?.deg}°
                <img
                src={`https://img.icons8.com/ios/50/000000/compass.png`}
                alt='Compass Icon'
                width={20}
                height={20}
                style={{marginLeft: '5px', verticalAlign: 'middle'}} 
              />
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
