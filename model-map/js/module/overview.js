publicObj.overview = {
    init() {
        publicObj.fnAreaHtml('企业查询',0);
        this.fnAjax();
    },
    fnAjax() {
        $.ajax({
            type: "GET",
            url: "../data/overview.json",
            dataType: "json",
            success: function (res) {
                setTimeout(function () {
                    fnChart.fnPie4("left_pie1");
                    fnChart.fnDrawPieArea("drawPieArea");
                    fnChart.fnBarY1("chart_bar1", res.bar1.data, res.bar1.yData,);
                    fnChart.fnBarY("chart_bar2", res.bar.data, res.bar.yData);
                    fnChart.fnPie1("left_bar", res.bar3.data, res.bar3.yData, );
                }, 1000);
            }
        });
        this.fnClick();
    },
    fnClick() {
        $(".centerHtml").off("changed.bs.select").on('changed.bs.select', '#mySelect', function () {
            publicObj.fnSelectChanged(["floorHtml","areaHtml"]);
        });
    }
}
publicObj.overview.init();