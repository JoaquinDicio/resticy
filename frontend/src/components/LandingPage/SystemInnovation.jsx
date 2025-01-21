import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";


import interfazIcon from "../../assets/Icon-1.png"
import adaptableIcon from "../../assets/icon-2.png";
import sencilloIcon from "../../assets/icon-3.png";

const SystemInnovation = () => {
  const features = [
    {
      title: "Sencillo y actual",
      description: "Contamos con una interfaz intuitiva, fácil de usar y moderna.",
      icon: interfazIcon,
    },
    {
      title: "Adaptable",
      description:
        "Al ser una plataforma web, no necesitas hardware especializado.",
      icon: adaptableIcon,
    },
    {
      title: "On-line",
      description:
        "¡No necesitas instalar nada! Accede desde cualquier lugar, en cualquier momento.",
      icon: sencilloIcon,
    },
  ];

  return (
    <section className="bg-white px-10 py-10 min-h-[70vh] flex flex-col justify-center items-center" id="characteristics">
      <div className="max-w-[1000px] w-full" data-aos="fade-up">
        <p className="font-[800] pb-0 md:font-[900] text-3xl md:text-5xl text-center lg:pb-16 text-[--dark-color]">
          Un sistema innovador
        </p>

        {/* Swiper para pantallas pequeñas */}
        <div className="md:hidden">
          <Swiper
            slidesPerView={1}
            spaceBetween={16}
            pagination={{ clickable: true }}
            modules={[Pagination]}
          >
            {features.map((feature, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-lg p-5 flex flex-col text-center justify-center items-center min-h-[350px]">
                  <img src={feature.icon} alt={`icono ${feature.title}`} className="p-5 min-w-[300px] max-w-[300px]
                  min-h-[300px] max-h-[300px] object-contain" />
                  <p className="font-medium text-2xl pb-6">{feature.title}</p>
                  <p className="text-sm min-h-[70px]">{feature.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Diseño en tarjetas para pantallas grandes */}
        <div className="hidden md:flex flex-row justify-center gap-6 max-w-[80vw] mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-5 flex flex-col text-center justify-center items-center md:w-1/3"
            >
              <img src={feature.icon} alt={`icono ${feature.title}`} className="p-5 min-w-[300px] max-w-[300px]
                  min-h-[300px] max-h-[300px] object-contain" />
              <p className="font-medium text-2xl pb-2  pt-3">{feature.title}</p>
              <p className="text-sm pt-3">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SystemInnovation;
