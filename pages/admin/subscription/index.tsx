// pages/products.js
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { AuthGuard } from '@/components'; // Adjust as per your project structure
import { Layout } from '@/layout'; // Adjust as per your project structure
import { createProduct, deleteProduct, fetchProducts, updateProduct } from './methods';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [active, setActive] = useState(false);
    const [amount, setAmount] = useState('0.00'); // Amount in dollars as string
    const [recurring, setRecurring] = useState(false);
    const [billingPeriod, setBillingPeriod] = useState('month');
    const [editingProductId, setEditingProductId] = useState(null); // Track currently editing product ID

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const products = await fetchProducts();
            setProducts(products);
        } catch (error) {
            console.error('Error loading products:', error);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (editingProductId) {
                await updateProduct(editingProductId, {
                    name,
                    description,
                    active,
                    amount: parseFloat(amount) * 100, // Convert dollars to cents
                    recurring,
                    billing_period: billingPeriod,
                });
            } else {
                await createProduct({
                    name,
                    description,
                    active,
                    amount: parseFloat(amount) * 100, // Convert dollars to cents
                    recurring,
                    billing_period: billingPeriod,
                });
            }
            await loadProducts(); // Reload products after adding or updating
            resetForm();
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    const handleEdit = (productId: any) => {
        const productToEdit: any = products.find((product: any) => product.id === productId);
        if (productToEdit) {
            setName(productToEdit.name);
            setDescription(productToEdit.description);
            setActive(productToEdit.active);
            setAmount((parseInt(productToEdit?.metadata?.amount) / 100).toFixed(2));
            setRecurring(productToEdit.metadata.recurring);
            setBillingPeriod(productToEdit.metadata.billing_period);
            setEditingProductId(productId);
        }
    };

    const handleDelete = async (productId: any) => {
        try {
            await deleteProduct(productId);
            await loadProducts(); // Reload products after deletion
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const resetForm = () => {
        setName('');
        setDescription('');
        setActive(false);
        setAmount('0.00');
        setRecurring(false);
        setBillingPeriod('month');
        setEditingProductId(null);
    };

    return (
        <AuthGuard requiredAbility={['manage', 'all']}>
            <Layout>
                <h1 className="mb-4">Manage Subscriptions</h1>

                {/* Add Product Form */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="productName" className="form-label">
                            Subscriptions Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="productName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productDescription" className="form-label">
                            Description
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="productDescription"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productAmount" className="form-label">
                            Amount (USD)
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="productAmount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="activeCheckbox"
                            checked={active}
                            onChange={(e) => setActive(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="activeCheckbox">
                            Active
                        </label>
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="recurringCheckbox"
                            checked={recurring}
                            onChange={(e) => setRecurring(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="recurringCheckbox">
                            Recurring
                        </label>
                    </div>
                    {recurring && (
                        <div className="mb-3">
                            <label htmlFor="billingPeriod" className="form-label">
                                Billing Period
                            </label>
                            <select
                                className="form-select"
                                id="billingPeriod"
                                value={billingPeriod}
                                onChange={(e) => setBillingPeriod(e.target.value)}
                            >
                                <option value="month">Monthly</option>
                                <option value="year">Yearly</option>
                            </select>
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary">
                        {editingProductId ? 'Update Product' : 'Add Product'}
                    </button>
                    {editingProductId && (
                        <button
                            type="button"
                            className="btn btn-secondary ms-2"
                            onClick={() => {
                                resetForm();
                            }}
                        >
                            Cancel Edit
                        </button>
                    )}
                </form>

                {/* Product List */}
                <div className="row mt-4">
                    {products && products?.length > 0 &&
                        products.map((product: any) => (
                            <div key={product.id} className="col-md-4 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">{product.description}</p>
                                        <p className="card-text">
                                            Active: {product.active ? 'Yes' : 'No'}
                                        </p>
                                        <p className="card-text">
                                            Amount: ${(product.amount).toFixed(2)}
                                        </p>
                                        {product.metadata.recurring && (
                                            <p className="card-text">
                                                Recurring: Yes ({product.metadata.billing_period})
                                            </p>
                                        )}
                                        <div className="mt-2">
                                            <button
                                                className="btn btn-primary me-2"
                                                onClick={() => handleEdit(product.id)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(product.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </Layout>
        </AuthGuard>
    );
};

export default ProductsPage;
