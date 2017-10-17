var cultrainData = {
    "Northbound": ["Bayshore", "South San Francisco", "San Bruno", "Millbrae", "Burlingame", "San Mateo", "Hayward Park", "Hillsdale", "Belmont", "San Carlos", "Redwood City", "Menlo Park", "Palo Alto", "California Avenue", "San Antonio", "Mountain View", "Sunnyvale", "Lawrence", "Santa Clara", "San Jose Diridon"],
    "Southbound": ["San Jose Diridon", "Santa Clara", "Lawrence", "Sunnyvale", "Mountain View", "San Antonio", "California Avenue", "Palo Alto", "Menlo Park", "Redwood City", "San Carlos", "Belmont", "Hillsdale", "Hayward Park", "San Mateo", "Burlingame", "Millbrae", "San Bruno", "South San Francisco", "Bayshore"]
};


var $j = jQuery.noConflict();

function init() {
    initCultrainBox();
    initCultrainClick()
}

function genCultrainLineHtml() {
    var htmls = [],
        i = -1,
        classname = ["op-cultrain-one", "op-cultrain-two"];
    for (var lineName in cultrainData)
        i++,
        htmls.push("<li><span class=" + classname[i] + "></span>" + lineName + "</li>");
    return htmls.join("")
}

function genCultrainStationHtml(lineName) {
    for (var stations = cultrainData[lineName], htmls = [], i = 0; i < stations.length; ++i)
    htmls.push("<li>" + stations[i] + "</li>");
    return htmls.join("")
}

function tryActiveButton() {
    var start = $j(".op-cultrain-box-start .op-cultrain-station em").text();
    end = $j(".op-cultrain-box-end .op-cultrain-station em").text();
    if ("Choose Station" != start && "Choose Station" != end)
    $j(".op-cultrain-calc-false").addClass("op-cultrain-calc-fare").removeClass("op-cultrain-calc-false")
}

function initCultrainBox() {
    var lineHtml = genCultrainLineHtml();
    $j(".op-cultrain-line .op-cultrain-ul").html(lineHtml),
        $j(".op-cultrain-line .op-cultrain-ul").on("click", "li",
            function() {
                var lineName = $j(this).text();
                $j(this).parent().parent().parent().find(".op-cultrain-line em").css({
                        padding: "0px 5px 0px 20px"
                    }),
                    $j(this).parent().parent().parent().find(".op-cultrain-station").css({
                        background: "#fff"
                    }),
                    $j(this).parent().parent().parent().find(".op-cultrain-station em").css({
                        color: "#333"
                    });
                var stationHtml = genCultrainStationHtml(lineName),
                    $box = $j(this).parent().parent().parent();
                $box.find(".op-cultrain-ulk").html(stationHtml);
                var firstStation = cultrainData[lineName][0];
                $box.find(".op-cultrain-station em").text(firstStation),
                    tryActiveButton()
            })
}

function initCultrainClick() {
    $j(".op-cultrain-line,.op-cultrain-station").on("click",
        function(event) {
            if (event.stopPropagation(),
            $j(".op-cultrain-ts").hide,
             $j(".op-cultrain-box ul").hide(),
             $j(this).find("ul").children().length)
             $j(this).find("ul").show();

            $j(document).on("click",
                function() {
                    $j(".op-cultrain-box ul").hide()
                })
        })
    $j(".op-cultrain-ul, .op-cultrain-ulk").on("click", "li",
        function(event) {
            event.stopPropagation(),
                $j(this).parent().parent().find("em").html($j(this).html()),
                $j(this).parent().parent().find("ul").hide();

        })
}


init();
