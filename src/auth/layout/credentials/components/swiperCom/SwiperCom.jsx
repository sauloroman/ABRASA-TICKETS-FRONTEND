import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import 'swiper/css/autoplay';

import image1 from '../../../../../assets/img/login-1.avif';
import image2 from '../../../../../assets/img/login-2.avif';
import image3 from '../../../../../assets/img/login-3.avif';
import image4 from '../../../../../assets/img/login-4.avif';
import logo from '../../../../../assets/img/favicon.png';

const galleryImages = [
  image1,
  image2,
  image3,
  image4
]

const slideInformation = [
  {
    title: 'Boletos electrónicos',
    text: 'Genera la cantidad de boletos electrónicos necesarios para tu evento y festividad. Compartelos a tus invitados con un solo click.'
  },
  {
    title: 'Registro de asistentes',
    text: 'Evita la inesperada visita de personas ajenas a tu evento. Controla su hora de llegada y el lugar que le corresponde'
  },
  {
    title: 'Ecofriendly',
    text: 'Evita generar papel que terminará como basura. Haz de lo digital una solución sostenible y ambientalmente amigable.'
  },
  {
    title: 'Para cualquier dispositivo',
    text: 'Puedes ingresar desde cualquier dipositivo conectado a internet. Revisa nuestros planes de financiamiento.'
  },
]

export const SwiperCom = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      loop={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      slidesPerView={1}
      spaceBetween={0}
      className="swiper-com"
    >
      {
        galleryImages.map( (galleryImage, i) => (
          <SwiperSlide key={ i }>
            <img
              src={galleryImage}
              className="swiper-com__img"
              alt="Login Image"
              loading="lazy"
            />
            <div className="swiper-com__overflow"></div>
            <div className="swiper-com__content">
              <figure className="swiper-com__figure">
                <img src={logo} alt="Logo Favicon" />
              </figure>
              <h3 className="heading-secondary swiper-com__title text-important">
                { slideInformation[i]?.title }
              </h3>
              <p className="swiper-com__text">
              { slideInformation[i]?.text }
              </p>
            </div>
          </SwiperSlide>
        ))
      }
    </Swiper>
  );
};
