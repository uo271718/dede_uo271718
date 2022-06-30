import { useEffect, useState } from 'react';
import { Box, Button, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { login, handleIncomingRedirect, getDefaultSession } from "@inrupt/solid-client-authn-browser";
import {
    getSolidDataset,
    getThing,
    getStringNoLocale,
    getUrlAll,
    Thing,
} from "@inrupt/solid-client";
import { FOAF, VCARD } from "@inrupt/vocab-common-rdf";
import { Direccion } from '../shared/shareddtypes';

function Login(props: any): JSX.Element {
    const [proveedor, setProveedor] = useState("");

    useEffect(() => {
        loginAndFetch()
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    const seleccionarProveedor = (e: SelectChangeEvent) => {
        setProveedor(e.target.value as string);
    };

    const loginAndFetch = async () => {
        await handleIncomingRedirect();

        if (!getDefaultSession().info.isLoggedIn) {
            await login({
                oidcIssuer: proveedor,
                redirectUrl: window.location.href,
                clientName: "DeDe"
            });
        }
        props.nombre(getStringNoLocale(await getProfile(getDefaultSession().info.webId!), FOAF.name))
        props.direccion(await getDireccion())
    }

    const getProfile = async (webId: string) => {
        let profileDocumentURI = webId.split("#")[0]; // we remove the right hand side of the # for consistency
        let myDataset = await getSolidDataset(profileDocumentURI); // obtain the dataset from the URI
        return getThing(myDataset, webId) as Thing; // we obtain the thing we are looking for from the dataset
    }

    const getDireccion = async () => {
        let address = getUrlAll(await getProfile(getDefaultSession().info.webId!), VCARD.hasAddress)[0];
        let calle = getStringNoLocale(await getProfile(address), VCARD.street_address) as string;
        let ciudad = getStringNoLocale(await getProfile(address), VCARD.locality) as string;
        let region = getStringNoLocale(await getProfile(address), VCARD.region) as string;
        let cp = getStringNoLocale(await getProfile(address), VCARD.postal_code) as string;
        let direccion: Direccion = { calle, ciudad, region, cp };
        return direccion;
    }

    return (
        <main>
            <Box
                component="form"
                onSubmit={loginAndFetch}
                noValidate
                sx={{
                    margin: '2em',
                    width: 'min-content'
                }}
            >
                <InputLabel>
                    Selecciona un proveedor
                </InputLabel>
                <Select
                    value={proveedor}
                    onChange={seleccionarProveedor}
                    sx={{ width: '15em' }}
                >
                    <MenuItem value={"https://solidcommunity.net/"}>
                        SOLID community
                    </MenuItem>
                    <MenuItem value={"https://inrupt.net/"}>Inrupt</MenuItem>
                </Select>

                <Button
                    disabled={proveedor === "" || getDefaultSession().info.isLoggedIn}
                    onClick={loginAndFetch}
                    variant="contained"
                >
                    Log in
                </Button>
            </Box>
        </main>
    );
}

export default Login;