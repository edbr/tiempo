
        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showWeather, handleLocationError);
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }

        function showWeather(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
            const apiKey = '51fabd9b65281819ffc5a5b80d9c509f';
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    const weatherInfo = document.getElementById('weather-info');
                    weatherInfo.innerHTML = `
                        <h2>Current Weather</h2>
                        <p>Location: ${data.name}</p>
                        <p>Temperature: ${Math.round(data.main.temp - 273.15)}°C</p>
                        <p>Condition: ${data.weather[0].description}</p>
                    `;
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                });
        }

        function handleLocationError(error) {
            const weatherInfo = document.getElementById('weather-info');
            
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    weatherInfo.innerHTML = `<p>User denied the request for Geolocation.</p>`;
                    break;
                case error.POSITION_UNAVAILABLE:
                    weatherInfo.innerHTML = `<p>Location information is unavailable.</p>`;
                    break;
                case error.TIMEOUT:
                    weatherInfo.innerHTML = `<p>The request to get user location timed out.</p>`;
                    break;
                case error.UNKNOWN_ERROR:
                    weatherInfo.innerHTML = `<p>An unknown error occurred.</p>`;
                    break;
            }
        }