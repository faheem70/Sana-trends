import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout.jsx';
import api from '../../api/api.js';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  function loadProducts() {
    setLoading(true);
    api.get('/products').then((res) => setProducts(res.data)).finally(() => setLoading(false));
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm('Delete this product?')) return;
    await api.delete(`/products/${id}`);
    loadProducts();
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link to="/admin/products/new" className="bg-berry text-white px-4 py-2  font-semibold">
          + Add Product
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white  shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((p) => (
                <tr key={p._id}>
                  <td className="p-3">
                    <img src={p.images?.[0]} alt="" className="w-10 h-10 object-cover rounded" />
                  </td>
                  <td className="p-3">{p.name}</td>
                  <td className="p-3 capitalize">{p.category}</td>
                  <td className="p-3">₹{p.discountPrice || p.price}</td>
                  <td className="p-3">{p.stock}</td>
                  <td className="p-3 space-x-3">
                    <Link to={`/admin/products/${p._id}/edit`} className="text-blue-600 hover:underline">Edit</Link>
                    <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && <p className="p-6 text-center text-gray-500">No products yet.</p>}
        </div>
      )}
    </AdminLayout>
  );
}
