AOS.init({
	duration: 800,
	easing: "slide",
	once: true,
});

jQuery(document).ready(function ($) {
	"use strict";

	var slider = function () {
		$(".nonloop-block-3").owlCarousel({
			center: false,
			items: 1,
			loop: true,
			smartSpeed: 700,
			stagePadding: 15,
			margin: 20,
			autoplay: true,
			nav: true,
			navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
			responsive: {
				600: {
					margin: 20,
					items: 2,
				},
				1000: {
					margin: 20,
					items: 3,
				},
				1200: {
					margin: 20,
					items: 3,
				},
			},
		});

		if ($(".owl-single").length > 0) {
			$(".owl-single").owlCarousel({
				center: false,
				items: 1,
				loop: true,
				smartSpeed: 700,
				stagePadding: 0,
				margin: 0,
				autoplay: true,
				nav: true,
				navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
			});
		}
	};
	slider();

	var siteMenuClone = function () {
		// Check if mobile menu already exists
		if ($(".site-mobile-menu").length === 0) {
			// Site Mobile Menu
			$('<div class="site-mobile-menu"></div>').prependTo(".site-wrap");
			$('<div class="site-mobile-menu-header"></div>').prependTo(".site-mobile-menu");
			$('<div class="site-mobile-menu-close"></div>').prependTo(".site-mobile-menu-header");
			$('<div class="site-mobile-menu-body"></div>').appendTo(".site-mobile-menu");

			// Close button
			$('<span class="js-menu-toggle"><i class="fas fa-times"></i></span>').prependTo(".site-mobile-menu-close");

			// Clone navigation
			$(".js-clone-nav").each(function () {
				var $this = $(this);
				$this.clone().attr("class", "site-nav-wrap").appendTo(".site-mobile-menu-body");
			});
		}

		// Hamburger menu toggle
		$("body").on("click", ".js-menu-toggle", function (e) {
			var $this = $(this);
			e.preventDefault();

			if ($("body").hasClass("offcanvas-menu")) {
				$("body").removeClass("offcanvas-menu");
				$this.removeClass("active");
				$(".burger").removeClass("active");
			} else {
				$("body").addClass("offcanvas-menu");
				$this.addClass("active");
				$(".burger").addClass("active");
			}
		});

		// Click outside to close
		$(document).mouseup(function (e) {
			var container = $(".site-mobile-menu");
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				if ($("body").hasClass("offcanvas-menu")) {
					$("body").removeClass("offcanvas-menu");
					$(".js-menu-toggle").removeClass("active");
					$(".burger").removeClass("active");
				}
			}
		});
	};
	siteMenuClone();

	var sitePlusMinus = function () {
		$(".js-btn-minus").on("click", function (e) {
			e.preventDefault();
			if ($(this).closest(".input-group").find(".form-control").val() != 0) {
				$(this)
					.closest(".input-group")
					.find(".form-control")
					.val(parseInt($(this).closest(".input-group").find(".form-control").val()) - 1);
			} else {
				$(this).closest(".input-group").find(".form-control").val(parseInt(0));
			}
		});
		$(".js-btn-plus").on("click", function (e) {
			e.preventDefault();
			$(this)
				.closest(".input-group")
				.find(".form-control")
				.val(parseInt($(this).closest(".input-group").find(".form-control").val()) + 1);
		});
	};
	sitePlusMinus();

	var siteSliderRange = function () {
		$("#slider-range").slider({
			range: true,
			min: 0,
			max: 500,
			values: [75, 300],
			slide: function (event, ui) {
				$("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
			},
		});
		$("#amount").val("$" + $("#slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));
	};
	siteSliderRange();

	var siteMagnificPopup = function () {
		$(".image-popup").magnificPopup({
			type: "image",
			closeOnContentClick: true,
			closeBtnInside: false,
			fixedContentPos: true,
			mainClass: "mfp-no-margins mfp-with-zoom", // class to remove default margin from left and right side
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
			},
			image: {
				verticalFit: true,
			},
			zoom: {
				enabled: true,
				duration: 300, // don't foget to change the duration also in CSS
			},
		});

		$(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
			disableOn: 700,
			type: "iframe",
			mainClass: "mfp-fade",
			removalDelay: 160,
			preloader: false,

			fixedContentPos: false,
		});
	};
	siteMagnificPopup();

	var searchShow = function () {
		// alert();
		var searchWrap = $(".search-wrap");
		$(".js-search-open").on("click", function (e) {
			e.preventDefault();
			searchWrap.addClass("active");
			setTimeout(function () {
				searchWrap.find(".form-control").focus();
			}, 300);
		});
		$(".js-search-close").on("click", function (e) {
			e.preventDefault();
			searchWrap.removeClass("active");
		});
	};
	searchShow();
});
