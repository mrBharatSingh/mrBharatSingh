(function($) {
    'use strict';

    var imJs = {
        m: function() {
            imJs.d();
            imJs.methods();
        },
        d: function() {
            this._window = $(window);
            this._document = $(document);
            this._body = $('body');
            this._html = $('html');
        },

        methods: function() {
            imJs.featherActivation();
            imJs.backToTopInit();
            imJs.mobileMenuActive();
            imJs.stickyHeader();
            imJs.smothScroll();
            imJs.stickyAdjust();
            imJs.contactForm();
            imJs.wowActive();
            imJs.aosActivation();
        },

        contactForm: function() {
            $('.rwt-dynamic-form').on('submit', function(e) {
                e.preventDefault();
                var _self = $(this);
                _self.closest('div').find('input,textarea').removeAttr('style');
                _self.find('.error-msg').remove();
                _self.closest('div').find('button[type="submit"]').attr('disabled', 'disabled');
                var data = $(this).serialize();
                $.ajax({
                    url: 'mail.php',
                    type: 'post',
                    dataType: 'json',
                    data: data,
                    success: function(data) {
                        _self.closest('div').find('button[type="submit"]').removeAttr('disabled');
                        if (data.code == false) {
                            _self.closest('div').find('[name="' + data.field + '"]');
                            _self.find('.rn-btn').after('<div class="error-msg"><p>*' + data.err + '</p></div>');
                        } else {
                            $('.error-msg').hide();
                            $('.form-group').removeClass('focused');
                            _self.find('.rn-btn').after('<div class="success-msg"><p>' + data.success + '</p></div>');
                            _self.closest('div').find('input,textarea').val('');
                            setTimeout(function() {
                                $('.success-msg').fadeOut('slow');
                            }, 5000);
                        }
                    }
                });
            });
        },

        wowActive: function() {
            new WOW().init();
        },

        smothScroll: function() {
            $(document).on('click', '.smoth-animation', function(event) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: $($.attr(this, 'href')).offset().top - 50
                }, 300);
            });
        },

        stickyAdjust: function() {
            $('.rbt-sticky-top-adjust').css({ top: 120 });
        },

        featherActivation: function() {
            feather.replace();
        },

        backToTopInit: function() {
            var scrollTop = $('.backto-top');
            $(window).scroll(function() {
                var topPos = $(this).scrollTop();
                if (topPos > 100) {
                    $(scrollTop).css('opacity', '1');
                } else {
                    $(scrollTop).css('opacity', '0');
                }
            });
            $(scrollTop).on('click', function() {
                $('html, body').animate({
                    scrollTop: 0,
                    easingType: 'linear',
                }, 500);
                return false;
            });
        },

        stickyHeader: function() {
            $(window).scroll(function() {
                if ($(this).scrollTop() > 250) {
                    $('.header--sticky').addClass('sticky');
                } else {
                    $('.header--sticky').removeClass('sticky');
                }
            });
        },

        mobileMenuActive: function() {
            $('.humberger-menu').on('click', function(e) {
                e.preventDefault();
                $('.popup-mobile-menu').addClass('menu-open');
                imJs._html.css({ overflow: 'hidden' });
            });

            $('.close-menu-activation, .popup-mobile-menu .primary-menu .nav-item a').on('click', function(e) {
                e.preventDefault();
                $('.popup-mobile-menu').removeClass('menu-open');
                $('.has-droupdown > a').removeClass('open').siblings('.submenu').removeClass('active').slideUp('400');
                imJs._html.css({ overflow: '' });
            });

            $('.popup-mobile-menu').on('click', function(e) {
                e.target === this && $('.popup-mobile-menu').removeClass('menu-open');
                imJs._html.css({ overflow: '' });
            });

            $('.has-droupdown > a').on('click', function(e) {
                e.preventDefault();
                $(this).siblings('.submenu').toggleClass('active').slideToggle('400');
                $(this).toggleClass('open');
                imJs._html.css({ overflow: '' });
            });

            $('.nav-pills .nav-link').on('click', function() {
                $('.rn-popup-mobile-menu').removeClass('menu-open');
                imJs._html.css({ overflow: '' });
            });
        },

        aosActivation: function() {
            AOS.init();
        },
    };

    imJs.m();

})(jQuery, window);
