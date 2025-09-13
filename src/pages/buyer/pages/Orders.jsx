import "../styles/Orders.css";

export default function Orders() {
  return (
    <div className="orders-page">
      <h1>Buyurtmalarim</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Mahsulot</th>
            <th>Miqdor</th>
            <th>Narx</th>
            <th>Holat</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>101</td>
            <td>Olma</td>
            <td>20 kg</td>
            <td>200 000</td>
            <td className="status success">Yakunlandi</td>
          </tr>
          <tr>
            <td>102</td>
            <td>Uzum</td>
            <td>15 kg</td>
            <td>180 000</td>
            <td className="status pending">Kutilmoqda</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
