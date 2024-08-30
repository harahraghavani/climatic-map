import moment from "moment";

export const getWeatherIcon = (weather) => {
  switch (weather.toLowerCase()) {
    case "clear":
      return "CLEAR_DAY";
    case "clouds":
      return "CLOUDY";
    case "few clouds":
      return "PARTLY_CLOUDY_DAY";
    case "scattered clouds":
      return "PARTLY_CLOUDY_DAY";
    case "broken clouds":
      return "CLOUDY";
    case "shower rain":
      return "RAIN";
    case "rain":
      return "RAIN";
    case "thunderstorm":
      return "RAIN";
    case "snow":
      return "SNOW";
    case "mist":
      return "FOG";
    case "haze":
      return "FOG";
    case "fog":
      return "FOG";
    case "smoke":
      return "FOG";
    case "dust":
      return "FOG";
    case "sand":
      return "FOG";
    case "ash":
      return "FOG";
    case "squall":
      return "WIND";
    case "tornado":
      return "WIND";
    case "drizzle":
      return "RAIN";
    case "overcast clouds":
      return "CLOUDY";
    default:
      return "PARTLY_CLOUDY_DAY";
  }
};

export const timeStampToHours = (timestamp) => {
  if (timestamp) {
    const formattedTime = moment.unix(timestamp).format("h:mm A"); // e.g., "6:59 PM"

    return formattedTime;
  }
};
