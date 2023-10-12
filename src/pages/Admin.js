import React from 'react';
import Login from '../components/Login';

const Admin = () => {
    const userAuthenticated = true;

    return (
        <>
        {userAuthenticated ? (
                    <div>
                        Holà
                    </div>
                     ) : (
                        <>
                        <Login/>
                        </>
                    )}
            
        </>
        
        
    );
};

export default Admin;