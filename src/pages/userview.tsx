"use client"

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';


const UpdateUser: React.FC = () => {

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [mobile, setMobile] = useState('');
    const [signature, setSignature] = useState('');

    const router = useRouter();
    const { id } = router.query

    const users = useSelector((state: any) => state.users);
    const user = users.find((user: any) => user.id === Number(id));

    useEffect(() => {
        if (user) {
            setName(user.name);
            setDate(user.date);
            setMobile(user.mobile);
            setSignature(user.signature);
        }
    }, [user])


    return (
        <div className="max-w-md mx-auto my-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signature">
                        Signature
                    </label>
                    <div className='border border-gray-600 rounded-xl'>
                        <img
                            src={signature}
                            alt="signature"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="name">
                        Name
                    </label>
                    <h2 className='text-black'>{name}</h2>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                        Date collected
                    </label>
                    <h2 className='text-black'>{date}</h2>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">
                        Mobile
                    </label>
                    <h2 className='text-black'>{mobile}</h2>
                </div>

                <div className="flex items-center justify-end">
                    <Link href={'/'}>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Back
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;
