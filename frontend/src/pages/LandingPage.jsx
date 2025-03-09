import mackMockup from "../assets/macbook.png";
import iphoneMp from "../assets/iphonemp.png";
import logoGris from "../assets/logotitulo.png";

import waveDk from "../assets/wave-dk.svg";

import imageLanding from "../assets/imagen-landing.jpg";
import HeaderLanding from "../components/LandingPage/HeaderLanding";
import Footer from "../components/LandingPage/Footer";
import ButtonLink from "../components/LandingPage/ButtonLink";
import PlansLanding from "../components/LandingPage/PlansLanding";
import SystemInnovation from "../components/LandingPage/SystemInnovation";

export default function LandingPage() {
  return (
    <>
      <HeaderLanding />

      <section
        id="home"
        className="bg-cover pt-20 min-h-[50vh] flex flex-col justify-center items-center bg-no-repeat z-50 md:px-0 bg-red-200 banner1"
      >
        <div
          className="md:flex px-12 lg:px-20 justify-between max-w-[1200px] md:mt-20"
          data-aos="fade-right"
        >
          <div>
            <p className="text-white mb-2 font-light text-[1.0rem] md:text-[1.1rem]">
              Software de gestión para restaurantes
            </p>
            <p className="text-3xl md:text-3xl xl:text-5xl font-[800] md:font-[900] mb-4 text-[--yellow-color]">
              Preocupate sólo por la comida
            </p>
            <p className="text-3xl md:text-3xl xl:text-5xl font-[800] md:font-[900] text-white">
              <span className="text-[--yellow-color]">Resticy</span> mejora{" "}
              <br /> tu restaurante
            </p>
            <p className="text-white text-xl mt-5 font-light mb-5">
              Impulsa tu negocio
              <br />
              <span className="font-bold">desde $20.000 por mes</span>
            </p>
            <ButtonLink
              link={"/register"}
              text={"Registrarse"}
              width={"px-8"}
            />
          </div>
          <div
            className="hidden lg:flex px-10 max-w-[600px] justify-center"
            data-aos="fade-left"
          >
            <img
              src={imageLanding}
              alt="hombre realizando pedido con tablet"
              className="rounded-3xl object-cover"
            />
          </div>
        </div>
        <img className="hidden md:block w-full" src={waveDk} />
        <svg
          className="md:hidden"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1420 300"
        >
          <path
            fill="#fffff0"
            fillOpacity="1"
            d="M0,128L80,149.3C160,171,320,213,480,229.3C640,245,800,235,960,202.7C1120,171,1280,117,1360,90.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </section>

      <section
        id="functions"
        className="bg-[--marfil-color] min-h-[75vh] w-full  pb-14 flex justify-center"
      >
        <div
          className="lg:flex-row lg:max-w-[1200px] w-full flex flex-col items-center"
          data-aos="fade-up"
        >
          <img
            src={mackMockup}
            className="object-cover h-[40vh] md:h-fit md:w-[600px]"
            alt="mackbook realizando pedido"
          />
          <div className="w-full px-10 mt-10">
            <p className="font-light text-[1.10rem] my-2">Servicio Eficiente</p>
            <p className="font-[800] md:font-[900] text-3xl md:text-5xl text-[--dark-color]">
              Potencia tus clientes <br />
              <span className="text-[--yellow-color]">Crea experiencias</span>
            </p>
            <div>
              <p className="my-8 md:text-xl">
                Administra los pedidos mediante el{" "}
                <strong>panel de gestión.</strong>
              </p>

              <ul className="flex pl-4 list-disc flex-col gap-2 md:text-xl mb-10">
                <li>
                  Pedidos en <strong>tiempo real.</strong>
                </li>
                <li>
                  <strong>Detalle</strong> de cada mesa.
                </li>
                <li>
                  <strong>Creación de las mesas</strong> que tú quieras.
                </li>
                <li>
                  Creación de tus <strong>propios productos.</strong>
                </li>
              </ul>

              <ButtonLink link={"#"} text={"Ver más"} width={"px-8"} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white pt-10 min-h-[70vh] pb-14 flex items-center justify-center">
        <div
          className="flex items-center flex-col px-10 md:flex-row max-w-[1100px]"
          data-aos="fade-up"
        >
          <img
            src={iphoneMp}
            className="w-fit object-cover h-[400px] md:w-full md:max-w-[300px] md:w-[600px] md:h-fit"
            alt="Iphone con mercado pago"
          />
          <div className="mt-10 md:px-10">
            <div className="pb-10">
              <p className="font-light text-[1.10rem] my-2">
                Servicio Eficiente
              </p>
              <p className="font-[800] md:font-[900] text-3xl md:text-5xl text-[--dark-color]">
                Realiza pagos <br /> por
                <span className="text-[--yellow-color]"> Mercado pago</span>
              </p>
              <p className="pt-8 md:text-xl">
                <strong className="text-[--yellow-color]">Resticy </strong>
                permite realizar pagos fácilmente a través de Mercado pago.
                Brindando
                <strong> comodidad y seguridad</strong> en cada transacción.
              </p>
            </div>

            <ButtonLink
              link={"#"}
              text={"Ver funcionalidades"}
              width={"px-8"}
            />
          </div>
        </div>
      </section>

      <section className="bg-[--marfil-color] min-h-[70vh] flex items-center md:px-20 py-32 banner2">
        <div
          className="max-w-[1100px] mx-auto lg:flex lg:flex-row-reverse flex flex-col items-center"
          data-aos="fade-up"
        >
          <img
            src={logoGris}
            alt="Logo de resticy"
            className="md:w-[350px] h-fit object-cover px-10"
          />

          <div className="w-full px-10">
            <div className="mb-10">
              <p className="font-[800] md:font-[900] mt-5 text-3xl md:text-5xl text-[--dark-color]">
                Registra tu restaurante <br /> y empieza a ser más{" "}
                <span className="text-[--yellow-color]">eficiente</span>
              </p>
              <p className="pt-8 text-sm md:text-xl">
                Comienza a probar nuestro{" "}
                <strong>increíble sistema de gestión </strong>para cualquier
                <strong> tipo de restaurante</strong>.
              </p>
              <p className="text-sm md:text-lg mt-5">
                Sin importar el tamaño, <strong>Resticy </strong>se adapta a ti.
              </p>
            </div>

            <ButtonLink
              link={"#"}
              text={"Ver funcionalidades"}
              width={"px-8"}
            />
          </div>
        </div>
      </section>

      <PlansLanding />

      <SystemInnovation />

      <Footer />
    </>
  );
}
