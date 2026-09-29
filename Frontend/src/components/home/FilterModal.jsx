// FilterModal.js
import React, { useState } from "react";
import "../../css/FilterModal.css";
import "react-input-range/lib/css/index.css";
import InputRange from "react-input-range";
import { useDispatch, useSelector } from "react-redux";
import { propertyAction } from "../../store/Property/property-slice";
import { getAllProperties } from "../../store/Property/property-action";

const FilterModal = ({ onClose }) => {
  const searchParams = useSelector((state) => state.properties.searchParams);
  const dispatch = useDispatch();
  const [priceRange, setPriceRange] = useState({
    min: Number(searchParams.minPrice) || 600,
    max: Number(searchParams.maxPrice) || 30000,
  });
  const [minPriceInput, setMinPriceInput] = useState(
    String(Number(searchParams.minPrice) || 600)
  );
  const [maxPriceInput, setMaxPriceInput] = useState(
    String(Number(searchParams.maxPrice) || 30000)
  );
  const [priceError, setPriceError] = useState("");
  const [propertyType, setPropertyType] = useState(searchParams.propertyType || "");
  const [roomType, setRoomType] = useState(searchParams.roomType || "");
  const [amenities, setAmenities] = useState(
    Array.isArray(searchParams.amenities)
      ? searchParams.amenities
      : searchParams.amenities
        ? [searchParams.amenities]
        : []
  );

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
    setMinPriceInput(String(value.min));
    setMaxPriceInput(String(value.max));
    setPriceError("");
  };

  const handleMinInputChange = (e) => {
    setMinPriceInput(e.target.value);
  };

  const handleMaxInputChange = (e) => {
    setMaxPriceInput(e.target.value);
  };

  const handleFilterChange = () => {
    const minPrice = Number(minPriceInput);
    const maxPrice = Number(maxPriceInput);
    if (
      !Number.isFinite(minPrice) ||
      !Number.isFinite(maxPrice) ||
      minPrice < 600 ||
      maxPrice > 30000 ||
      minPrice > maxPrice
    ) {
      setPriceError("Enter a valid range between ₹600 and ₹30,000.");
      return;
    }

    dispatch(propertyAction.updateSearchParams({
      minPrice,
      maxPrice,
      propertyType,
      roomType,
      amenities,
      page: 1,
    }));
    dispatch(getAllProperties());
    onClose();
  };

  const handleClearFilters = () => {
    setPriceRange({ min: 600, max: 30000 });
    setMinPriceInput("600");
    setMaxPriceInput("30000");
    setPriceError("");
    setPropertyType("");
    setRoomType("");
    setAmenities([]);
    dispatch(propertyAction.updateSearchParams({
      minPrice: "",
      maxPrice: "",
      propertyType: "",
      roomType: "",
      amenities: [],
      page: 1,
    }));
    dispatch(getAllProperties());
  };

  const propertyTypeOptions = [
    { value: "House", label: "House", icon: "home" },
    { value: "Flat", label: "Flat", icon: "apartment" },
    { value: "Guest House", label: "Guest House", icon: "hotel" },
    { value: "Hotel", label: "Hotel", icon: "meeting_room" },
  ];

  const roomTypeOptions = [
    { value: "Entire Home", label: "Entire Home", icon: "hotel" },
    { value: "Room", label: "Room", icon: "meeting_room" },
    { value: "", label: "Any Type", icon: "apartment" },
  ];

  const amenitiesOptions = [
    { value: "Wifi", label: "Wi-Fi", icon: "wifi" },
    { value: "Kitchen", label: "Kitchen", icon: "kitchen" },
    { value: "Ac", label: "AC", icon: "ac_unit" },
    {
      value: "Washing Machine",
      label: "Washing Machine",
      icon: "local_laundry_service",
    },
    { value: "Tv", label: "TV", icon: "tv" },
    { value: "Pool", label: "Pool", icon: "pool" },
    { value: "Free Parking", label: "Free Parking", icon: "local_parking" },
  ];

  const handleAmenitiesChange = (selectedAmenity) => {
    setAmenities((prevAmenities) =>
      prevAmenities.includes(selectedAmenity)
        ? prevAmenities.filter((item) => item !== selectedAmenity)
        : [...prevAmenities, selectedAmenity]
    );
  };

  const handlePropertyTypeChange = (selectedType) => {
    setPropertyType((prevType) =>
      prevType === selectedType ? "" : selectedType
    );
  };

  const handleRoomTypeChange = (selectedType) => {
    setRoomType((prevType) => (prevType === selectedType ? "" : selectedType));
  };

  return (
    <div className="filter-modal-backdrop">
      <div className="filter-modal-content" role="dialog" aria-modal="true" aria-labelledby="filter-modal-title">
        <h4 id="filter-modal-title">
          Filters <hr />
        </h4>
        <button className="close-button" onClick={onClose} aria-label="Close filters">
          <span>&times;</span>
        </button>

        <div className="modal-filters-container">
          <div className="filter-section">
            <label>Price Range:</label>

            <InputRange
              minValue={600}
              maxValue={30000}
              value={priceRange}
              onChange={handlePriceRangeChange}
            />
            <div className="range-inputs">
              <input
                type="number"
                min="600"
                max="30000"
                value={minPriceInput}
                onChange={handleMinInputChange}
                aria-label="Minimum price"
              />
              <span>-</span>
              <input
                type="number"
                min="600"
                max="30000"
                value={maxPriceInput}
                onChange={handleMaxInputChange}
                aria-label="Maximum price"
              />
            </div>
            {priceError && <p className="filter-error" role="alert">{priceError}</p>}
          </div>

          <div className="filter-section">
            <label>Property Type:</label>
            <div className="icon-box">
              {propertyTypeOptions.map((option) => (
                <div
                  key={option.value}
                  className={`selectable-box ${
                    propertyType === option.value ? "selected" : ""
                  }`}
                  onClick={() => handlePropertyTypeChange(option.value)}
                >
                  <span className="material-icons">{option.icon}</span>
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <label>Room Type:</label>
            <div className="icon-box">
              {roomTypeOptions.map((option) => (
                <div
                  key={option.value || "any-type"}
                  className={`selectable-box ${
                    roomType === option.value ? "selected" : ""
                  }`}
                  onClick={() => handleRoomTypeChange(option.value)}
                >
                  <span className="material-icons">{option.icon}</span>
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <label>Amenities:</label>
            <div className="amenities-checkboxes">
              {amenitiesOptions.map((option) => (
                <div key={option.value} className="amenity-checkbox">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={amenities.includes(option.value)}
                    onChange={() => handleAmenitiesChange(option.value)}
                  />
                  <span className="material-icons amenitieslabel">
                    {option.icon}
                  </span>
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="filter-buttons">
            <button className="clear-button" onClick={handleClearFilters}>
              Clear
            </button>
            <button onClick={handleFilterChange}>Apply Filters</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
