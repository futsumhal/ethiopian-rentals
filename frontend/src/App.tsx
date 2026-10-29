import { useState } from "react";
import "./App.css";
import useProperties from "./hooks/useProperties";
import type { Property } from "./services/propertyService";

function App() {
  const { data: properties = [], isLoading, isError, error } = useProperties();
  const [neighborhood, setNeighborhood] = useState("");
  const [propertyType, setPropertyType] = useState("All");
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [searchApplied, setSearchApplied] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );

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

    const matchesMin =
      minRent === "" || Number(property.price) >= Number(minRent);
    const matchesMax =
      maxRent === "" || Number(property.price) <= Number(maxRent);

    return matchesNeighborhood && matchesType && matchesMin && matchesMax;
  });

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white border-bottom">
        <div className="container py-2">
          <a className="navbar-brand brand" href="#">
            <span className="brand-icon">⌂</span>
            <span>
              Ethiopian Rentals
              <small>Find your next home in Ethiopia</small>
            </span>
          </a>

          <div className="d-flex gap-4 align-items-center">
            <a className="nav-link active" href="#">
              Home
            </a>
            <a className="nav-link" href="#rentals">
              Properties
            </a>
            <a className="nav-link d-none d-sm-block" href="#about">
              About
            </a>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="container hero-content">
          <h1>Find Your Perfect Rental</h1>
          <p>
            Discover houses, apartments and rooms for rent
            <br className="d-none d-md-block" /> in Addis Ababa and beyond.
          </p>

          <form
            className="search-panel row g-3 align-items-end"
            onSubmit={(event) => {
              event.preventDefault();
              setSearchApplied(true);
              document
                .getElementById("rentals")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="neighborhood" className="form-label">
                Neighborhood
              </label>

              <input
                id="neighborhood"
                className="form-control"
                placeholder="e.g. Bole"
                value={neighborhood}
                onChange={(event) => setNeighborhood(event.target.value)}
              />
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <label htmlFor="propertyType" className="form-label">
                Property type
              </label>
              <select
                id="propertyType"
                className="form-select"
                value={propertyType}
                onChange={(event) => setPropertyType(event.target.value)}
              >
                <option value="All">All types</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Room">Room</option>
              </select>
            </div>

            <div className="col-6 col-lg-2">
              <label htmlFor="minRent" className="form-label">
                Min rent (ETB)
              </label>
              <input
                id="minRent"
                type="number"
                min="0"
                className="form-control"
                placeholder="Any"
                value={minRent}
                onChange={(event) => setMinRent(event.target.value)}
              />
            </div>

            <div className="col-6 col-lg-2">
              <label htmlFor="maxRent" className="form-label">
                Max rent (ETB)
              </label>
              <input
                id="maxRent"
                type="number"
                min="0"
                className="form-control"
                placeholder="Any"
                value={maxRent}
                onChange={(event) => setMaxRent(event.target.value)}
              />
            </div>

            <div className="col-12 col-lg-2">
              <button className="btn btn-primary w-100" type="submit">
                Search rentals
              </button>
            </div>
          </form>
        </div>
      </header>

      <main className="container py-5" id="rentals">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="section-title mb-1">
              {searchApplied ? "Search Results" : "Featured Rentals"}
            </h2>
            <p className="text-secondary mb-0">
              {filteredProperties.length} properties available
            </p>
          </div>
          {searchApplied && (
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                setNeighborhood("");
                setPropertyType("All");
                setMinRent("");
                setMaxRent("");
                setSearchApplied(false);
              }}
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="row g-4">
          {filteredProperties.map((property) => (
            <div className="col-12 col-sm-6 col-lg-3" key={property.id}>
              <article className="card property-card h-100">
                <img
                  src={
                    property.image_url ||
                    "https://placehold.co/800x500?text=No+Property+Image"
                  }
                  className="card-img-top property-image"
                  alt={property.title}
                />

                <div className="card-body d-flex flex-column">
                  <span className="badge text-bg-primary align-self-start mb-2">
                    {property.property_type}
                  </span>

                  <h3 className="property-title">{property.title}</h3>
                  <p className="text-secondary mb-3">
                    <span aria-hidden="true">📍</span> {property.neighborhood},
                    Addis Ababa
                  </p>

                  <div className="property-features mb-3">
                    <span>{property.bedrooms} Beds</span>
                    <span>{property.bathrooms} Baths</span>
                    <span>
                      {property.furnished ? "Furnished" : "Unfurnished"}
                    </span>
                  </div>

                  <p className="property-price mt-auto">
                    {Number(property.price).toLocaleString("en-US")} ETB
                    <small> / month</small>
                  </p>

                  <button
                    className="btn btn-outline-primary w-100"
                    onClick={() => setSelectedProperty(property)}
                  >
                    View Details
                  </button>
                </div>
              </article>
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-5">
            <h3>No properties found</h3>
            <p>Try another neighborhood or change your rent range.</p>
          </div>
        )}

        <section className="about-section mt-5 p-4 p-md-5" id="about">
          <h2 className="section-title">Find a place to call home</h2>
          <p className="mb-0">
            Explore rental houses, apartments and rooms across Addis Ababa.
            Contact the advertiser directly to ask about a property.
          </p>
        </section>
      </main>

      {selectedProperty && (
        <div
          className="details-backdrop"
          role="presentation"
          onClick={() => setSelectedProperty(null)}
        >
          <section
            className="details-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="details-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="btn-close float-end"
              aria-label="Close details"
              onClick={() => setSelectedProperty(null)}
            />
            <img
              src={selectedProperty.image_url}
              alt={selectedProperty.title}
              className="details-image"
            />
            <h2 id="details-title" className="mt-3">
              {selectedProperty.title}
            </h2>
            <p>{selectedProperty.neighborhood}, Addis Ababa</p>
            <p className="property-price">
              {Number(selectedProperty.price).toLocaleString("en-US")} ETB
              <small> / month</small>
            </p>
            <p>
              {selectedProperty.bedrooms} bedroom(s) ·{" "}
              {selectedProperty.bathrooms} bathroom(s) ·{" "}
              {selectedProperty.furnished ? "Furnished" : "Unfurnished"}
            </p>
            <p className="text-secondary">
              Sample listing. Advertiser contact details will be added when we
              connect this page to the Django API.
            </p>
          </section>
        </div>
      )}
    </>
  );
}

export default App;
