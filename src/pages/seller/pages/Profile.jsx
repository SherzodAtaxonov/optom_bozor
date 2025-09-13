// src/pages/Profile.jsx
import { useMemo, useState } from "react";
import { useAppContext } from "../../../contexts/AppContext";
import "../styles/Profile.css";

export default function Profile() {
  const { state } = useAppContext();
  const user = state.user || {};

  const displayName = useMemo(() => {
    return user.fullName || user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim();
  }, [user]);

  const [local, setLocal] = useState({
    name: displayName || "",
    email: user.email || "",
    phone: user.phone || "",
    role: user.role || "",
    businessName: user.businessName || user?.businessInfo?.businessName || "",
  });

  return (
    <div className="profile">
      <h2>Profil</h2>

      <div className="profile-row">
        <label>Ism</label>
        <input value={local.name} onChange={e=>setLocal(prev=>({...prev, name: e.target.value}))} placeholder="Ism" />
      </div>

      <div className="profile-row">
        <label>Email</label>
        <input value={local.email} onChange={e=>setLocal(prev=>({...prev, email: e.target.value}))} placeholder="Email" />
      </div>

      <div className="profile-row">
        <label>Telefon</label>
        <input value={local.phone} onChange={e=>setLocal(prev=>({...prev, phone: e.target.value}))} placeholder="Telefon" />
      </div>

      <div className="profile-row">
        <label>Rol</label>
        <input value={local.role} readOnly />
      </div>

      {local.role === 'seller' && (
        <div className="profile-row">
          <label>Biznes nomi</label>
          <input value={local.businessName} onChange={e=>setLocal(prev=>({...prev, businessName: e.target.value}))} placeholder="Biznes nomi" />
        </div>
      )}

      {/* TODO: Save endpoint bilan bog'lash (PATCH /api/users/me) */}
    </div>
  );
}
