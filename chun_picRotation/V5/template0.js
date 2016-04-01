define(function(require, exports, module) {
    var $ = require("zepto");
    var slider = require("slider");
    var sum = $("#numList").children().length;
    var scrLeft = 300;

    new slider("#container", {
        wrap: "#wrapper",
        trigger: "#numList",
        activeTriggerCls: "d-cur",
        hasTrigger: true,
        prev: ".left",
        next: ".right",
        callback: function(index, tag) {
            if (tag == 1 && index < 5) {
                $("#info_louceng").html($(".d-cur").next().data("info"));
                // $(".top").scrollLeft(scrLeft);
                // scrLeft = scrLeft + 300;
            } else if (tag == -1 && index >= 1) {
                $("#info_louceng").html($(".d-cur").prev().data("info"));
                // $(".top").scrollLeft(scrLeft);
                // scrLeft = scrLeft - 600 < 0 ? 0 : scrLeft - 600;
            }
            $("#info_num").html((index + 1) + '/' + sum);
        }
    });

    $("#numList li").on("click", function() {
        $("#info_louceng").html($(this).data("info"));
        $("#info_num").html($(this).html() + '/' + sum);
    });
});
