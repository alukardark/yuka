jQuery(document).ready(function ($) {

    var transitionActive = false;
    let currentGSection = '#main';

    const goToSection = (el) => {

        console.log(el.attr('id'));

        if ($(el).hasClass('-menu')) {
            $('body').addClass('-menu')
        } else {
            $('body').removeClass('-menu')
        }

        // переключаем боковую навигацию

        $('.navigation-dots .dot').removeClass('-active');
        $('.navigation-dots .dot[href="#' + el.attr('id') + '"]').addClass('-active');


        let currentSection = $('.fullscreen-section.-active');

        let nextSection = $(el);
        currentGSection = el;

        transitionActive = true;

        // if (el.attr('id') === 'main' || el.attr('id') === 'contact') {
        if (el.attr('id') === 'main') {
            $('body').removeClass('-video-blured');
            // $('body').removeClass('-blur-overlay');
            playVid();
        } else {
            $('body').addClass('-video-blured');
            // $('body').addClass('-blur-overlay');
            pauseVid();
        }


        currentSection.removeClass('-active');

        nextSection.nextAll('.fullscreen-section').removeClass('-prev -active');
        nextSection.prevAll('.fullscreen-section').removeClass('-active');
        nextSection.prevAll('.fullscreen-section').addClass('-prev');

        nextSection.removeClass('-prev').addClass('-active -load');


        console.log('следующий слайд');

        setTimeout(() => {
            transitionActive = false;
            nextSection.removeClass('-load');
        }, 1000);

    }

    const nextScreen = () => {
        let currentSection = $('.fullscreen-section.-active');
        let nextSection = currentSection.next('.fullscreen-section');
        if (nextSection.length > 0) {
            goToSection(nextSection);
        } else {
            console.log('ниже ничего нет');
        }
    }
    const prevScreen = () => {
        let currentSection = $('.fullscreen-section.-active');
        let nextSection = currentSection.prev('.fullscreen-section');
        if (nextSection.length > 0) {
            goToSection(nextSection);
        } else {
            console.log('выше ничего нет');
        }
    }

    $(document).on('click', '.navigation-dots .dot', function (e) {
        let screen = $($(this).attr('href'));
        goToSection(screen);
        console.log(screen);
        e.preventDefault();
    });


    function checkMobile() {
        // if ($(window).height() > 800) {
        //     $('body').removeClass('mobile');
        // } else {
        //     $('body').addClass('mobile');
        // }
        if (window.matchMedia('(max-width: 767px)').matches) {
            return true;
        } else {
            return false;
        }
    }

    // checkMobile();

    var div = $('#airport-text');
    $(document).bind('wheel ', function (e) {
            if (!checkMobile()) {
                if (!div.is(e.target) && div.has(e.target).length === 0) {
                    // if (e.target != document.getElementById('airport-text')) {
                    if (event.deltaY < 0) {
                        if (transitionActive == false) {
                            prevScreen();
                            console.log('scrolling up !');
                        }
                    }
                    else {
                        if (transitionActive == false) {
                            nextScreen();
                        }
                    }
                }
            }
        }
    );

    document.querySelectorAll('.scrollbar').forEach(el => {
        new SimpleBar(el, {
            autoHide: false
        });
    });

    document.querySelectorAll('.inner-page table').forEach(el => {
        new SimpleBar(el, {
            autoHide: false
        });
    });

    var vid = document.getElementById("videoBG");

    function playVid() {
        vid.play();
    }

    function pauseVid() {
        vid.pause();
    }

    const showAside = () => {
        $('body').addClass('-navigation-opened -blur-overlay')
        if (currentGSection == '#main') {
            pauseVid();
        }
    }

    const hideAside = () => {
        $('body').removeClass('-navigation-opened -blur-overlay')
        if (currentGSection == '#main') {
            playVid();
        }
    }

    $(document).on('click', '.menu-trigger', function () {
        if ($('body').hasClass('-navigation-opened')) {
            hideAside();
        } else {
            showAside();
        }
    });

    $(document).on('mouseenter', '.service-item', function () {
        const serviceId = $(this).attr('data-service');

        console.log(serviceId);

        $('.service-bg').removeClass('-active');
        $('.service-bg[data-service="' + serviceId + '"]').addClass('-active');
    });

    $(document).on('mouseleave', '.service-item', function () {

        $('.service-bg').removeClass('-active');
    });

    var $dataId = '';
    if (!checkMobile()) {
        $(document).on('mouseenter', '.portfolio-item', function () {
            $('#portfolio').addClass('-hovered');
            $dataId = $(this).attr('data-id');
            $('.bg-cont .bg[data-id=' + $dataId + ']').addClass('active');
        });

        $(document).on('mouseleave', '.portfolio-item', function () {
            $('#portfolio').removeClass('-hovered');
            $dataId = $(this).attr('data-id');
            $('.bg-cont .bg[data-id=' + $dataId + ']').removeClass('active');
        });
    }


    // $(document).on("click",".menu-trigger",function(){$("body").toggleClass("-navigation-opened")});

    new Swiper('#portfolio-items-grid .swiper-container', {
        loop: true,
        slidesPerView: 4,
        spaceBetween: 30,
        slidesPerGroup: 1,
        loopFillGroupWithBlank: true,
        speed: 800,
        breakpoints: {
            1150: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            991: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
            767: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            575: {
                slidesPerView: 1,
                spaceBetween: 15,
            }
        },
        pagination: {
            el: '#portfolio-items-grid .swiper-nav-info',
            type: "fraction",
        },


        navigation: {
            nextEl: '#portfolio-items-grid .swiper-button-next',
            prevEl: '#portfolio-items-grid .swiper-button-prev',
        },
        on: {
            init: function () {

            },
            // paginationUpdate: function (swiper, paginationEl) {
            //     $('.portfolio__currrent-slide').text($('#portfolio-items-grid .swiper-pagination-bullet-active').index() + 1);
            // },
            // paginationRender: function () {
            //     $('.portfolio__total-slides').text($('#portfolio-items-grid .swiper-pagination-bullet').length)
            // },

        }
    });

    new Swiper('#blog-items-grid .swiper-container', {
        slidesPerView: 'auto',
        spaceBetween: 30,
        centeredSlides: true,
        speed: 800,
        breakpoints: {
            1360: {
                centeredSlides: false,
                spaceBetween: 30,
            },
            767: {
                centeredSlides: false,
                spaceBetween: 15,
            }
        },
        pagination: {
            el: '#blog-items-grid .swiper-nav-info',
            type: "fraction",
        },


        navigation: {
            nextEl: '#blog-items-grid .swiper-button-next',
            prevEl: '#blog-items-grid .swiper-button-prev',
        },
        on: {
            slideChangeTransitionStart: function () {
                $('#blog-items-grid .swiper-slide-active').prevAll().addClass('hide');
                $('#blog-items-grid .swiper-slide-active').nextAll().removeClass('hide');
                $('#blog-items-grid .swiper-slide-active').removeClass('hide');
            },
        }
    });


    var airportSlider = new Swiper("#airport-slider-thumbs.swiper-container", {
        spaceBetween: 15,
        slidesPerView: 'auto',
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });

    var swiper2 = new Swiper(".airport-slider.swiper-container", {
        spaceBetween: 0,
        slidesPerView: 'auto',
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 800,
        thumbs: {
            swiper: airportSlider,
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        on: {
            init: function () {
                $('#airport-slider-thumbs .swiper-slide').eq(0).addClass('active-slide')
            },
            slideChange: function () {
                $('#airport-slider-thumbs .swiper-slide').removeClass('active-slide');
                $('#airport-slider-thumbs .swiper-slide').eq(this.activeIndex).addClass('active-slide')
            }
        }

    });




});