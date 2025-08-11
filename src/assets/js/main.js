(function ($) {
    "use strict";

    // Initiate the wowjs
    new WOW().init();


    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 24,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            992:{
                items:2
            }
        }
    });
    
})(jQuery);

const translation={
    en:{
        select : "Select Language",
        title: "School Facilities",
        Button: "Home, About Us, Classes, Pages, Contact Us",
        para : "Our school offers modern classrooms, a well-stocked library, and advanced science and computer labs.We also provide sports facilities, a clean cafeteria, and a safe, nurturing environment for all students."
        },
    nl :{
        select : "Selecteer taal",
        title: "School faciliteiten",
        btn: "Home, Over ons, Cursussen, Pagina's, Contact",
        para: "Onze school biedt moderne klaslokalen, een goed gevulde bibliotheek en geavanceerde wetenschaps- en computerlokalen.We bieden ook sportfaciliteiten, een schone kantine en een veilige, stimulerende omgeving voor alle leerlingen."

    }
}
const languageSelectop = document.querySelector("select")
let b1 =document.getElementById("b1");
let title =document.getElementById("title");

let para =document.getElementById("para");
let btn =Button.getElementById("btn");

languageSelectop.addEventListener("change",(event)=>{
    setLanguage(event.target.value)
})
const setLanguage=(language) =>{
    if(language == "en"){
        b1.innerText=translation.en.select;
        title.innerText=translation.en.title;
        para.innerText=translation.en.para;
        btn.innerText=translation.en.btn
        
    }else if(language == "nl"){
        b1.innerText=translation.nl.select;
        title.innerText=translation.nl.title;
        para.innerText=translation.nl.para;
        btn.innerText=translation.nl.btn
    }
}

