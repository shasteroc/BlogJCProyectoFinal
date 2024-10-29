import { useEffect, useState } from "react"

export const Results = () => {
  const [locations, setLocations] = useState([])
  useEffect(() => {
    fetch('https://6622071827fcd16fa6c8818c.mockapi.io/api/v1/blogs')
    .then(response => response.json())
    .then(results => setLocations(results))
  }, [])

  return (
    <><nav>
      <ul>
        <a href="./"><img src="public\Logo.png" alt="Logo.png" className="logo" /></a>
        <li><a href="#nosotros">Sobre nosotros</a></li>
        <li><a href="">Contacto</a></li>
        <li><a href="">Destinos</a></li>
      </ul>
    </nav><main className="results">

        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Ubicacion</th>
              <th>Reseña</th>
              <th>Calificación</th>
            </tr>
          </thead>
          <tbody>
            {locations && locations.map(location => {
              return <tr>
                <td>{location.name}</td>
                <td>{location.location}</td>
                <td>{location.review}</td>
                <td>{location.rating}</td>
              </tr>
            })}
          </tbody>
        </table>
      </main></>
  )
}