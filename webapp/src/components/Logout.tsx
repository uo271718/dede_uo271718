import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, InputLabel, Select, MenuItem, Stack, SelectChangeEvent } from '@mui/material';
import { Producto } from '../shared/shareddtypes';
import { logout } from "@inrupt/solid-client-authn-browser";

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