import { useEffect } from 'react';

function Logout( props : any): JSX.Element {

    useEffect(() => {
        const cerrarSesion = () => {
            props.nombre('');
            document.location.href = "/";
        };
        cerrarSesion();
      }, []);

    return (
        <></>
    )
}

export default Logout;