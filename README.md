# Weather Dashboard 🌦️

A responsive weather dashboard built with **React, TypeScript, and Material UI**. The application provides current weather conditions and a multi-day forecast using the OpenWeather API, with support for Persian and English languages.

## ✨ Features

- 🌤️ **Current Weather:** Display real-time weather conditions, temperature, humidity, wind speed, and other weather details.
- 📅 **Weather Forecast:** View upcoming weather forecasts for selected cities.
- 🌍 **City Selection:** Search for and select cities to view their weather information.
- 🌐 **Internationalization (i18n):** Switch between Persian and English.
- 🌓 **Light and Dark Mode:** Toggle between light and dark themes.
- 🔐 **Login and Logout:** Simple user login interface and session management.
- 📱 **Responsive Design:** Optimized for desktop, tablet, and mobile devices.
- ⚡ **API Integration:** Fetch weather data using Axios and the OpenWeather API.
- 🎨 **Material UI:** Consistent and modern user interface using reusable components.
- 🔄 **Loading and Error Handling:** Display appropriate feedback while fetching data or when requests fail.

## 🛠️ Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **Material UI (MUI)**
- **Axios**
- **React Router / TanStack Router** 
- **i18next & react-i18next**
- **OpenWeather API**
- **CSS**

## 📂 Project Structure

```text
src/
├── components/
│   ├── Navbar.tsx
│   ├── ForecastDay.tsx
│   ├── TemperatureChart.tsx
│   └── Footer.tsx
├── pages/
│   ├── LoginPage.tsx
│   └── DashboardPage.tsx
├── services/
│   └── weatherApi.ts
├── context/
│   └── AuthContext.tsx
├── i18n/
│   └── config.ts
├── types/
│   └── weather.ts
├── App.tsx
└── main.tsx
```

*Note: The project structure may vary depending on the final implementation.*

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git

### Installation

1. Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

2. Navigate to the project directory:

```bash
cd YOUR_PROJECT_FOLDER
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory and add your OpenWeather API key:

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

5. Start the development server:

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

## 🔑 API Configuration

This project uses the [OpenWeather API](https://openweathermap.org/api) to retrieve current weather conditions and forecast data.

To configure the API:

1. Create an account on OpenWeather.
2. Generate an API key.
3. Add the key to your `.env` file.
4. Restart the development server.

**Important:** Never commit your actual API key to a public repository. Add `.env` to `.gitignore` and consider using a backend proxy for production applications because Vite environment variables prefixed with `VITE_` are exposed to the browser.

## 🌐 Language Support

The application supports:

- **English (EN)**
- **Persian (FA)**

The interface language can be changed using the language selector. Persian language support includes right-to-left (RTL) layout considerations.

## 🎨 Theme Support

Users can switch between:

- Light Mode
- Dark Mode

The theme is implemented using Material UI's theming system to maintain a consistent appearance throughout the application.

## 📸 Screenshots

Add screenshots of your application here:

```text
public/
└── screenshots/
    ├── login.png
    ├── dashboard-light.png
    └── dashboard-dark.png
```

You can then display them in this section:

```markdown
![Login Page](public/screenshots/login.png)

![Dashboard - Light Mode](public/screenshots/dashboard-light.png)

![Dashboard - Dark Mode](public/screenshots/dashboard-dark.png)
```

## 🎯 Project Goals

This project was developed to practice and demonstrate:

- Building reusable React components with TypeScript.
- Managing application state and sharing data between components.
- Integrating external APIs with Axios.
- Creating responsive interfaces with Material UI.
- Implementing internationalization and RTL support.
- Managing light and dark themes.
- Handling loading states and API errors.
- Organizing a React application using a maintainable project structure.

## 🔮 Future Improvements

- Add more detailed weather metrics and visualizations.
- Improve city search with autocomplete.
- Add favorite cities.
- Persist user preferences and selected cities.
- Improve automated testing.
- Add secure authentication through a backend service.
- Add historical weather data when supported by the API plan.

---

⭐ If you find this project useful, feel free to star the repository!
