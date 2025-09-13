import { useState } from 'react';
import { Trash2, ShieldAlert } from 'lucide-react';
import { useAppContext } from '../../../contexts/AppContext';
import { api } from '../../../services/api';

export default function Settings() {
  const { actions } = useAppContext();
  const [deleting, setDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    if (!confirm('Hisobingizni butunlay o\'chirishni xohlaysizmi? Bu amalni qaytarib bo\'lmaydi.')) return;
    if (!confirm('Tasdiqlang: barcha ma\'lumotlaringiz (buyurtmalar, mahsulotlar) o\'chiriladi. Davom etamizmi?')) return;

    try {
      setDeleting(true);
      await api.users.deleteMe();
      actions.logout();
    } catch (e) {
      actions.addNotification(e.message || 'Hisobni o\'chirishda xatolik', 'error');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <h2>Sozlamalar</h2>

      <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 8, background: '#fff7f7' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ShieldAlert size={18} color="#b91c1c" /> Xavfsiz amallar
        </h3>
        <p style={{ color: '#7f1d1d' }}>
          Profilni o\'chirish barcha bog\'liq ma\'lumotlarni (sotuvchi bo\'lsangiz mahsulotlar va buyurtmalar, haridor bo\'lsangiz buyurtmalar) bilan birga o\'chiradi.
        </p>
        <button
          onClick={handleDeleteAccount}
          disabled={deleting}
          style={{ background:'#dc2626', color:'#fff', border:'none', padding:'10px 14px', borderRadius:6, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:8 }}
        >
          <Trash2 size={18} /> {deleting ? 'O\'chirilmoqda...' : 'Profilni o\'chirish'}
        </button>
      </div>
    </div>
  );
}

