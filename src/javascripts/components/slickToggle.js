/* eslint-disable */
import 'slick-carousel/slick/slick.min.js'
import $ from 'jquery'

export default function slickToggle() {

  console.log("Toggeling slick");

  $('.presta-wrap').slick({
    arrows: false,
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    adaptiveHeight: true,
    dotsClass: 'presta-box-dots',
    responsive: [
      {
        breakpoint: 1175,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          centerMode: true,
          infinite: true,
          slidesToScroll: 3,
          slidesToShow: 1,
          dotsClass: 'presta-box-dots',
          centerPadding: '4em',
        }
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: true,
          centerPadding: '2em',
          slidesToShow: 1
        }
      }
    ]
  });

  $('.testimon-wrap-mobile').slick({
    arrows: false,
    dots: true,
    infinite: true,
    centerPadding: '60px',
    slidesToScroll: 3,
    slidesToShow: 3,
    adaptiveHeight: true,
    dotsClass: 'presta-box-dots',
    speed: 500,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          centerMode: true,
          centerPadding: '10em',
          slidesToShow: 1
        },
      },
      {
        breakpoint: 600,
        settings: {
          centerMode: true,
          centerPadding: '4em',
          slidesToShow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: true,
          centerPadding: '2em',
          slidesToShow: 1
        }
      }
    ]
  });

  $('.blog-wrap').slick({
    arrows: false,
    dots: true,
    infinite: true,
    centerPadding: '60px',
    slidesToScroll: 3,
    slidesToShow: 3,
    adaptiveHeight: true,
    dotsClass: 'presta-box-dots',
    speed: 500,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          centerMode: true,
          centerPadding: '10em',
          slidesToShow: 1
        },
      },
      {
        breakpoint: 600,
        settings: {
          centerMode: true,
          centerPadding: '4em',
          slidesToShow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: true,
          centerPadding: '2em',
          slidesToShow: 1
        }
      }
    ]
  });

}
