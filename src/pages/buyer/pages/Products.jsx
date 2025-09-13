import { useParams } from "react-router-dom";
import "../styles/Products.css";

export default function Product() {
  const { id } = useParams();

  const products = [
    { id: "1", name: "Olma", price: "10 000 so'm/kg", stock: 500 },
    { id: "2", name: "Uzum", price: "12 000 so'm/kg", stock: 200 },
  ];

  const product = products.find((p) => p.id === id);

  if (!product) return <p>Mahsulot topilmadi</p>;

  return (
    <div className="product-page">
      <h1>Mahsulot Tafsiloti</h1>
      <div className="product-detail">
        <img src="" alt={product.name} />
        <div className="info">
          <h2>{product.name}</h2>
          <p>Narx: {product.price}</p>
          <p>Omborda: {product.stock} kg</p>
          <button className="add-btn">Savatga qo‘shish</button>
        </div>
      </div>
    </div>
  );
}
