export const NavbarLogin = () => {

    const user = "https://6622071827fcd16fa6c8818c.mockapi.io/api/v1/users";

    return (
        <header>
          <nav className="nav">
            <ul>
                <li ><a href="#home"><img src="dist\Logo.png" alt="Logo de Travel" className="logo" /></a></li>
                <li className="welcome li"><a href="#travel">Bienvenido a Travel{user.name}</a></li>
                <button className="buttonnav">cerrar sesion</button>
            </ul>
          </nav>
        </header>
    )
};