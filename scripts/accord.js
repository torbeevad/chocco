const list = $('.accord__list');

list.on('click', '.accord__item', function (e) {
    (e).preventDefault();
    $(this).siblings('li').removeClass('accord__item--active')
    $(this).toggleClass('accord__item--active')
})
