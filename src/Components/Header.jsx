import { useNavigate, NavLink } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { getCartCount } from "../pages/Cart";
import "../Styles/Header.css";

const NAV_LINKS = [
  { to: "/",                     label: "Home"         },
  { to: "/medicines",            label: "Medicines"    },
  { to: "/search",               label: "Search"       },
  { to: "/prescription",         label: "Prescription" },
  { to: "/pharmacist/dashboard", label: "Seller"       },
  { to: "/profile",              label: "Profile"      },
  { to: "/Buyer_Dashboard",      label: "Buyer"        },
  { to: "/Customers",            label: "Customers"    },
];

function MenuIcon() {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#555" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#555" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0
           10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3
           3 0 11-6 0v-1m6 0H9" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#555" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function getInitials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Header({ onMenuClick, pharmacyName = "HP", hasNotif = true }) {
  const navigate = useNavigate();
  const { logoutPharmacist } = useAuthStore();
  const cartCount = getCartCount();

  return (
    <header className="app-header">

      {/* Left: hamburger + brand */}
      <div className="header-left">
        {onMenuClick && (
          <button className="menu-btn" onClick={onMenuClick}>
            <MenuIcon />
          </button>
        )}
        <div className="brand">
          Medi<span className="brand-accent">flow</span>
        </div>
      </div>

      {/* Centre: nav links */}
      <nav className="header-nav">
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `header-nav-link ${isActive ? "active" : ""}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Right: cart + notifications + avatar */}
      <div className="header-right">

        {/* Cart */}
        <button className="cart-btn" onClick={() => navigate("/cart")}>
          <CartIcon />
          {cartCount > 0 && <div className="cart-dot" />}
        </button>

        {/* Notifications */}
        <button className="notif-btn" onClick={() => navigate("/notifications")}>
          <BellIcon />
          {hasNotif && <div className="notif-dot" />}
        </button>

        {/* Avatar */}
        <button className="avatar-btn" onClick={() => navigate("/profile")}>
          {getInitials(pharmacyName)}
        </button>

      </div>

    </header>
  );
}