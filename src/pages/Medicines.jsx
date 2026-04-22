import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import "../Styles/Medicines.css";
import { addToCart } from "./Cart";

/* ── Fallback Mock Data for Deployment ── */
const MOCK_MEDICINES = [
  { id: 1, name: "Paracetamol", generic_name: "Acetaminophen 500mg", category: "Painkiller", price: 3.8, is_in_stock: true, unit: "pack" },
  { id: 2, name: "Amoxicillin", generic_name: "Amoxicillin 250mg", category: "Antibiotics", price: 15.0, is_in_stock: true, unit: "pack" },
  { id: 3, name: "Metformin", generic_name: "Metformin HCl 500mg", category: "Diabetes", price: 12.0, is_in_stock: true, unit: "pack" },
  { id: 4, name: "Artemether", generic_name: "Artemether/Lumefantrine", category: "Malaria", price: 22.5, is_in_stock: true, unit: "pack" },
  { id: 5, name: "Omeprazole", generic_name: "Omeprazole 20mg", category: "Digestive", price: 8.5, is_in_stock: false, unit: "pack" },
];

const CATEGORIES = ["All", "Painkiller", "Antibiotics", "Malaria", "Diabetes", "Hypertension", "Digestive", "Respiratory"];

/* ── Icons ── */
function BackIcon() { return <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#555" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>; }
function SearchIcon() { return <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="#bbb" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" /></svg>; }
function PillIcon() { return <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#2a9b6f" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" /></svg>; }
function PlusIcon() { return <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>; }
function EmptyIcon() { return <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#2a9b6f" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>; }

export default function MedicinesPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activecat, setActivecat] = useState("All");
  const [medicines, setMedicines] = useState(MOCK_MEDICINES);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [compareIds, setCompareIds] = useState([]);

  useEffect(() => {
    async function fetchMedicines() {
      setLoading(true);
      try {
        const response = await api.get("/medicines", {
          params: { q: query || undefined, category: activecat !== "All" ? activecat : undefined }
        });
        setMedicines(response.data);
      } catch (error) {
        console.warn("Backend unreachable, using mock data.");
        // Apply client-side filtering on mock data if backend fails
        const filteredMock = MOCK_MEDICINES.filter(m => {
          const matchesSearch = m.name.toLowerCase().includes(query.toLowerCase()) || m.generic_name.toLowerCase().includes(query.toLowerCase());
          const matchesCat = activecat === "All" || m.category === activecat;
          return matchesSearch && matchesCat;
        });
        setMedicines(filteredMock);
      } finally {
        setLoading(false);
      }
    }
    const timer = setTimeout(fetchMedicines, 300);
    return () => clearTimeout(timer);
  }, [query, activecat]);

  function toggleCart(med) {
    if (cart.includes(med.id)) setCart(prev => prev.filter(i => i !== med.id));
    else {
      setCart(prev => [...prev, med.id]);
      addToCart({ id: med.id, name: med.name, unit: med.unit || "pack", price: med.price, pharmacyName: "HealthPlus" });
    }
  }

  return (
    <div className="medicines-page">
      <div className="medicines-header">
        <button className="back-btn" onClick={() => navigate(-1)}><BackIcon /></button>
        <div>
          <div className="header-title">Medicines</div>
          <div className="header-sub">Browse and compare drug prices</div>
        </div>
      </div>

      <div className="search-wrapper">
        <div className="search-box">
          <SearchIcon />
          <input type="text" placeholder="Search by name or generic…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </div>

      <div className="filters-row">
        {CATEGORIES.map((cat) => (
          <button key={cat} className={`filter-chip ${activecat === cat ? "active" : ""}`} onClick={() => setActivecat(cat)}>{cat}</button>
        ))}
      </div>

      <div className="results-meta">
        {loading ? "Loading..." : <>{medicines.length} medicines found</>}
      </div>

      <div className="medicines-list">
        {medicines.map((med) => (
          <div key={med.id} className="medicine-card" onClick={() => navigate(`/search?q=${encodeURIComponent(med.name)}`)}>
            <div className="medicine-icon"><PillIcon /></div>
            <div className="medicine-info">
              <div className="medicine-name">{med.name}</div>
              <div className="medicine-generic">{med.generic_name}</div>
              <div className="medicine-meta">
                <span className={med.is_in_stock ? "badge-in-stock" : "badge-out-of-stock"}>{med.is_in_stock ? "In stock" : "Out of stock"}</span>
              </div>
            </div>
            <div className="medicine-right" onClick={(e) => e.stopPropagation()}>
              <div><div className="medicine-price">GH₵ {med.price.toFixed(2)}</div></div>
              <button className="btn-add-cart" onClick={() => toggleCart(med)} style={cart.includes(med.id) ? { background: "#0c503b" } : undefined}>
                <PlusIcon /> {cart.includes(med.id) ? "Added" : "Add"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
