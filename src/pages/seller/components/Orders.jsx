// src/components/Orders.jsx
export default function Orders({ orders, setOrders }) {
  const handleConfirm = (id) => {
    setOrders(orders.map(o => o.id === id ? {...o, status: "tasdiqlangan"} : o));
  };

  return (
    <div>
      {orders.map(o => (
        <div key={o.id} style={{border:"1px solid #ccc", margin:"5px", padding:"5px"}}>
          <p>{o.product} - {o.quantity} - {o.status || "kutilmoqda"}</p>
          {o.status !== "tasdiqlangan" && <button onClick={() => handleConfirm(o.id)}>Tasdiqlash</button>}
        </div>
      ))}
    </div>
  );
}
