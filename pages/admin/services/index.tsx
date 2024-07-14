// pages/services.tsx
import { useEffect, useState } from 'react';
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
} from 'firebase/firestore';
import { db } from '@/lib';
import { AuthGuard } from '@/components';
import { Layout } from '@/layout';
import axios from 'axios';

interface Service {
    id: string;
    name: string;
    price: number;
    subscription: boolean;
    mileage: number;
    timeAfterEffective: string;
}

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [service, setService] = useState<Partial<Service>>({});
    const [subscriptions, setSubscriptions] = useState<any[]>([]);

    useEffect(() => {
        fetchServices();
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3001/productsall')
            .then((response: any) => response.data)
            .then((data) => setSubscriptions(data.data));
    }, []);


    const fetchServices = async () => {
        const querySnapshot = await getDocs(collection(db, 'services'));
        const servicesData: Service[] = [];
        querySnapshot.forEach((doc) => {
            servicesData.push({ ...doc.data(), id: doc.id } as Service);
        });
        setServices(servicesData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setService((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const addService = async () => {
        await addDoc(collection(db, 'services'), service);
        fetchServices();
        setService({});
    };

    const updateService = async (id: string) => {
        const serviceDoc = doc(db, 'services', id);
        await updateDoc(serviceDoc, service);
        fetchServices();
        setService({});
    };

    const deleteService = async (id: string) => {
        await deleteDoc(doc(db, 'services', id));
        fetchServices();
    };

    return (
        <AuthGuard requiredAbility={['manage', 'all']}>
            <Layout>
                <div className="container">
                    <h1 className="my-4">Services</h1>
                    <div className="mb-4">
                        <div className="row d-flex flex-column gap-3">
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Service Name"
                                    name="name"
                                    value={service.name || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Price"
                                    name="price"
                                    value={service.price || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="subscription"
                                    checked={service.subscription || false}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label">Subscription</label>
                            </div>
                            <div className="col">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Mileage"
                                    name="mileage"
                                    value={service.mileage || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Time After Effective Months"
                                    name="timeAfterEffective"
                                    value={service.timeAfterEffective || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col">
                                <button className="btn btn-primary w-100" onClick={addService}>
                                    Add Service
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {services.map((srv) => (
                            <div key={srv.id} className="col-sm-12 col-md-6 col-lg-4 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{srv.name}</h5>
                                        <p className="card-text">Price: {srv.price}</p>
                                        <p className="card-text">
                                            Subscription: {srv.subscription ? 'Yes' : 'No'}
                                        </p>
                                        <p className="card-text">Mileage: {srv.mileage}</p>
                                        <p className="card-text">
                                            Time After Effective: {srv.timeAfterEffective}
                                        </p>
                                        <button
                                            className="btn btn-warning mr-2"
                                            onClick={() => updateService(srv.id)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => deleteService(srv.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Layout>
        </AuthGuard>
    );
}
