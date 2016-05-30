$(document).ready(function() {

  var app = {

    init: function() {
      var self = this;

      self.initTriggers();
      self.initMasonry();
      self.initSlick();
      self.initNavigation();
    },

    initTriggers: function() {

      // IMG
      $(window).load(function() {
        $('img').addClass('loaded');
      });

      // NAVIGATION
      $('.navlink').on('click', function() {
        var nav_child = $(this).attr('data-href-child');

        $('header nav a').removeClass('active');
        $('header nav').find('a').eq(nav_child - 1).addClass('active');
      });

      // FORCE NAV
      setTimeout(function(){
        $('nav ul li:nth-child(3) a').click();
      }, 100);

      // TEMPS FORTS
      $('.grid-item').mouseenter(function() {
        $(this).find('.overlay').addClass('show');
      }).mouseleave(function() {
        $(this).find('.overlay').removeClass('show');
      });

      // NOS VALEURS
      $('#slick-menu a').on('click', function(e) {
        e.preventDefault();

        var slickSlide = $(this).attr('data-slick-slide');
        $('#slick-slider').slick('slickGoTo', slickSlide);
      });

    },

    initMasonry: function() {

      var $grid = $('.grid');
      $grid.imagesLoaded(function() {
        $grid.masonry({
          columnWidth: 320,
          gutterWidth: 20,
          itemSelector: '.grid-item'
        });
      });

    },

    initSlick: function() {

      $('#slick-slider').slick({
        dots: true,
        prevArrow: '',
        nextArrow: '',
        draggable: false
      });

    },

    initNavigation: function() {
      var self = this;

      $('.navlink').on('click', function(e) {
        e.preventDefault();

        var section = $(this).attr('href');
        if ( section == '#section-temps-forts' ) self.initScrollPane(section);
        if ( section == '#section-recommandations' ) self.initScrollPane(section);

        $('section').removeClass('normal').addClass('to_top');
        $(''+section+'').removeClass('to_top').removeClass('hidden').addClass('normal');

        $('section').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
          if ( $(this).hasClass('to_top') ) $(this).addClass('hidden');
        });

      });

    },

    initScrollPane: function(section) {

      if ( section == '#section-temps-forts' ) $('#section-temps-forts').jScrollPane();
      if ( section == '#section-recommandations' ) $('#section-recommandations').jScrollPane();

    }

  };

  window.app = app;
  app.init();

});
