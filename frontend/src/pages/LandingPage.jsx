import mackMockup from "../assets/macbook.png";
import iphoneMp from "../assets/iphonemp.png";
import logoGris from "../assets/logotitulo.png";
import interfazIcon from "../assets/icon-1.png";
import sencilloIcon from "../assets/icon-3.png";
import waveDk from "../assets/wave-dk.svg";
import adaptableIcon from "../assets/icon-2.png";
import { useState } from "react";

export default function LandingPage() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <header className="bg-[--wine-color] text-white flex justify-between items-center py-4 px-10 md:px-20 fixed flex w-full flex-wrap">
        <i
          onClick={() => setShowMenu(!showMenu)}
          class="fa-solid fa-bars text-3xl md:hidden text-[--yellow-color]"
        ></i>
        <p>LOGO</p>
        <button className="bg-transparent md:hidden text-[--wine-color] font-bold rounded-sm px-2 py-1"></button>
        <nav
          className={`md:px-10 py-5 md:py-0 md:pt-0 w-[100vw] md:flex-1 md:block ${
            !showMenu && "hidden"
          }`}
        >
          <ul className="flex gap-3 flex-col md:flex-row">
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">Funcionalidades</a>
            </li>
            <li>
              <a href="">Planes</a>
            </li>
          </ul>
        </nav>
        <div className="hidden md:flex gap-3 ">
          <button className="border border-1 border-[--yellow-color] text-white rounded-lg px-4 py-2">
            Iniciar sesión
          </button>
          <button className="bg-[--yellow-color] text-white rounded-lg px-4 py-2">
            Registrarse
          </button>
        </div>
      </header>
      <section
        id="home"
        className="px-12 pt-20 min-h-[60vh] flex justify-center items-center"
      >
        <div className="md:flex justify-between max-w-[1000px] md:mt-20">
          <div>
            <p className="text-white mb-2 font-light text-[.95rem]">
              Software de gestión para restaurantes
            </p>
            <p className="text-4xl md:text-5xl font-[800] md:font-[900] mb-4 text-[--yellow-color]">
              Preocupate sólo por la comida
            </p>
            <p className="text-4xl md:text-5xl font-[800] md:font-[900] text-white">
              <span className="text-[--yellow-color]">Resticy</span> mejora tu
              restaurante
            </p>
            <p className="text-white text-xl mt-5 font-light">
              Impulsa tu negocio desde
              <span className="font-bold"> $20.000 por mes</span>
            </p>
            <button className="bg-[--yellow-color] text-white px-4 py-2 rounded mt-10">
              Registrarse
            </button>
          </div>
          <div className="hidden md:flex px-10 max-w-[600px] justify-center">
            <img
              src="https://img.freepik.com/foto-gratis/vista-lateral-hombre-tableta_23-2148560449.jpg"
              alt="hombre realizando pedido con tablet"
              className="rounded-3xl object-cover"
            />
          </div>
        </div>
      </section>
      <img className="hidden md:block mt-16" src={waveDk} />
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

      <section className="bg-[--marfil-color] min-h-[70vh] pb-14 flex justify-center">
        <div className="lg:flex-row lg:max-w-[1100px] flex flex-col items-center">
          <img
            src={mackMockup}
            className="object-cover h-[40vh] md:h-fit md:w-[500px]"
            alt="mackbook realizando pedido"
          />
          <div className="px-10 mt-10">
            <p className="font-light text-sm my-2">Servicio Eficiente</p>
            <p className="font-[800] md:font-[900] text-3xl md:text-5xl text-[--dark-color]">
              Potencia tus clientes <br />
              <span className="text-[--yellow-color]">Crea experiencias</span>
            </p>
            <div>
              <p className="my-8">
                Administra los pedidos mediante el{" "}
                <strong>panel de gestión</strong>
              </p>
              <ul className="flex pl-4 list-disc flex-col gap-2">
                <li>
                  Pedidos en <strong>tiempo real</strong>
                </li>
                <li>
                  <strong>Detalle</strong> de cada mesa
                </li>
                <li>
                  <strong>Creación de las mesas</strong> que tú quieras
                </li>
                <li>
                  Creación de tus <strong>propios productos</strong>
                </li>
              </ul>
              <button className="rounded-lg bg-[--yellow-color] px-8 py-2 mt-10 font-medium">
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
            className="w-full object-cover md:w-full md:max-w-[300px] md:w-[600px] md:h-fit h-[40vh]"
            alt="Iphone con mercado pago"
          />
          <div className="mt-10 md:px-10">
            <p className="font-light text-sm my-2">Servicio Eficiente</p>
            <p className="font-[800] md:font-[900] text-3xl md:text-5xl text-[--dark-color]">
              Realiza pagos por <br />
              <span className="text-[--yellow-color]">Mercado pago</span>
            </p>
            <p className="pt-8 pb-6 md:text-xl">
              <strong className="text-[--yellow-color]">Resticy </strong>
              permite realizar pagos fácilmente a través de Mercado Pago.
              Brindando
              <strong> comodidad y seguridad</strong> en cada transacción.
            </p>
            <button className="rounded-lg bg-[--yellow-color] font-medium px-4 py-2">
              Ver funcionalidades
            </button>
          </div>
        </div>
      </section>
      <section className="bg-[--marfil-color]  min-h-[70vh] flex items-center md:px-20 py-32">
        <div className="max-w-[1100px] mx-auto lg:flex lg:flex-row-reverse">
          <img
            src={logoGris}
            alt="Logo de resticy"
            className="md:w-[350px] h-fit object-cover px-10"
          />
          <div className="w-full px-10">
            <p className="font-[800] md:font-[900] mt-5 text-3xl md:text-5xl text-[--dark-color]">
              Registra tu restaurante <br className="md:hidden" /> y empieza a
              ser más <span className="text-[--yellow-color]">eficiente</span>
            </p>
            <p className="pt-8 text-sm md:text-xl">
              Comienza a probar nuestro{" "}
              <strong>increíble sistema de gestión </strong>para cualquier
              <strong> tipo de restaurante</strong>.
            </p>
            <p className="text-sm md:text-lg mt-5">
              Sin importar el tamaño, <strong>Resticy </strong>se adapta a ti.
            </p>
            <button className="px-4 text-sm rounded-lg mt-8 py-2 bg-[--yellow-color] font-medium">
              Ver funcionalidades
            </button>
          </div>
        </div>
      </section>
      <section className="bg-[--yellow-color] py-14 px-10">
        <div className="mx-auto w-full max-w-[1100px] md:px-10">
          <p className="font-[800] md:font-[900] text-3xl md:text-5xl text-[--dark-color]">
            Selecciona el{" "}
            <span className="text-[--marfil-color]">plan ideal</span> <br />{" "}
            para tu negocio
          </p>
          <div className="flex mt-5 md:mt-16 gap-5 overflow-x-scroll no-scrollbar">
            <div className="min-w-fit md:min-w-[250px] rounded-3xl bg-[--marfil-color] p-8 pb-10">
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
              <ul className="flex flex-col gap-2 list-disc pl-4 text-sm marker:text-[--yellow-color] mt-5 mb-7">
                <li>Gestión de órdenes básicas</li>
                <li>Reportes diarios de ventas</li>
                <li>Pago integrado con Mercado Pago</li>
                <li>Registro de clientes fidelización</li>
                <li>Soporte técnico vía chat</li>
              </ul>
              <a href="#" className="text-sm font-bold text-blue-400">
                Ver todas las funcionalidades
              </a>
            </div>

            <div className="min-w-fit md:min-w-[250px] rounded-3xl bg-[--marfil-color] p-8 pb-10">
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
              <ul className="flex flex-col gap-2 list-disc pl-4 text-sm marker:text-[--yellow-color] mt-5 mb-7">
                <li>Gestión de órdenes básicas</li>
                <li>Reportes diarios de ventas</li>
                <li>Pago integrado con Mercado Pago</li>
                <li>Registro de clientes fidelización</li>
                <li>Soporte técnico vía chat</li>
              </ul>
              <a href="#" className="text-sm font-bold text-blue-400">
                Ver todas las funcionalidades
              </a>
            </div>

            <div className="min-w-fit md:min-w-[250px] rounded-3xl bg-[--marfil-color] p-8 pb-10">
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
              <ul className="flex flex-col gap-2 list-disc pl-4 text-sm marker:text-[--yellow-color] mt-5 mb-7">
                <li>Gestión de órdenes básicas</li>
                <li>Reportes diarios de ventas</li>
                <li>Pago integrado con Mercado Pago</li>
                <li>Registro de clientes fidelización</li>
                <li>Soporte técnico vía chat</li>
              </ul>
              <a href="#" className="text-sm font-bold text-blue-400">
                Ver todas las funcionalidades
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white px-10 py-16 min-h-[70vh] flex flex-col justify-center items-center">
        <div className="max-w-[1100px]">
          <p className="font-[800] md:font-[900] text-3xl md:text-5xl text-center pb-12 lg:pb-24 text-[--dark-color]">
            Un sistema innovador
          </p>
          <div>
            <div className="flex gap-5 overflow-x-scroll no-scrollbar mx-auto">
              <div className="min-w-fit md:min-w-[200px] flex flex-col items-center justify-center">
                <img src={sencilloIcon} className="object-cover" />
                <p className="font-light text-center text-sm md:text-xl px-5 pt-6">
                  Contamos con una interfaz intuitiva, fácil de usar y moderna.
                </p>
              </div>
              <div className="min-w-fit md:min-w-[200px] flex flex-col items-center justify-center">
                <img src={adaptableIcon} className="object-cover" />
                <p className="font-light text-center text-sm md:text-xl px-5 pt-6">
                  Contamos con una interfaz intuitiva, fácil de usar y moderna.
                </p>
              </div>
              <div className="min-w-fit md:min-w-[200px] flex flex-col items-center justify-center">
                <img src={interfazIcon} className="object-cover" />
                <p className="font-light text-center text-sm md:text-xl px-5 pt-6">
                  Contamos con una interfaz intuitiva, fácil de usar y moderna.
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
                <a href="">Funcionalidades</a>
              </li>
              <li>
                <a href="">Precios</a>
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
                <a href="">(+54) 12341234</a>
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
