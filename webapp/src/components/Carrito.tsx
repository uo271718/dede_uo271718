import { login, handleIncomingRedirect, getDefaultSession } from "@inrupt/solid-client-authn-browser";

function Carrito(): JSX.Element {

  if (!getDefaultSession().info.isLoggedIn) {
    document.location.href = "/login";
  }

  return (
    <main><h2>To be done</h2></main>
  );
}

export default Carrito;