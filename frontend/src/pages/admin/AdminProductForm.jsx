import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from './AdminLayout.jsx';
import api from '../../api/api.js';

const emptyForm = {
  name: '',
  description: '',
  price: '',
  discountPrice: '',
  category: 'men',
  subCategory: '',
  sizes: '',
  images: '',
  stock: '',
  featured: false,
};

export default function AdminProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      api.get(`/products/${id}`).then((res) => {
        const p = res.data;
        setForm({
          name: p.name,
          description: p.description,
          price: p.price,
          discountPrice: p.discountPrice || '',
          category: p.category,
          subCategory: p.subCategory || '',
          sizes: p.sizes.join(', '),
          images: p.images.join(', '),
          stock: p.stock,
          featured: p.featured,
        });
        setLoading(false);
      });
    }
  }, [id, isEdit]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      discountPrice: form.discountPrice ? Number(form.discountPrice) : null,
      category: form.category,
      subCategory: form.subCategory,
      sizes: form.sizes.split(',').map((s) => s.trim()).filter(Boolean),
      images: form.images.split(',').map((s) => s.trim()).filter(Boolean),
      stock: Number(form.stock) || 0,
      featured: form.featured,
    };

    if (!payload.name || !payload.price || payload.sizes.length === 0 || payload.images.length === 0) {
      setError('Name, price, at least one size, and at least one image URL are required.');
      return;
    }

    try {
      if (isEdit) {
        await api.put(`/products/${id}`, payload);
      } else {
        await api.post('/products', payload);
      }
      navigate('/admin/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product');
    }
  }

  if (loading) return <AdminLayout><p>Loading...</p></AdminLayout>;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">{isEdit ? 'Edit Product' : 'Add New Product'}</h1>
      <form onSubmit={handleSubmit} className="bg-white  shadow p-6 max-w-2xl space-y-4">
        <input name="name" placeholder="Product Name *" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full border rounded px-3 py-2" rows={3} />

        <div className="grid grid-cols-2 gap-3">
          <input name="price" type="number" placeholder="Price (₹) *" value={form.price} onChange={handleChange} className="border rounded px-3 py-2" />
          <input name="discountPrice" type="number" placeholder="Discount Price (optional)" value={form.discountPrice} onChange={handleChange} className="border rounded px-3 py-2" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <select name="category" value={form.category} onChange={handleChange} className="border rounded px-3 py-2">
            <option value="men">Men</option>
            <option value="kids">Kids</option>
          </select>
          <input name="subCategory" placeholder="Sub-category (e.g. Shirts)" value={form.subCategory} onChange={handleChange} className="border rounded px-3 py-2" />
        </div>

        <input name="sizes" placeholder="Sizes, comma separated (e.g. S, M, L, XL or 5-6Y, 7-8Y) *" value={form.sizes} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        <input name="images" placeholder="Image URLs, comma separated *" value={form.images} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        <input name="stock" type="number" placeholder="Stock quantity" value={form.stock} onChange={handleChange} className="w-full border rounded px-3 py-2" />

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
          Show on homepage as Featured
        </label>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-3">
          <button type="submit" className="bg-berry text-white px-6 py-2  font-semibold">
            {isEdit ? 'Save Changes' : 'Add Product'}
          </button>
          <button type="button" onClick={() => navigate('/admin/products')} className="text-gray-500">
            Cancel
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
