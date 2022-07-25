var big_image;

 $(document).ready(function(){
     BrowserDetect.init();

      $.material.init();

     window_width = $(window).width();

     $navbar = $('.navbar[color-on-scroll]');
     scroll_distance = $navbar.attr('color-on-scroll') || 500;

     $navbar_collapse = $('.navbar').find('.navbar-collapse');
     
     $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();

     
     if($(".selectpicker").length != 0){
         $(".selectpicker").selectpicker();
     }
     $('[data-toggle="popover"]').popover();
 	$('.carousel').carousel({
       interval: 3000
     });
     
     var tagClass = $('.tagsinput').data('color');

     $('.tagsinput').tagsinput({
         tagClass: ' tag-'+ tagClass +' '
     });

     if($('.navbar-color-on-scroll').length != 0){
         $(window).on('scroll', siteJs.checkScrollForTransparentNavbar)
     }

     if (window_width >= 768){
         big_image = $('.page-header[data-parallax="true"]');
         if(big_image.length != 0){
            $(window).on('scroll', siteJsDemo.checkScrollForParallax);
         }

     }
 });

 $(window).on("load", function() {
     siteJs.initColoredShadows();
 });



 $(document).on('click', '.navbar-toggle', function(){
     $toggle = $(this);

     if(siteJs.misc.navbar_menu_visible == 1) {
         $('html').removeClass('nav-open');
         siteJs.misc.navbar_menu_visible = 0;
         $('#bodyClick').remove();
          setTimeout(function(){
             $toggle.removeClass('toggled');
          }, 550);

         $('html').removeClass('nav-open-absolute');
     } else {
         setTimeout(function(){
             $toggle.addClass('toggled');
         }, 580);


         div = '<div id="bodyClick"></div>';
         $(div).appendTo("body").click(function() {
             $('html').removeClass('nav-open');

             if($('nav').hasClass('navbar-absolute')){
                 $('html').removeClass('nav-open-absolute');
             }
             siteJs.misc.navbar_menu_visible = 0;
             $('#bodyClick').remove();
              setTimeout(function(){
                 $toggle.removeClass('toggled');
              }, 550);
         });

         if($('nav').hasClass('navbar-absolute')){
             $('html').addClass('nav-open-absolute');
         }

         $('html').addClass('nav-open');
         siteJs.misc.navbar_menu_visible = 1;
     }
 });


 siteJs = {
     misc:{
         navbar_menu_visible: 0,
         window_width: 0,
         transparent: true,
         colored_shadows: true,
         fixedTop: false,
         navbar_initialized: false,
         isWindow: document.documentMode || /Edge/.test(navigator.userAgent)
     },

    initColoredShadows: function(){
        if(siteJs.misc.colored_shadows == true){
            if( !(BrowserDetect.browser == 'Explorer' && BrowserDetect.version <= 12) ){


                $('.card:not([data-colored-shadow="false"]) .card-image').each(function(){
                    $card_img = $(this);

                    is_on_dark_screen = $(this).closest('.section-dark, .section-image').length;

                    // we block the generator of the colored shadows on dark sections, because they are not natural
                    if(is_on_dark_screen == 0){
                        var img_source = $card_img.find('img').attr('src');
                        var is_rotating = $card_img.closest('.card-rotate').length == 1 ? true : false;
                        var $append_div = $card_img;

                        var colored_shadow_div = $('<div class="colored-shadow"/>');

                        if(is_rotating){
                            var card_image_height = $card_img.height();
                            var card_image_width = $card_img.width();

                            $(this).find('.back').css({
                                'height': card_image_height + 'px',
                                'width': card_image_width + 'px'
                            });
                            var $append_div = $card_img.find('.front');
                        }

                        colored_shadow_div.css({'background-image': 'url(' + img_source +')'}).appendTo($append_div);

                        if($card_img.width() > 700){
                            colored_shadow_div.addClass('colored-shadow-big');
                        }

                        setTimeout(function(){
                            colored_shadow_div.css('opacity',1);
                        }, 200)
                    }

                });
            }
        }
    },

  

     checkScrollForTransparentNavbar: debounce(function() {
             if($(document).scrollTop() > scroll_distance ) {
                 if(siteJs.misc.transparent) {
                     siteJs.misc.transparent = false;
                     $('.navbar-color-on-scroll').removeClass('navbar-transparent');
                 }
             } else {
                 if( !siteJs.misc.transparent ) {
                     siteJs.misc.transparent = true;
                     $('.navbar-color-on-scroll').addClass('navbar-transparent');
                 }
             }
     }, 17),
     

     //initSliders: function(){
     //    // Sliders for demo purpose
     //    var slider = document.getElementById('sliderRegular');

     //    noUiSlider.create(slider, {
     //        start: 40,
     //        connect: [true,false],
     //        range: {
     //            min: 0,
     //            max: 100
     //        }
     //    });

     //    var slider2 = document.getElementById('sliderDouble');

     //    noUiSlider.create(slider2, {
     //        start: [ 20, 60 ],
     //        connect: true,
     //        range: {
     //            min:  0,
     //            max:  100
     //        }
     //    });
     //}
 }




 siteJsDemo = {

     checkScrollForParallax: debounce(function(){
         oVal = ($(window).scrollTop() / 3);
         big_image.css({
             'transform':'translate3d(0,' + oVal +'px,0)',
             '-webkit-transform':'translate3d(0,' + oVal +'px,0)',
             '-ms-transform':'translate3d(0,' + oVal +'px,0)',
             '-o-transform':'translate3d(0,' + oVal +'px,0)'
         });
     }, 6),

  

 }
 // Returns a function, that, as long as it continues to be invoked, will not
 // be triggered. The function will be called after it stops being called for
 // N milliseconds. If `immediate` is passed, trigger the function on the
 // leading edge, instead of the trailing.

 function debounce(func, wait, immediate) {
 	var timeout;
 	return function() {
 		var context = this, args = arguments;
 		clearTimeout(timeout);
 		timeout = setTimeout(function() {
 			timeout = null;
 			if (!immediate) func.apply(context, args);
 		}, wait);
 		if (immediate && !timeout) func.apply(context, args);
 	};
 };

 var BrowserDetect = {
     init: function () {
         this.browser = this.searchString(this.dataBrowser) || "Other";
         this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
     },
     searchString: function (data) {
         for (var i = 0; i < data.length; i++) {
             var dataString = data[i].string;
             this.versionSearchString = data[i].subString;

             if (dataString.indexOf(data[i].subString) !== -1) {
                 return data[i].identity;
             }
         }
     },
     searchVersion: function (dataString) {
         var index = dataString.indexOf(this.versionSearchString);
         if (index === -1) {
             return;
         }

         var rv = dataString.indexOf("rv:");
         if (this.versionSearchString === "Trident" && rv !== -1) {
             return parseFloat(dataString.substring(rv + 3));
         } else {
             return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
         }
     },

     dataBrowser: [
         {string: navigator.userAgent, subString: "Chrome", identity: "Chrome"},
         {string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
         {string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
         {string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
         {string: navigator.userAgent, subString: "Safari", identity: "Safari"},
         {string: navigator.userAgent, subString: "Opera", identity: "Opera"}
     ]

 };

 var better_browser = '<div class="container"><div class="better-browser row"><div class="col-md-2"></div><div class="col-md-8"><h3>We are sorry but it looks like your Browser doesn\'t support our website Features. In order to get the full experience please download a new version of your favourite browser.</h3></div><div class="col-md-2"></div><br><div class="col-md-4"><a href="https://www.mozilla.org/ro/firefox/new/" class="btn btn-warning">Mozilla</a><br></div><div class="col-md-4"><a href="https://www.google.com/chrome/browser/desktop/index.html" class="btn ">Chrome</a><br></div><div class="col-md-4"><a href="http://windows.microsoft.com/en-us/internet-explorer/ie-11-worldwide-languages" class="btn">Internet Explorer</a><br></div><br><br><h4>Thank you!</h4></div></div>';
