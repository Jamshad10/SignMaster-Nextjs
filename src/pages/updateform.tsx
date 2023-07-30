"use client"

import React, { useEffect, useState } from 'react';
import SignatureCanvas from '@/components/SignatureCanva';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '@/redux/actions';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { toast } from 'react-toastify';


const UpdateUser: React.FC = () => {

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [mobile, setMobile] = useState('');
    const [signature, setSignature] = useState('');

    const router = useRouter();
    const { id } = router.query

    const users = useSelector((state: any) => state.users);
    const user = users.find((user: any) => user.id === Number(id));

    const dispatch: any = useDispatch();

    useEffect(() => {
        if (user) {
            setName(user.name);
            setDate(user.date);
            setMobile(user.mobile);
            setSignature(user.signature);
        }
    }, [user])


    const handleSignatureSave = (signature: string) => {
        setSignature(signature);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedUser = { name, date, mobile, signature };
        dispatch(updateUser(Number(id), updatedUser));
        router.push('/');
        toast.success('Signature updated successfully')
    };

    return (
        <form className="max-w-md mx-auto my-8 bg-white p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Id
                </label>
                <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="id"
                    id="id"
                    value={id}
                    disabled={true}
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name
                </label>
                <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                    Date collected
                </label>
                <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="date"
                    name="date"
                    id="date"
                    placeholder="Enter date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">
                    Mobile
                </label>
                <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="mobile"
                    id="mobile"
                    placeholder="Enter your Mobile"
                    value={mobile}
                    onChange={e => setMobile(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signature">
                    Signature
                </label>
                <SignatureCanvas onSave={handleSignatureSave} initialValue={signature} />
            </div>
            <div className="flex items-center justify-end">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Update
                </button>
                <Link href={'/'}>
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                    >
                        Back
                    </button>
                </Link>
            </div>
        </form>
    );
};

export default UpdateUser;
