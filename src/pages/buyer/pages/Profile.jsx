import "../styles/Profile.css";

export default function Profile() {
  return (
    <div className="profile-page">
      <h1>Mening Profilim</h1>
      <div className="profile-info">
        <p><b>Ism:</b> Sherzod</p>
        <p><b>Telefon:</b> +998 90 123 45 67</p>
        <p><b>Rol:</b> Buyer</p>
      </div>
      <button className="edit-btn">Profilni tahrirlash</button>
    </div>
  );
}
