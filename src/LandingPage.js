
import React, { useState, useEffect } from "react";
import data from "./data.json";

const LandingPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedTab, setSelectedTab] = useState("PLACES");
  const [selectedCity, setSelectedCity] = useState(data[0]);

  // update the selected city when the search input changes
  useEffect(() => {
    try {
        const matchingCity = data.find(
            (city) => city && city.name && city.name.toLowerCase().startsWith(searchInput.toLowerCase())
          );
          
      if (matchingCity) {
        setSelectedCity(matchingCity);
      }
    } catch (error) {
      console.error(error);
    }
  }, [searchInput]);

  // filter the data based on the selected tab and city
  const filteredData =
    selectedTab === "PLACES"
      ? selectedCity.categories.places
      : selectedTab === "HOTELS"
      ? selectedCity.categories.hotels
      : selectedTab === "RESTAURANTS"
      ? selectedCity.categories.restaurants
      : selectedCity.categories.offices;

  return (
    <div>
      {/* search input */}
      <input
        type="text"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
        placeholder="Search for cities"
      />
      {/* suggestions */}
      {searchInput &&
       searchInput.length > 0 && (
        
        <ul>
          {data
            .filter(
              (city) =>
                city.name.toLowerCase().startsWith(searchInput.toLowerCase()) &&
                city.name !== selectedCity.name
            )
            .map((city) => (
              <li key={city.id} onClick={() => setSelectedCity(city)}>
                {city.name}
              </li>
            ))}
        </ul>
      )}
      {/* selected city background */}
      <div
        style={{
          backgroundImage: `url(${selectedCity.backgroundUrl})`,
          height: "300px",
          width: "100%",
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "50px",
          fontWeight: "bold",
          textTransform: "capitalize",
        }}
      >
        {selectedCity.name}
      </div>
      {/* weather data */}
      <div>{/* display weather data for selected city */}</div>
      {/* tabs */}
      <div>
        <button onClick={() => setSelectedTab("PLACES")}>PLACES</button>
        <button onClick={() => setSelectedTab("HOTELS")}>HOTELS</button>
        <button onClick={() => setSelectedTab("RESTAURANTS")}>
          RESTAURANTS
        </button>
        <button onClick={() => setSelectedTab("OFFICES")}>OFFICES</button>
      </div>
      {/* data */}
      {filteredData.map((item) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          {/* display other data for item */}
        </div>
      ))}
    </div>
  );
};

export default LandingPage;
