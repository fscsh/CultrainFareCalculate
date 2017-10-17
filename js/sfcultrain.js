var cultrainData = {
    "Northbound": ["Bayshore", "South San Francisco",
        "San Bruno", "Millbrae", "Burlingame", "San Mateo",
        "Hayward Park", "Hillsdale", "Belmont", "San Carlos",
        "Redwood City", "Menlo Park", "Palo Alto", "California Avenue",
        "San Antonio", "Mountain View", "Sunnyvale", "Lawrence",
        "Santa Clara", "San Jose Diridon"
    ],
    "Southbound": ["San Jose Diridon", "Santa Clara", "Lawrence",
        "Sunnyvale", "Mountain View", "San Antonio", "California Avenue",
        "Palo Alto", "Menlo Park", "Redwood City", "San Carlos", "Belmont",
        "Hillsdale", "Hayward Park", "San Mateo", "Burlingame", "Millbrae",
        "San Bruno", "South San Francisco", "Bayshore"
    ]
};
var edgesData = [
    ["Bayshore", "South San Francisco", 1],
    ["South San Francisco", "San Bruno", 1],
    ["San Bruno", "Millbrae", 1],
    ["Millbrae", "Burlingame", 1],
    ["Burlingame", "San Mateo", 1],
    ["San Mateo", "Hayward Park", 1],
    ["Hayward Park", "Hillsdale", 1],
    ["Hillsdale", "Redwood City", 1],
    ["Redwood City", "Menlo Park", 1],
    ["Menlo Park", "Palo Alto", 1],
    ["Palo Alto", "California Avenue", 1],
    ["California Avenue", "San Antonio", 1],
    ["San Antonio", "Mountain View", 1],
    ["Mountain View", "Sunnyvale", 1],
    ["Sunnyvale", "Lawrence", 1],
    ["Lawrence", "Santa Clara", 1],
    ["Santa Clara", "San Jose Diridon", 1]
];


var $j = jQuery.noConflict();

function init() {
    initCultrainBox();
    initCultrainClick();
    initCalcFare();
    initDistance();
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

function initCalcFare(){
    $j(".op-cultrain-main").on("click",".op-cultrain-calc-fare",
    function(){
        var start = $j(".op-cultrain-box-start .op-cultrain-station em").html();
        end = $j(".op-cultrain-box-end .op-cultrain-station em").html();
        if(start == end)
        return $j(".op-cultrain-ts").html("Error...Same location").show();
        false;
        $j(".op-cultrain-tab,.op-cultrain-footer").show(),
            $j($j(".op-cultrain-tab li")).show();
        var distance = Distance.shortestPath(start,end),
            fare = caleFare(distance);
        $j(".op-cultrain-content2 .op-cultrain-text .op-cultrain-fareinfo").html(getText(distance,fare));

    })
}

function caleFare(distance){
    if(distance<=1)return '$' +3.25;
    if(distance<=2) return '$' +5.25;
    if(distance<=3) return '$' +7.25;
    if(distance<=4) return '$' + 9.25;
    if(distance<=5) return '$' +11.25;
    else {
        return '$' +13.25;
    }

}


function getText(distance,fare){
    return '<p class="op-cultrain-totaldistance"> Total distance:   <em class="op-cultrain-fare">' + distance + '&nbsp' +'Stations'+ '</em></p>' +
            '<p class="op-cultrain-totalprice"> Use via Ticket Machine: Total Price: <em class="op-cultrain-fare ">' + fare +'</em></p>';
}


function initDistance(){
    Distance.addEdges(edgesData);
}

init();
