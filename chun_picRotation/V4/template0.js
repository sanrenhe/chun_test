define(function(require, exports, modules) {
    var $ = require("./zepto");
    // var slider = require("./slider");

    $("document").ready(function() {
        var $activePage = $("#page-1");
        $activePage.addClass("page--active");
    });


    $("section").on("swipeLeft", function(e) {
        slideLeft($(this));
    });
    $("section").on("swipeRight", function() {
        slideRight($(this));
    });

    $(".btn-next").on("click", function() {
        slideLeft($(this).parent().parent());
    });
    $(".btn-prev").on("click", function() {
        slideRight($(this).parent().parent());
    });

    function slideLeft(section) {
        var index = parseInt(section.attr('id').split('-')[1]),
            con_Length = $(".container>section").length,
            $nextPage = index == con_Length ? "" : $('#page-' + (index + 1));
        if (index == con_Length) {
            return false;
        }
        $nextPage.addClass("page--next");
        setTimeout(function() {
            section.addClass("page--active-left");
            $nextPage.addClass("page--next-left");
        }, 50);
        setTimeout(function() {
            section.removeClass("page--active page--active-left");
            $nextPage.removeClass("page--next page--next-left").addClass("page--active");
            $(".page--active").offsetWidth;
        }, 1000);
    }

    function slideRight(section) {
        var index = parseInt(section.attr('id').split('-')[1]),
            $prevPage = index == 1 ? "" : $('#page-' + (index - 1));
        if (index == 1) {
            return false;
        }
        $prevPage.addClass("page--prev");
        setTimeout(
            function() {
                section.addClass("page--active-right");
                $prevPage.addClass("page--prev-right");
            },
            50
        );
        setTimeout(
            function() {
                section.removeClass("page--active page--active-right");
                $prevPage.removeClass("page--prev page--prev-right").addClass("page--active");
                $(".page--active").offsetWidth;
            },
            1000
        );
    }

    var callbacks = [];
    var imgLoad = require("./imgLoader.js");
    imgLoad(['./img0.jpg', './img1.jpg', './img2.jpg'], function(percentage) {
        var i = callbacks.length;
        callbacks.push(function() {
            setTimeout(function() {
                var percentT = percentage * 100;
                $(".tiao").attr("style", "width:" + percentT + 5 + "%");
                $("#tencent").html((parseInt(percentT)) + '%');
                if (percentage == 1) {
                    $("#tencent").html('Loading complete!');
                    setTimeout(
                        function() {
                            $("#shade").hide();
                            $("#container").show();
                        },
                        500
                    );
                }
                callbacks[i + 1] && callbacks[i + 1]();
                i++;
            }, 600);
        });
        if (percentage == 1) {
            callbacks[0]();
        }
    });
});
