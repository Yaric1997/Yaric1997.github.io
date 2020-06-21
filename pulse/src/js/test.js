//1)По кліку на кнопку показувати модальні вікна
$('[data-modal=consultation]').on('click', function () {
  $('.overlay, #consultation').fadeIn();
});
//2)По кліку на хрестик закривати модальні вікна
$('.modal__close').on('click', function () {
  $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
});
//3)Перебирає кожну карточку
//4)По кліку на кнопку яка є в карточці заміщає текст який є підзаголовком
$('.button_mini').each(function (i) {
  $(this).on('click', function () {
    $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
    $('.overlay, #order').fadeIn('slow');
  });
});
