import { useEffect, useState } from 'react';

function Logout( props : any): JSX.Element {

    const cerrarSesion = () => {
        props.nombre('');
        document.location.href = "/";
    };

    useEffect(() => {
        cerrarSesion();
      }, []);

    return (
        <></>
    )
}

export default Logout;