const apiKey = "2a5d8bf7b3974150bdc55655261303";

function getWeather() {

    let city = document.getElementById("cityInput").value;

    let url =
        "http://api.weatherapi.com/v1/current.json?key=" +
        apiKey +
        "&q=" +
        city +
        "&aqi=no";

    fetch(url)

        .then(response => response.json())

        .then(data => {

            let weather = data.current.condition.text.toLowerCase();

            document.getElementById("city").innerHTML =
                data.location.name;

            document.getElementById("temp").innerHTML =
                "Temperature: " + data.current.temp_c + " °C";

            document.getElementById("desc").innerHTML =
                data.current.condition.text;

            document.getElementById("humidity").innerHTML =
                "Humidity: " + data.current.humidity + "%";

            document.getElementById("wind").innerHTML =
                "Wind Speed: " + data.current.wind_kph + " km/h";

            /* Weather Icon */

            document.getElementById("icon").src =
                "https:" + data.current.condition.icon;


            /* Dynamic Background */

            let body = document.getElementById("body");

            /* Remove previous weather classes */

            body.classList.remove("clear", "clouds", "rain", "snow", "thunderstorm");

            /* Detect weather condition */

            if (weather.includes("cloud")) {
                body.classList.add("clouds");
            }

            else if (weather.includes("rain") || weather.includes("drizzle")) {
                body.classList.add("rain");
            }

            else if (weather.includes("snow") || weather.includes("ice")) {
                body.classList.add("snow");
            }

            else if (weather.includes("thunder") || weather.includes("storm")) {
                body.classList.add("thunderstorm");
            }

            else {
                body.classList.add("clear");
            }

        })

        .catch(() => {
            alert("City not found");
        });

}