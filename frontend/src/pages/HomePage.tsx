import { useState } from "react";
import "../App.css";
import useProperties from "../hooks/useProperties";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Hero.css";
import "./Results.css";
import "./Cards.css";
import Footer from "../components/Footer";
import "./About.css";

const TYPE_CHIPS = [
  { label: "All", value: "All" },
  { label: "Apartments", value: "apartment" },
  { label: "Houses", value: "house" },
  { label: "Rooms", value: "room" },
];

function HomePage() {
  const { data: properties = [], isLoading, isError, error } = useProperties();
  const [neighborhood, setNeighborhood] = useState("");
  const [propertyType, setPropertyType] = useState("All");
  const [minRent, setMinRent] = useState("");
  const [bedrooms, setBedrooms] = useState("All");
  const [maxRent, setMaxRent] = useState("");

  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading rental properties...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container py-5 text-center">
        <h2>Couldn't load properties</h2>
        <p>Please check that the Django server is running and try again.</p>
        <p className="text-secondary">{String(error)}</p>
      </div>
    );
  }

  const filteredProperties = properties.filter((property) => {
    const matchesNeighborhood = property.neighborhood
      .toLowerCase()
      .includes(neighborhood.trim().toLowerCase());

    const matchesType =
      propertyType === "All" || property.property_type === propertyType;

    const matchesBedrooms =
      bedrooms === "All" || Number(property.bedrooms) >= Number(bedrooms);

    const matchesMin =
      minRent === "" || Number(property.price) >= Number(minRent);
    const matchesMax =
      maxRent === "" || Number(property.price) <= Number(maxRent);

    return (
      matchesNeighborhood &&
      matchesType &&
      matchesBedrooms &&
      matchesMin &&
      matchesMax
    );
  });
  const clearAllFilters = () => {
    setNeighborhood("");
    setPropertyType("All");
    setBedrooms("All");
    setMinRent("");
    setMaxRent("");
  };

  const activeFilters: { key: string; label: string; clear: () => void }[] = [];

  if (neighborhood.trim()) {
    activeFilters.push({
      key: "neighborhood",
      label: neighborhood.trim(),
      clear: () => setNeighborhood(""),
    });
  }
  if (propertyType !== "All") {
    activeFilters.push({
      key: "type",
      label: propertyType.charAt(0).toUpperCase() + propertyType.slice(1),
      clear: () => setPropertyType("All"),
    });
  }
  if (bedrooms !== "All") {
    activeFilters.push({
      key: "bedrooms",
      label: `${bedrooms}+ bedrooms`,
      clear: () => setBedrooms("All"),
    });
  }
  if (minRent !== "") {
    activeFilters.push({
      key: "minRent",
      label: `From ${Number(minRent).toLocaleString("en-US")} ETB`,
      clear: () => setMinRent(""),
    });
  }
  if (maxRent !== "") {
    activeFilters.push({
      key: "maxRent",
      label: `Up to ${Number(maxRent).toLocaleString("en-US")} ETB`,
      clear: () => setMaxRent(""),
    });
  }

  return (
    <>
      <Navbar />

      <section className="rh-hero">
        <div className="rh-hero-inner">
          <h1 className="rh-hero-title">
            Find your next <span>home</span> in Addis Ababa
          </h1>
          <p className="rh-hero-sub">
            Browse houses, apartments and rooms for rent, then call the owner
            directly.
          </p>

          <form
            className="rh-search"
            onSubmit={(event) => {
              event.preventDefault();
              document
                .getElementById("rentals")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <div className="rh-field">
              <label htmlFor="neighborhood">Where</label>
              <input
                id="neighborhood"
                placeholder="Neighborhood, e.g. Bole"
                value={neighborhood}
                onChange={(event) => setNeighborhood(event.target.value)}
              />
            </div>

            <div className="rh-field">
              <label htmlFor="propertyType">Type</label>
              <select
                id="propertyType"
                value={propertyType}
                onChange={(event) => setPropertyType(event.target.value)}
              >
                <option value="All">All types</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="room">Room</option>
              </select>
            </div>

            <div className="rh-field">
              <label htmlFor="bedrooms">Bedrooms</label>
              <select
                id="bedrooms"
                value={bedrooms}
                onChange={(event) => setBedrooms(event.target.value)}
              >
                <option value="All">Any bedrooms</option>
                <option value="1">1+ bedroom</option>
                <option value="2">2+ bedrooms</option>
                <option value="3">3+ bedrooms</option>
                <option value="4">4+ bedrooms</option>
              </select>
            </div>

            <div className="rh-field rh-field-price">
              <label htmlFor="minRent">Monthly rent (ETB)</label>
              <div className="rh-price-inputs">
                <input
                  id="minRent"
                  type="number"
                  min="0"
                  placeholder="Min"
                  value={minRent}
                  onChange={(event) => setMinRent(event.target.value)}
                />
                <span>–</span>
                <input
                  id="maxRent"
                  type="number"
                  min="0"
                  placeholder="Max"
                  aria-label="Maximum rent in ETB"
                  value={maxRent}
                  onChange={(event) => setMaxRent(event.target.value)}
                />
              </div>
            </div>

            <button className="rh-search-btn" type="submit">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <span>Search</span>
            </button>
          </form>

          <div className="rh-chips">
            {TYPE_CHIPS.map((chip) => (
              <button
                key={chip.value}
                type="button"
                className={`rh-chip ${propertyType === chip.value ? "active" : ""}`}
                onClick={() => setPropertyType(chip.value)}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </section>
      <main className="container py-5" id="rentals">
        <div className="rh-results-header">
          <div>
            <h2 className="rh-results-title">
              {activeFilters.length > 0 ? "Search results" : "Featured rentals"}
            </h2>
            <p className="rh-results-count">
              {filteredProperties.length}{" "}
              {filteredProperties.length === 1 ? "property" : "properties"}{" "}
              available
            </p>
          </div>

          {activeFilters.length > 0 && (
            <button className="rh-clear-btn" onClick={clearAllFilters}>
              Clear all
            </button>
          )}
        </div>

        {activeFilters.length > 0 && (
          <div className="rh-active-filters">
            {activeFilters.map((filter) => (
              <button
                key={filter.key}
                className="rh-filter-pill"
                onClick={filter.clear}
                aria-label={`Remove filter: ${filter.label}`}
              >
                {filter.label} <span aria-hidden="true">×</span>
              </button>
            ))}
          </div>
        )}

        <div className="rh-grid">
          {filteredProperties.map((property) => (
            <Link
              to={`/properties/${property.id}`}
              className="rh-card"
              key={property.id}
            >
              <div className="rh-card-media">
                <img
                  src={
                    property.image_url ||
                    "https://placehold.co/800x600?text=No+Property+Image"
                  }
                  alt={property.title}
                  loading="lazy"
                />
                <div className="rh-card-badges">
                  <span className="rh-badge">{property.property_type}</span>
                  {property.furnished && (
                    <span className="rh-badge">Furnished</span>
                  )}
                </div>
              </div>

              <div className="rh-card-body">
                <h3 className="rh-card-title">{property.title}</h3>
                <p className="rh-card-location">
                  {property.neighborhood}, Addis Ababa
                </p>
                <p className="rh-card-features">
                  {property.bedrooms}{" "}
                  {Number(property.bedrooms) === 1 ? "bed" : "beds"} ·{" "}
                  {property.bathrooms}{" "}
                  {Number(property.bathrooms) === 1 ? "bath" : "baths"}
                </p>
                <p className="rh-card-price">
                  <strong>
                    {Number(property.price).toLocaleString("en-US")} ETB
                  </strong>{" "}
                  <span>/ month</span>
                </p>
              </div>
            </Link>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="rh-empty">
            <h3>No properties found</h3>
            <p>Try a different neighborhood or widen your rent range.</p>
            {activeFilters.length > 0 && (
              <button
                className="rh-btn rh-btn-primary"
                onClick={clearAllFilters}
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        <section className="rh-about" id="about">
          <h2 className="rh-about-title">Find a place to call home</h2>
          <p className="rh-about-lead">
            Explore rental houses, apartments and rooms across Addis Ababa, and
            contact the advertiser directly.
          </p>

          <div className="rh-about-grid">
            <div className="rh-about-item">
              <div className="rh-about-icon" aria-hidden="true">
                🔍
              </div>
              <h3>Search what matters</h3>
              <p>
                Filter by neighborhood, property type, bedrooms and monthly rent
                to see only the places that fit.
              </p>
            </div>

            <div className="rh-about-item">
              <div className="rh-about-icon" aria-hidden="true">
                📞
              </div>
              <h3>Call the owner directly</h3>
              <p>
                Every listing shows the advertiser's phone number, so you can
                ask questions and arrange a visit right away.
              </p>
            </div>

            <div className="rh-about-item">
              <div className="rh-about-icon" aria-hidden="true">
                🏠
              </div>
              <h3>Built for Addis Ababa</h3>
              <p>
                Prices in ETB and neighborhoods you know, from apartments to
                single rooms.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
