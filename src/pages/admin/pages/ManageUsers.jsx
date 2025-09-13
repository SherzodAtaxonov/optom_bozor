import { Plus, Search, Filter, Edit, Trash2, Eye, Mail, Phone } from "lucide-react";
import "../styles/ManageUser.css";

export default function ManageUsers() {
  const handleAddUser = () => {
    alert("Yangi foydalanuvchi qo'shish oynasi ochiladi");
  };

  const handleEdit = (userName) => {
    alert(`${userName} foydalanuvchisini tahrirlash`);
  };

  const handleDelete = (userName) => {
    if (confirm(`${userName} foydalanuvchisini o'chirishni xohlaysizmi?`)) {
      alert("Foydalanuvchi o'chirildi");
    }
  };

  const handleView = (userName) => {
    alert(`${userName} haqida batafsil ma'lumot`);
  };

  return (
    <div className="manage-users-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Foydalanuvchilarni Boshqarish</h1>
          <p>Foydalanuvchi hisoblarini va ruxsatlarini boshqaring</p>
        </div>
        <button className="add-btn" onClick={handleAddUser}>
          <Plus size={20} />
          Foydalanuvchi Qo'shish
        </button>
      </div>

      <div className="users-controls">
        <div className="search-box">
          <Search size={20} className="search-icon" />
          <input type="text" placeholder="Foydalanuvchilarni qidirish..." />
        </div>
        <div className="filter-controls">
          <button className="filter-btn">
            <Filter size={16} />
            Filtr
          </button>
          <select className="role-select">
            <option>Barcha Rollar</option>
            <option>Admin</option>
            <option>Sotuvchi</option>
            <option>Xaridor</option>
          </select>
        </div>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" className="checkbox" />
              </th>
              <th>Foydalanuvchi</th>
              <th>Rol</th>
              <th>Aloqa</th>
              <th>Holat</th>
              <th>Qo'shilgan Sana</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="checkbox" className="checkbox" />
              </td>
              <td>
                <div className="user-info">
                  <div className="user-avatar">S</div>
                  <div>
                    <p className="user-name">Sherzod Karimov</p>
                    <span className="user-email">sherzod@example.com</span>
                  </div>
                </div>
              </td>
              <td>
                <span className="role-badge seller">Sotuvchi</span>
              </td>
              <td>
                <div className="contact-info">
                  <div className="contact-item">
                    <Phone size={14} />
                    +998 90 123 45 67
                  </div>
                  <div className="contact-item">
                    <Mail size={14} />
                    sherzod@example.com
                  </div>
                </div>
              </td>
              <td>
                <span className="status-badge active">Faol</span>
              </td>
              <td>15 Yan, 2024</td>
              <td>
                <div className="action-buttons">
                  <button className="action-btn view" onClick={() => handleView("Sherzod Karimov")}>
                    <Eye size={16} />
                  </button>
                  <button className="action-btn edit" onClick={() => handleEdit("Sherzod Karimov")}>
                    <Edit size={16} />
                  </button>
                  <button className="action-btn delete" onClick={() => handleDelete("Sherzod Karimov")}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" className="checkbox" />
              </td>
              <td>
                <div className="user-info">
                  <div className="user-avatar">A</div>
                  <div>
                    <p className="user-name">Ali Nazarov</p>
                    <span className="user-email">ali@example.com</span>
                  </div>
                </div>
              </td>
              <td>
                <span className="role-badge buyer">Xaridor</span>
              </td>
              <td>
                <div className="contact-info">
                  <div className="contact-item">
                    <Phone size={14} />
                    +998 91 765 43 21
                  </div>
                  <div className="contact-item">
                    <Mail size={14} />
                    ali@example.com
                  </div>
                </div>
              </td>
              <td>
                <span className="status-badge active">Faol</span>
              </td>
              <td>03 Fev, 2024</td>
              <td>
                <div className="action-buttons">
                  <button className="action-btn view" onClick={() => handleView("Ali Nazarov")}>
                    <Eye size={16} />
                  </button>
                  <button className="action-btn edit" onClick={() => handleEdit("Ali Nazarov")}>
                    <Edit size={16} />
                  </button>
                  <button className="action-btn delete" onClick={() => handleDelete("Ali Nazarov")}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" className="checkbox" />
              </td>
              <td>
                <div className="user-info">
                  <div className="user-avatar">M</div>
                  <div>
                    <p className="user-name">Malika Tosheva</p>
                    <span className="user-email">malika@example.com</span>
                  </div>
                </div>
              </td>
              <td>
                <span className="role-badge admin">Admin</span>
              </td>
              <td>
                <div className="contact-info">
                  <div className="contact-item">
                    <Phone size={14} />
                    +998 93 456 78 90
                  </div>
                  <div className="contact-item">
                    <Mail size={14} />
                    malika@example.com
                  </div>
                </div>
              </td>
              <td>
                <span className="status-badge inactive">Nofaol</span>
              </td>
              <td>20 Dek, 2023</td>
              <td>
                <div className="action-buttons">
                  <button className="action-btn view" onClick={() => handleView("Malika Tosheva")}>
                    <Eye size={16} />
                  </button>
                  <button className="action-btn edit" onClick={() => handleEdit("Malika Tosheva")}>
                    <Edit size={16} />
                  </button>
                  <button className="action-btn delete" onClick={() => handleDelete("Malika Tosheva")}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <div className="pagination-info">
          47 natijadan 1-3 ko'rsatilmoqda
        </div>
        <div className="pagination-controls">
          <button className="pagination-btn">Oldingi</button>
          <button className="pagination-btn active">1</button>
          <button className="pagination-btn">2</button>
          <button className="pagination-btn">3</button>
          <button className="pagination-btn">Keyingi</button>
        </div>
      </div>
    </div>
  );
}
