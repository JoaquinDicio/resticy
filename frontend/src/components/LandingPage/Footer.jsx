
const Footer = () => {
  return (
   <>
   <footer className="p-10 lg:max-w-[65vw] mx-auto flex flex-col md:flex-row justify-around">
        <div className="text-white text-sm">
          <p className="font-bold mb-4 text-2xl text-[--yellow-color]">
            Sobre resticy
          </p>
          <nav className="mb-4">
            <ul className="font-lighter">
              <li>
                <a href="#functions">Funcionalidades</a>
              </li>
              <li>
                <a href="#prices">Precios</a>
              </li>
              <li>
                <a href="">Historias de éxito</a>
              </li>
              <li>
                <a href="">Cultura</a>
              </li>
              <li>
                <a href="">Trabaja con nosotros</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="text-white text-sm">
          <p className="font-bold mb-4 text-2xl text-[--yellow-color]">
            Recursos
          </p>
          <nav className="mb-4">
            <ul className="font-lighter">
              <li>
                <a href="">Preguntas frecuentes</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="text-white text-sm">
          <p className="font-bold mb-4 text-2xl text-[--yellow-color]">
            Dónde estamos
          </p>
          <nav className="mb-4">
            <ul className="font-lighter">
              <li>
                <a href="">
                  Argentina <br /> Av Sarmiento 3650
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="text-white text-sm">
          <p className="font-bold mb-4 text-2xl text-[--yellow-color]">
            Contacto
          </p>
          <nav className="mb-4">
            <ul className="font-lighter">
              <li>
                <a href="">(+54) 3513274318</a>
                <i className="text-sm">
                  {" "}
                  <br />L a V de 09:00 am a 01:00 am
                </i>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
   </>
  )
}
export default Footer
