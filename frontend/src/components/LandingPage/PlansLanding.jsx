import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import {Pagination } from 'swiper/modules';

const PricingPlans = () => {
  const plans = [
    {
      title: "Plan inicial",
      price: "$20.000",
      period: "/mes",
      description: "Ideal para pequeños restaurantes que recién comienzan.",
      features: [
        "Gestión de órdenes básicas.",
        "Reportes diarios de ventas.",
        "Pago integrado con Mercado Pago.",
        "Registro de clientes fidelización.",
        "Soporte técnico vía chat.",
      ],
      linkText: "Ver todas las funcionalidades",
    },
    {
      title: "Plan Profesional",
      price: "$35.000",
      period: "/mes",
      description:
        "Diseñado para restaurantes en crecimiento que buscan optimizar procesos.",
      features: [
        "Estadísticas avanzadas de desempeño.",
        "Configuración de menús digitales.",
        "Integración con plataformas de delivery.",
        "Gestión de roles y permisos para el personal.",
        "Soporte técnico prioritario.",
      ],
      linkText: "Ver todas las funcionalidades",
    },
    {
      title: "Plan Premium",
      price: "$42.000",
      period: "/mes",
      description:
        "Perfecto para grandes restaurantes que necesitan herramientas completas.",
      features: [
        "Automatización de inventarios y stock.",
        "Gestión de múltiples sucursales.",
        "Tramas personalizadas para diseño.",
        "Demostraciones y capacitación al equipo.",
        "Integración con sistemas contables.",
      ],
      linkText: "Ver todas las funcionalidades",
    },
  ];

  return (
    <div className="bg-yellow-400 pt-10 pb-5 md:pb-10 " id="plans">
      <div className=" m-auto max-w-[80vw] lg:max-w-[1020px]" data-aos="fade-up">
      <h2 className=" pb-8 m-auto font-[800] pb-0 md:font-[900] text-3xl md:text-5xl text-start text-[--dark-color]">
          Planes
      </h2>
      <div className="md:hidden">
      <Swiper
          slidesPerView={1}
          spaceBetween={16}
          pagination={{ clickable: true }}
          modules={[Pagination]}
        >
          {plans.map((plan, index) => (
            <SwiperSlide key={index}>
              <div
              key={index}
              className="bg-white rounded-lg shadow-lg px-5 flex flex-col p-5 justify-between min-h-[470px] md:w-1/3"
            >
              <div>
                  <div className="flex gap-3 items-center">
                    <a href="#">
                      <input type="radio" name="group-1"/>
                    </a>
                    <h2 className="text-xl font-bold">{plan.title}</h2>
                  </div>
                  <p className="text-4xl font-bold text-black mt-4">
                    {plan.price} <span className="text-lg">{plan.period}</span>
                  </p>
                  <p className="text-gray-700 mt-4 text-md">{plan.description}</p>
                  <ul className="list-inside text-gray-600 mt-4 text-sm">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="mt-2 text-indent">
                          <div className="flex">
                          <span className="pr-2">•</span>
                          {feature}
                          </div>
                      </li>
                    ))}
                  </ul>
                </div>
              <a href="#" className="text-blue-500 mt-6 font-medium underline">
                {plan.linkText}
              </a>
            </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      {/* Diseño en tarjetas para pantallas grandes */}

      <div className="hidden md:flex flex-row justify-center gap-6 justify-center mx-auto">
        {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between  md:w-1/3"
            >
              <div>
                  <div className="flex gap-3 items-center">
                    <a href="#">
                      <input type="radio" name="group-1"/>
                    </a>
                    <h2 className="text-xl font-bold">{plan.title}</h2>
                  </div>
                  <p className="text-4xl font-bold text-black mt-4">
                    {plan.price} <span className="text-lg">{plan.period}</span>
                  </p>
                  <p className="text-gray-700 mt-4 text-md">{plan.description}</p>
                  <ul className="list-inside text-gray-600 mt-4 text-sm">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="mt-2 text-indent">
                          <div className="flex">
                          <span className="pr-2">•</span>
                          {feature}
                          </div>
                      </li>
                    ))}
                  </ul>
                </div>
              <a href="#" className="text-blue-500 mt-6 font-medium underline">
                {plan.linkText}
              </a>
            </div>
          ))}
      </div>
    </div>
      </div>
      
  );
};

export default PricingPlans;
