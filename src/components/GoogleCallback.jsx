'use client';

import React, { useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'next/navigation';
import { useAuth } from './AuthContext';

const GoogleCallback = () => {
    const { googleLogin } = useAuth();
    const navigate = useNavigate();
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');

        if (token) {
            googleLogin(token);
            navigate('/');
        } else {
            navigate('/login');
        }
    }, [googleLogin, navigate, searchParams]);

    return <div>Cargando...</div>;
};

export default GoogleCallback;