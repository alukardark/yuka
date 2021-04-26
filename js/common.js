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

        if (el.attr('id') === 'main' || el.attr('id') === 'contact') {
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

    $(document).on('click', '.navigation-dots .dot', function(e) {
        let screen = $($(this).attr('href'));
        goToSection(screen);
        console.log(screen);
        e.preventDefault();
    });



    $('body').bind('mousewheel', function(e){
        if(e.originalEvent.wheelDelta / 120 > 0) {
            if ( transitionActive == false ) {
                prevScreen();
                console.log('scrolling up !');
            }
        }
        else{
            if ( transitionActive == false ) {
                nextScreen();
            }
        }
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
        if (currentGSection == '#main'){
            pauseVid();}
    }

    const hideAside = () => {
        $('body').removeClass('-navigation-opened -blur-overlay')
        if (currentGSection == '#main'){
            playVid();}
    }

    $(document).on('click', '.menu-trigger', function() {
        if ( $('body').hasClass('-navigation-opened') ) {
            hideAside();
        } else {
            showAside();
        }
    });

    $(document).on('mouseenter', '.service-item', function() {
        const serviceId = $(this).attr('data-service');

        console.log(serviceId);

        $('.service-bg').removeClass('-active');
        $('.service-bg[data-service="' + serviceId + '"]').addClass('-active');
    });


    $(document).on('mouseleave', '.service-item', function() {

        $('.service-bg').removeClass('-active');
    });


    $(document).on('mouseenter', '.portfolio-item', function() {
        $('#portfolio').addClass('-hovered');
    });


    $(document).on('mouseleave', '.portfolio-item', function() {
        $('#portfolio').removeClass('-hovered');
    });


    // $(document).on("click",".menu-trigger",function(){$("body").toggleClass("-navigation-opened")});








});