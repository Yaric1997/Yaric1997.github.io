/*const slider = tns({
  container: '.carousel__inner',
  items: 1,
  slideBy: 'page',
  autoplay: false,
  controls: false,
  nav: false
});*/
document.querySelector('.prev').addEventListener('click', function () {
  slider.goTo ('prev');
});

document.querySelector('.next').addEventListener('click', function () {
  slider.goTo ('next');
});
$(document).ready(function() {
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });


  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    });
  };

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  //Modal

//1)По кліку на кнопку показувати модальні вікна
$('[data-modal=consultation]').on('click', function () {
  $('.overlay, #consultation').fadeIn('slow');
});
//2)По кліку на хрестик закривати модальні вікна
$('.modal__close').on('click', function () {
  $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
});
//3)Перебирає кожну карточку
$('.button_mini').each(function (i) {
  $(this).on('click', function () {
    $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
    $('.overlay, #order').fadeIn('slow');
  });
});
//4)По кліку на кнопку яка є в карточці заміщає текст який є підзаголовком

  //Валідація
  function valideForms(form) {
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: "Будь ласка введіть своє ім'я",
        phone: "Будь ласка введіть свій номер телефон",
        email: {
          required: "Будь ласка введіть свою почту",
          email: "Неправильно введений адрес пошти name@domain.com"
        }
      }
    });
  }

  valideForms('#consultation-form');
  valideForms('#consultation form');
  valideForms('#order form');

  //Маска вводу

  $('input[name=phone]').mask("+7 (999) 999-99-99");

  //відправка а пошту

  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');

      $('form').trigger('reset');
    });
    return false;
  });
});


