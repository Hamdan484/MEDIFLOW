import { useParams, useNavigate } from "react-router-dom";
import { addToCart } from "./Cart";
import toast from "react-hot-toast";
import "../Styles/profile.css";

const PHARMACY = {
  id: "p2",
  name: "HealthPlus Pharmacy",
  address: "Bantama, Kumasi, Ashanti",
  phone: "+233 24 987 6543",
  hours: "Mon–Fri 8am–8pm, Sat 9am–6pm",
  distance: 1.2,
  license: "GPC/2020/0112",
  verified: true,
  lat: 6.7056,
  lng: -1.63,
  drugs: [
    {
      id: 1,
      name: "Paracetamol",
      unit: "500mg tabs · pack of 24",
      price: 3.8,
      inStock: true,
    },
    {
      id: 2,
      name: "Metformin",
      unit: "500mg tabs · pack of 30",
      price: 12.0,
      inStock: true,
    },
    {
      id: 3,
      name: "Artemether",
      unit: "20/120mg tabs · pack of 6",
      price: 22.5,
      inStock: true,
    },
    {
      id: 4,
      name: "Omeprazole",
      unit: "20mg caps · pack of 14",
      price: 8.5,
      inStock: false,
    },
  ],
};

/* ── Icons ── */

function BackIcon() {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#555" strokeWidth={2.2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#2a9b6f" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}

function VerifiedIcon() {
  return (
    <svg width="12" height="12" fill="#2a9b6f" viewBox="0 0 24 24">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function DirectionsIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#2a9b6f" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function PillIcon() {
  return (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#2a9b6f" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#aaa" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

/* ── Component ── */

export default function PharmacyProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pharmacy = PHARMACY; // TODO: fetch by id from API

  function openDirections() {
    const url = `https://www.google.com/maps/search/?api=1&query=${pharmacy.lat},${pharmacy.lng}`;
    window.open(url, "_blank");
  }

  function callPharmacy() {
    window.location.href = `tel:${pharmacy.phone}`;
  }

  function handleDrugClick(drug) {
    navigate(`/search?q=${encodeURIComponent(drug.name)}`);
  }

  function handleAddToCart(e, drug) {
    e.stopPropagation();
    if (!drug.inStock) return;
    addToCart({
      id: drug.id,
      name: drug.name,
      unit: drug.unit,
      price: drug.price,
      pharmacyId: pharmacy.id,
      pharmacyName: pharmacy.name,
    });
    toast.success(`Added ${drug.name} to cart`);
  }

  function handleBuyNow(e, drug) {
    e.stopPropagation();
    if (!drug.inStock) return;
    addToCart({
      id: drug.id,
      name: drug.name,
      unit: drug.unit,
      price: drug.price,
      pharmacyId: pharmacy.id,
      pharmacyName: pharmacy.name,
    });
    navigate("/cart");
  }

  return (
    <div className="pharmacy-profile-page">
      {/* ── Hero ── */}
      <div className="hero">
        <div className="hero-top">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <BackIcon />
          </button>

          <div className="hero-icon">
            <BuildingIcon />
          </div>

          <div>
            <div className="pharmacy-name">{pharmacy.name}</div>
            <div className="pharmacy-address">{pharmacy.address}</div>
            {pharmacy.verified && (
              <div className="verified-badge">
                <VerifiedIcon />
                Verified by Ghana FDA
              </div>
            )}
          </div>
        </div>

        {/* Info grid */}
        <div className="info-grid">
          <div className="info-item">
            <div className="info-label">Status</div>
            <div className="info-value open">Open now</div>
          </div>
          <div className="info-item">
            <div className="info-label">Distance</div>
            <div className="info-value">{pharmacy.distance} km away</div>
          </div>
          <div className="info-item">
            <div className="info-label">Hours</div>
            <div className="info-value small">{pharmacy.hours}</div>
          </div>
          <div className="info-item">
            <div className="info-label">Drugs listed</div>
            <div className="info-value">{pharmacy.drugs.length} drugs</div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="action-row">
          <button className="btn-directions" onClick={openDirections}>
            <DirectionsIcon /> Get directions
          </button>
          <button className="btn-call" onClick={callPharmacy}>
            <PhoneIcon /> Call pharmacy
          </button>
        </div>
      </div>

      {/* ── Map tap area ── */}
      <div className="map-box" onClick={openDirections}>
        <span className="map-text">Tap to open in Google Maps</span>
      </div>

      {/* ── Drug listings ── */}
      <div className="section">
        <div className="section-title">Available drugs</div>

        {pharmacy.drugs.map((drug) => (
          <div key={drug.id} className="drug-row" onClick={() => handleDrugClick(drug)}>
            <div className="drug-icon">
              <PillIcon />
            </div>

            <div className="drug-info">
              <div className="drug-name">{drug.name}</div>
              <div className="drug-unit">{drug.unit}</div>
              <div className="drug-price-mobile">GH₵ {drug.price.toFixed(2)}</div>
            </div>

            <div className="drug-right">
              <div className="drug-price-desktop">GH₵ {drug.price.toFixed(2)}</div>
              <span className={drug.inStock ? "badge-in-stock" : "badge-out-of-stock"}>
                {drug.inStock ? "In stock" : "Out of stock"}
              </span>
              
              <div className="drug-actions">
                <button 
                  className="btn-add-mini" 
                  disabled={!drug.inStock}
                  onClick={(e) => handleAddToCart(e, drug)}
                >
                  Add
                </button>
                <button 
                  className="btn-buy-mini" 
                  disabled={!drug.inStock}
                  onClick={(e) => handleBuyNow(e, drug)}
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── License ── */}
      <div className="license-row">
        <ShieldIcon />
        License: {pharmacy.license} · Registered with Ghana Pharmacy Council
      </div>
    </div>
  );
}
