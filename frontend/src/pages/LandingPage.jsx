import mackMockup from "../assets/Macbook.png";
import iphoneMp from "../assets/iphonemp.png";
import logoGris from "../assets/logotitulo.png";
import interfazIcon from "../assets/icon-1.png";
import sencilloIcon from "../assets/icon-3.png";
import waveDk from "../assets/wave-dk.svg";
import adaptableIcon from "../assets/icon-2.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/favicon.png";
import imageLanding from "../assets/imagen-landing.jpg";
export default function LandingPage() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <header className="bg-[--wine-color] z-20 text-white flex justify-between items-center py-4 px-10 md:px-20 fixed flex w-full flex-wrap">
        <i
          onClick={() => setShowMenu(!showMenu)}
          class="fa-solid fa-bars text-3xl md:hidden text-[--yellow-color]"
        ></i>
        <img
          className="w-[50px] h-[50px] lg:w-[90px] lg:h-[90px] "
          src={logo}
          alt="Logo Resticy"
        />
        <button className="bg-transparent md:hidden text-[--wine-color] font-bold rounded-sm px-2 py-1"></button>
        <nav
          className={`md: py-5 md:py-0 md:pt-0 w-[100vw] md:flex-1 md:block ${
            !showMenu && "hidden"
          }`}
        >
          <ul className="flex gap-3 flex-col md:flex-row">
            <li>
              <a href="#home">Funcionalidades</a>
            </li>
            <li>
              <a href="#functions">Precios</a>
            </li>
            <li>
              <a href="#plans">Historias de éxito</a>
            </li>
          </ul>
        </nav>
        <div className="hidden md:flex gap-3 ">
          <Link
            to="/login"
            className="border border-1 border-[--yellow-color] text-white rounded px-4 py-2"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/register"
            className="bg-[--yellow-color] text-white rounded px-4 py-2"
          >
            Registrarse
          </Link>
        </div>
      </header>
      <section
        id="home"
        className="bg-cover pt-20 min-h-[50vh] flex flex-col justify-center items-center bg-no-repeat z-50 md:px-0 bg-red-200 banner1"
      >
        <div className=" md:flex px-12 md:px-10 lg:px-0 justify-between max-w-[1000px] md:mt-20">
          <div>
            <p className="text-white mb-2 font-light text-[1.10rem]">
              Software de gestión para restaurantes
            </p>
            <p className="text-4xl md:text-3xl xl:text-5xl font-[800] md:font-[900] mb-4 text-[--yellow-color]">
              Preocupate sólo por la comida
            </p>
            <p className="text-4xl md:text-3xl xl:text-5xl font-[800] md:font-[900] text-white">
              <span className="text-[--yellow-color]">Resticy</span> mejora tu
              restaurante
            </p>
            <p className="text-white text-xl mt-5 font-light">
              Impulsa tu negocio desde
              <br />
              <span className="font-bold"> $20.000 por mes</span>
            </p>
            <button className="bg-[--yellow-color] text-white px-4 py-2 rounded mt-10">
              Registrarse
            </button>
          </div>
          <div className="hidden md:flex pl-5 md:max-w-[400px] xl:max-w-[600px] justify-center">
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
            fill-opacity="1"
            d="M0,128L80,149.3C160,171,320,213,480,229.3C640,245,800,235,960,202.7C1120,171,1280,117,1360,90.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </section>

      <section
        id="functions"
        className="bg-[--marfil-color] min-h-[75vh]  pb-14 flex justify-center"
      >
        <div className="lg:flex-row lg:max-w-[1200px] flex flex-col items-center">
          <img
            src={mackMockup}
            className="object-cover h-[40vh] md:h-fit md:w-[600px]"
            alt="mackbook realizando pedido"
          />
          <div className="px-10 mt-10">
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
              <ul className="flex pl-4 list-disc flex-col gap-2 md:text-xl">
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
              <button className="rounded bg-[--yellow-color] px-8 py-2 mt-10 font-medium">
                Ver más
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white pt-10 min-h-[70vh] pb-14 flex items-center justify-center">
        <div className="flex items-center flex-col px-10 md:flex-row max-w-[1100px]">
          <img
            src={iphoneMp}
            className="w-fit object-cover h-[400px] md:w-full md:max-w-[300px] md:w-[600px] md:h-fit"
            alt="Iphone con mercado pago"
          />
          <div className="mt-10 md:px-10">
            <p className="font-light text-[1.10rem] my-2">Servicio Eficiente</p>
            <p className="font-[800] md:font-[900] text-3xl md:text-5xl text-[--dark-color]">
              Realiza pagos por <br />
              <span className="text-[--yellow-color]">Mercado pago</span>
            </p>
            <p className="pt-8 pb-6 md:text-xl">
              <strong className="text-[--yellow-color]">Resticy </strong>
              permite realizar pagos fácilmente a través de Mercado pago.
              Brindando
              <strong> comodidad y seguridad</strong> en cada transacción.
            </p>
            <button className="rounded bg-[--yellow-color] font-medium px-4 py-2">
              Ver funcionalidades
            </button>
          </div>
        </div>
      </section>
      <section className="bg-[--marfil-color]  min-h-[70vh] flex items-center md:px-20 py-32 banner2">
        <div className="max-w-[1100px] mx-auto lg:flex lg:flex-row-reverse flex flex-col md:bg- md:flex-row-reverse items-center">
          <img
            src={logoGris}
            alt="Logo de resticy"
            className="md:w-[350px] h-fit object-cover px-10"
          />
          <div className="w-full px-10">
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
            <button className="rounded bg-[--yellow-color] font-medium px-4 py-2 mt-6">
              Ver funcionalidades
            </button>
          </div>
        </div>
      </section>
      <section id="plans" className="bg-[--yellow-color] py-14 px-10">
        <div className="mx-auto w-full max-w-[1100px] md:px-10">
          <p className="font-[800] md:font-[900] text-3xl md:text-5xl text-[--dark-color]">
            Selecciona el{" "}
            <span className="text-[--marfil-color]">plan ideal</span> <br />{" "}
            para tu negocio
          </p>
          <div className="flex mt-5 md:mt-16 gap-5 overflow-x-scroll no-scrollbar">
            <div className="min-w-fit md:min-w-[250px] relative rounded-3xl bg-[--marfil-color] md:w-[100%] p-8 pb-10">
              <div className="flex justify-between">
                <p className="font-bold text-xl mb-2">Plan inicial</p>
                <div className="rounded-full w-[35px] flex items-center justify-center h-[35px] border border-2 border-black">
                  <div className="rounded-full w-[20px] h-[20px] bg-[--yellow-color]"></div>
                </div>
              </div>
              <p>
                <strong className="text-3xl">$20.000</strong>
                <span className="text-sm"> /mes</span>
              </p>
              <p className="mt-3 text-sm">
                Ideal para pequeños restaurantes que recién comienzan.
              </p>
              <ul className="flex flex-col gap-2 list-disc pl-4 text-sm marker:text-[--yellow-color] mt-5 mb-7 ">
                <li>Gestión de órdenes básicas.</li>
                <li>Reportes diarios de ventas.</li>
                <li>Pago integrado con Mercado pago.</li>
                <li>Registro de clientes fidelización.</li>
                <li>Soporte técnico vía chat.</li>
              </ul>
              <a
                href="#"
                className="text-sm font-bold text-blue-400 absolute bottom-5"
              >
                Ver todas las funcionalidades
              </a>
            </div>

            <div className="min-w-fit md:min-w-[250px] relative rounded-3xl bg-[--marfil-color] md:w-[100%] p-8 pb-10">
              <div className="flex justify-between">
                <p className="font-bold text-xl mb-2">Plan Profesional</p>
                <div className="rounded-full w-[35px] flex items-center justify-center h-[35px] border border-2 border-black">
                  <div className="rounded-full w-[20px] h-[20px] bg-[--yellow-color]"></div>
                </div>
              </div>
              <p>
                <strong className="text-3xl">$35.000</strong>
                <span className="text-sm"> /mes</span>
              </p>
              <p className="mt-3 text-sm">
                Diseñado para restaurantes en crecimiento que buscan optimizar
                procesos.
              </p>
              <ul className="flex flex-col gap-2 list-disc pl-4 text-sm marker:text-[--yellow-color] mt-5 mb-7">
                <li>Estadísticas avanzadas de desempeño.</li>
                <li>Configuración de menús digitales.</li>
                <li>Integración con plataformas de delivery.</li>
                <li>Gestión de roles y permisos para el personal.</li>
                <li>Soporte técnico prioritario.</li>
              </ul>
              <a
                href="#"
                className="text-sm font-bold text-blue-400 absolute bottom-5"
              >
                Ver todas las funcionalidades
              </a>
            </div>

            <div className="min-w-fit md:min-w-[250px] relative rounded-3xl bg-[--marfil-color] md:w-[100%] p-8 pb-10">
              <div className="flex justify-between">
                <p className="font-bold text-xl mb-2">Plan Premium</p>
                <div className="rounded-full w-[35px] flex items-center justify-center h-[35px] border border-2 border-black">
                  <div className="rounded-full w-[20px] h-[20px] bg-[--yellow-color]"></div>
                </div>
              </div>
              <p>
                <strong className="text-3xl">$42.000</strong>
                <span className="text-sm"> /mes</span>
              </p>
              <p className="mt-3 text-sm">
                Perfecto para grandes restaurantes que necesitan herramientas
                completas.
              </p>
              <ul className="flex flex-col gap-2 list-disc pl-4 text-sm marker:text-[--yellow-color] mt-5 mb-7">
                <li>Automatización de inventarios y stock.</li>
                <li>Gestión de múltiples sucursales.</li>
                <li>Tramas personalizadas para diseño.</li>
                <li>Demostraciones y capacitación al equipo.</li>
                <li>Integración con sistemas contables.</li>
              </ul>
              <a
                href="#"
                className="text-sm font-bold text-blue-400 absolute bottom-5"
              >
                Ver todas las funcionalidades
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white px-10 py-16 min-h-[70vh] flex flex-col justify-center items-center">
        <div className="max-w-[1100px">
          <p className="font-[800] md:font-[900] text-3xl md:text-5xl text-center lg:pb-10 text-[--dark-color]">
            Un sistema innovador
          </p>
          <div>
            <div className="flex gap-5 overflow-x-scroll max-w-[99vw] md:max-w-[100vw] no-scrollbar mx-auto bg-red-200]">
              <div className="min-w-[100vw] md:min-w-[250px] md:max-w-[350px] p-10 flex-1 flex flex-col text-center justify-center items-center">
                <img src={sencilloIcon} alt="icono sencillo" className="p-5" />
                <p className="font-medium text-2xl pb-2">Sencillo y actual</p>
                <p className="text-sm">
                  Contamos con una interfaz intuitiva, fácil de usar y moderna.
                </p>
              </div>
              <div className="min-w-[100vw] md:min-w-[250px] md:max-w-[350px] p-10 flex-1 flex flex-col text-center justify-center items-center">
                <img src={sencilloIcon} alt="icono sencillo" className="p-5" />
                <p className="font-medium text-2xl pb-2">Adaptable</p>
                <p className="text-sm">
                  Al ser una plataforma web, no necesitas hardware
                  especializado.
                </p>
              </div>
              <div className="min-w-[100vw] md:min-w-[250px] md:max-w-[350px] p-10 flex-1 flex flex-col text-center justify-center items-center">
                <img src={sencilloIcon} alt="icono sencillo" className="p-5" />
                <p className="font-medium text-2xl pb-2">On-line</p>
                <p className="text-sm">
                  ¡No necesitas instalar nada! <br /> Accede desde cualquier
                  lugar, <br /> en cualquier momento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="p-10 max-w-[1100px] mx-auto flex flex-col md:flex-row justify-around">
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
  );
}
