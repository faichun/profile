function nextSlide(e, t, r) {
  var a = jQuery(e + " li:nth-child(" + t + ") picture");
  a.length &&
    a.hasClass("lazy-load") &&
    (a.find("source").each(function () {
      jQuery(this)
        .attr("srcset", jQuery(this).attr("data-srcset"))
        .removeAttr("data-srcset");
    }),
    a.removeClass("lazy-load"),
    picturefill({ reevaluate: !0 })),
    "current" === r && nextSlide(e, t + 1, "next");
}

jQuery(function ($) {
  // Prevent links from being clicked if slider is sliding
  $("body").on("click", ".lightSlider a", function (e) {
    if ($(this).parent().parent().hasClass("sliding")) {
      e.preventDefault();
    }
  });

  // Slider Initialisation
  if (typeof $sliders !== "undefined") {
    $play_slides = [];
    for (var i = 0; i < $sliders.length; i++) {
      var $slider_id = $sliders[i]["slider-id"];
      if ($sliders[i]["thumbs"] === 0) {
        $play_slides[$slider_id] = $("#" + $slider_id).lightSlider({
          item: 1,
          slideMargin: 0,
          speed: 400,
          auto: true,
          loop: true,
          pause: $sliders[i]["pause"],
          pauseOnHover: true,
          adaptiveHeight: false,
          prevHtml:
            '<svg class="icon-arrow-left"><use xlink:href="#icon-arrow-left"></use></svg>',
          nextHtml:
            '<svg class="icon-arrow-right"><use xlink:href="#icon-arrow-right"></use></svg>',
          onSliderLoad: function (el) {
            if (el.find("video").attr("data-autoplay") === "true") {
              el.find("video").get(0).play();
              $play_slides[$slider_id].pause();
            }
            nextSlide("#" + el[0]["id"], 1);
            nextSlide("#" + el[0]["id"], 3);
          },
          onBeforeSlide: function (el) {
            $("#" + el[0]["id"]).addClass("sliding");
            var $count = el.getCurrentSlideCount() + 1;
            nextSlide("#" + el[0]["id"], $count, "current");
          },
          onAfterSlide: function (el) {
            $("#" + el[0]["id"]).removeClass("sliding");
            if (
              $(
                "#" +
                  el[0]["id"] +
                  " li:nth-child(" +
                  (el.getCurrentSlideCount() + 1) +
                  ") video"
              ).length
            ) {
              $(
                "#" +
                  el[0]["id"] +
                  " li:nth-child(" +
                  (el.getCurrentSlideCount() + 1) +
                  ") video"
              )
                .get(0)
                .play();
            } else if ($("#" + el[0]["id"] + " li video").length) {
              $("#" + el[0]["id"] + " li video")
                .get(0)
                .pause();
            }
          },
          onBeforePrevSlide: function (el) {
            var $count = el.getCurrentSlideCount();
            nextSlide("#" + el[0]["id"], $count, "next");
          },
        });
      } else {
        $play_slides[$slider_id] = $("#" + $slider_id).lightSlider({
          gallery: true,
          item: 1,
          thumbItem: 8,
          slideMargin: 0,
          speed: 400,
          auto: true,
          loop: true,
          pause: $sliders[i]["pause"],
          pauseOnHover: true,
          adaptiveHeight: false,
          prevHtml:
            '<svg class="icon-arrow-left"><use xlink:href="#icon-arrow-left"></use></svg>',
          nextHtml:
            '<svg class="icon-arrow-right"><use xlink:href="#icon-arrow-right"></use></svg>',
          onSliderLoad: function (el) {
            if (el.find("video").attr("data-autoplay") === "true") {
              el.find("video").get(0).play();
              $play_slides[$slider_id].pause();
            }
            nextSlide("#" + el[0]["id"], 1);
            nextSlide("#" + el[0]["id"], 3);
          },
          onBeforeSlide: function (el) {
            $("#" + el[0]["id"]).addClass("sliding");
            var $count = el.getCurrentSlideCount() + 1;
            nextSlide("#" + el[0]["id"], $count, "current");
          },
          onAfterSlide: function (el) {
            $("#" + el[0]["id"]).removeClass("sliding");
            if (
              $(
                "#" +
                  el[0]["id"] +
                  " li:nth-child(" +
                  (el.getCurrentSlideCount() + 1) +
                  ") video"
              ).length
            ) {
              $(
                "#" +
                  el[0]["id"] +
                  " li:nth-child(" +
                  (el.getCurrentSlideCount() + 1) +
                  ") video"
              )
                .get(0)
                .play();
            } else if ($("#" + el[0]["id"] + " li video").length) {
              $("#" + el[0]["id"] + " li video")
                .get(0)
                .pause();
            }
          },
          onBeforePrevSlide: function (el) {
            var $count = el.getCurrentSlideCount();
            nextSlide("#" + el[0]["id"], $count, "next");
          },
        });
      }
    }
  }
});
