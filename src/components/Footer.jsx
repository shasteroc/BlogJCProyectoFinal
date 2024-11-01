export const Footer = () => {
    return (
        <footer>
            <div className="footer">
                <h3 id="contactanos">Contactanos:</h3>
                
                <div className="footer-items">
                    <img src="src\assets\whatsapp.png" alt="" className="icon" />
                    <p className="p-footer">+57 323 333 3333</p>
                    <img src="src\assets\correo-electronico.png" alt="" className="icon" />
                    <p className="p-footer">blogtravelgmail.com</p>
                </div>
            </div>

            <div className="footer">
                <h3 id="siguenos">Siguenos:</h3>
                <br />
                <div className="footer-items1">
                <img src="src\assets\facebook.png" alt="" className="icon1" />
                <p className="p-footer">@BlogTravel</p>
                <img src="src\assets\instagram.png" alt="" className="icon1" />
                <p className="p-footer">@BlogTravel</p>
                <img src="src\assets\tik-tok.png" alt="" className="icon1" />
                <p className="p-footer">@BlogTravel</p>
                </div>
            </div>
        </footer>
    )
}