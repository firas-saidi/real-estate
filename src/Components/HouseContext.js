import React, { useState, createContext, useEffect } from "react";

import { housesData } from "../data";

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState("Location (any)");
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState("Property (any)");
  const [properties, setProperties] = useState([]);

  const [price, setPrice] = useState("Price range (any)");
  const [loading, setLoading] = useState(false);

  //return all countries
  useEffect(() => {
    const allCountries = houses.map((house, index) => {
      return house.country;
    });

    const uniqueCountries = ["Location  (any)", ...new Set(allCountries)];

    //set countries
    setCountries(uniqueCountries);
  });

  //return all properties
  useEffect(() => {
    const allProperties = houses.map((house, index) => {
      return house.type;
    });

    const uniqueProperties = ["Location  (any)", ...new Set(allProperties)];

    //set properties state
    setProperties(uniqueProperties);
  });

  const handleClick = () => {
    //set loading
    setLoading(true);
    // create function that checks if the  string includes '(any)
    const isDefault = (str) => {
      return str.split(" ").includes("(any)");
    };

    //get first value of price and parse it to number
    const minPrice = parseInt(price.split(" ")[0]);

    //get second value of price and parse it to number
    const maxPrice = parseInt(price.split(" ")[2]);

    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);
      //if all the values are selected

      if (
        house.country === country &&
        house.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return house;
      }

      //if all the values are default
      if (isDefault(country) && isDefault(property) && isDefault(price)) {
        return house;
      }

      //if country  is not default
      if (!isDefault(country) && isDefault(property) && isDefault(price)) {
        return house.country === country;
      }

      //if country  is not default
      if (!isDefault(property) && isDefault(country) && isDefault(price)) {
        return house.type === property;
      }

      //if price  is not default
      if (!isDefault(price) && isDefault(property) && isDefault(country)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house;
        }
      }

      //if country and property is not default
      if (!isDefault(country) && !isDefault(property) && isDefault(price)) {
        return house.country === country && house.type === property;
      }
      //if country and price is not default
      if (!isDefault(country) && !isDefault(price) && isDefault(property)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country;
        }
      }

      //if property and price  is not default
      if (isDefault(country) && !isDefault(property) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property;
        }
      }
    });
    setTimeout(() => {
      return (
        newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
        setLoading(false)
      );
    }, 1000);
  };
  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        houses,
        loading,
        handleClick,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
