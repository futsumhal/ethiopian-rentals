import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import usePropertyDetail from "../hooks/usePropertyDetail";
import "./PropertyDetail.css";

function PropertyDetailPage() {
  const { id } = useParams();
  const { data: property, isLoading, isError } = usePropertyDetail(Number(id));

  return (
    <>
      <Navbar />

      <main className="rh-detail">
        <Link to="/" className="rh-back">
          ← Back to all rentals
        </Link>

        {isLoading && (
          <div className="rh-detail-state">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {isError && (
          <div className="rh-detail-state">
            <h2>Property not found</h2>
            <p>This listing may have been removed or the link is incorrect.</p>
            <Link to="/" className="rh-btn rh-btn-primary">
              Browse rentals
            </Link>
          </div>
        )}

        {property && (
          <>
            <h1 className="rh-detail-title">{property.title}</h1>
            <p className="rh-detail-location">
              {property.neighborhood}, Addis Ababa
            </p>

            <img
              className="rh-detail-image"
              src={
                property.image_url ||
                "https://placehold.co/1200x700?text=No+Property+Image"
              }
              alt={property.title}
            />

            <div className="rh-detail-layout">
              <div>
                <div className="rh-detail-facts">
                  <span className="rh-badge-dark">{property.property_type}</span>
                  <span>
                    {property.bedrooms}{" "}
                    {property.bedrooms === 1 ? "bedroom" : "bedrooms"}
                  </span>
                  <span>
                    {property.bathrooms}{" "}
                    {property.bathrooms === 1 ? "bathroom" : "bathrooms"}
                  </span>
                  <span>
                    {property.furnished ? "Furnished" : "Unfurnished"}
                  </span>
                </div>

                <section className="rh-detail-section">
                  <h2>About this place</h2>
                  <p className="rh-detail-description">
                    {property.description || "No description provided."}
                  </p>
                </section>

                <section className="rh-detail-section">
                  <h2>Location</h2>
                  <p>
                    {property.address
                      ? `${property.address}, ${property.neighborhood}`
                      : property.neighborhood}
                    , Addis Ababa
                  </p>
                </section>
              </div>

              <aside className="rh-contact-card">
                <p className="rh-contact-price">
                  <strong>
                    {Number(property.price).toLocaleString("en-US")} ETB
                  </strong>{" "}
                  <span>/ month</span>
                </p>

                {property.is_available ? (
                  <>
                    <p className="rh-contact-name">
                      Listed by <strong>{property.advertiser_name}</strong>
                    </p>
                    <a
                      className="rh-call-btn"
                      href={`tel:${property.phone_number}`}
                    >
                      Call {property.phone_number}
                    </a>
                    <p className="rh-contact-hint">
                      Tell them you found this on Ethiopian Rentals.
                    </p>
                  </>
                ) : (
                  <p className="rh-contact-hint">
                    This property is no longer available.
                  </p>
                )}
              </aside>
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default PropertyDetailPage;