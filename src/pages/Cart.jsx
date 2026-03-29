import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Cart.css";

// ── Cart store — simple module-level state ──────────────────────────────────
// In a real app replace this with Zustand: useCartStore
// For now any component can import { addToCart } and call it
let cartListeners = [];
let cartItems = [];

export function addToCart(drug) {
  const existing = cartItems.find(
    (i) => i.id === drug.id && i.pharmacyId === drug.pharmacyId
  );
  if (existing) {
    cartItems = cartItems.map((i) =>
      i.id === drug.id && i.pharmacyId === drug.pharmacyId
        ? { ...i, qty: i.qty + 1 }
        : i
    );
  } else {
    cartItems = [...cartItems, { ...drug, qty: 1 }];
  }
  cartListeners.forEach((fn) => fn([...cartItems]));
}

export function getCartCount() {
  return cartItems.reduce((sum, i) => sum + i.qty, 0);
}

function useCart() {
  const [items, setItems] = useState([...cartItems]);

  useState(() => {
    cartListeners.push(setItems);
    return () => {
      cartListeners = cartListeners.filter((fn) => fn !== setItems);
    };
  });

  function increment(id, pharmacyId) {
    cartItems = cartItems.map((i) =>
      i.id === id && i.pharmacyId === pharmacyId ? { ...i, qty: i.qty + 1 } : i
    );
    setItems([...cartItems]);
  }

  function decrement(id, pharmacyId) {
    cartItems = cartItems.map((i) =>
      i.id === id && i.pharmacyId === pharmacyId
        ? { ...i, qty: Math.max(1, i.qty - 1) }
        : i
    );
    setItems([...cartItems]);
  }

  function remove(id, pharmacyId) {
    cartItems = cartItems.filter(
      (i) => !(i.id === id && i.pharmacyId === pharmacyId)
    );
    setItems([...cartItems]);
  }

  function clear() {
    cartItems = [];
    setItems([]);
  }

  return { items, increment, decrement, remove, clear };
}

// ── Group items by pharmacy ─────────────────────────────────────────────────
function groupByPharmacy(items) {
  return items.reduce((acc, item) => {
    const key = item.pharmacyName || "Unknown Pharmacy";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}

// ── PillIcon ────────────────────────────────────────────────────────────────
function PillIcon() {
  return (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"
      stroke="#2a9b6f" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
    </svg>
  );
}

// ── Cart page ───────────────────────────────────────────────────────────────
export default function Cart() {
  const { items, increment, decrement, remove, clear } = useCart();
  const [ordered, setOrdered] = useState(false);
  const navigate = useNavigate();

  const grouped   = groupByPharmacy(items);
  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  function handleOrder() {
    // TODO: call your order API here
    setOrdered(true);
    clear();
  }

  return (
    <div className="cart-page">

      {/* Header */}
      <div className="cart-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"
            stroke="#555" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <span className="cart-header-title">My Cart</span>
          <span className="cart-header-count">
            {totalItems} item{totalItems !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Empty state */}
      {items.length === 0 && !ordered && (
        <div className="cart-body">
          <div className="cart-left">
            <div className="cart-empty">
              <div className="empty-icon">
                <svg width="30" height="30" fill="none" viewBox="0 0 24 24"
                  stroke="#aaa" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="empty-title">Your cart is empty</div>
              <div className="empty-sub">
                Search for a drug and tap "Add to cart" to get started
              </div>
              <button className="btn-browse" onClick={() => navigate("/medicines")}>
                Browse drugs
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart items + summary */}
      {items.length > 0 && (
        <div className="cart-body">

          {/* Left — items grouped by pharmacy */}
          <div className="cart-left">
            {Object.entries(grouped).map(([pharmacyName, pharmacyItems]) => (
              <div key={pharmacyName}>
                <div className="pharmacy-group-label">{pharmacyName}</div>
                {pharmacyItems.map((item) => (
                  <div className="cart-item" key={`${item.id}-${item.pharmacyId}`}>
                    <div className="item-icon"><PillIcon /></div>
                    <div className="item-info">
                      <div className="item-name">{item.name}</div>
                      <div className="item-pharmacy">{item.pharmacyName}</div>
                      <div className="item-unit">{item.unit}</div>
                    </div>
                    <div className="item-right">
                      <div className="item-price">
                        GH₵ {(item.price * item.qty).toFixed(2)}
                      </div>
                      <div className="qty-row">
                        <button
                          className="qty-btn"
                          onClick={() => decrement(item.id, item.pharmacyId)}
                        >−</button>
                        <span className="qty-val">{item.qty}</span>
                        <button
                          className="qty-btn"
                          onClick={() => increment(item.id, item.pharmacyId)}
                        >+</button>
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => remove(item.id, item.pharmacyId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Right — order summary */}
          <div className="cart-right">
            <div className="summary-card">
              <div className="summary-title">Order summary</div>

              {items.map((item) => (
                <div className="summary-row" key={`${item.id}-${item.pharmacyId}`}>
                  <span>{item.name} × {item.qty}</span>
                  <span>GH₵ {(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}

              <div className="summary-row total">
                <span>Total</span>
                <span>GH₵ {totalPrice.toFixed(2)}</span>
              </div>

              <div className="delivery-box">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"
                  stroke="#2a9b6f" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Pick up in person at the pharmacy
              </div>

              <button className="btn-order" onClick={handleOrder}>
                Place order — GH₵ {totalPrice.toFixed(2)}
              </button>

              <button className="btn-clear" onClick={clear}>
                Clear cart
              </button>

              <div className="note-box">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"
                  stroke="#7a5c00" strokeWidth={2}
                  style={{ flexShrink: 0, marginTop: "1px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Payment is made directly at the pharmacy. This order reserves your drugs.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order success modal */}
      {ordered && (
        <div className="success-overlay">
          <div className="success-box">
            <div className="success-icon">
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24"
                stroke="#2a9b6f" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="success-title">Order placed!</div>
            <div className="success-sub">
              Your drugs have been reserved. Head to the pharmacy to pick them up and pay.
            </div>
            <button className="btn-done" onClick={() => navigate("/home")}>
              Back to home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}