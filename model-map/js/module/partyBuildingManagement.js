publicObj.partyBuildingManagement = {
    init() {
        this.fnAjax();
    },
    fnAjax() {
        $.ajax({
            type: "GET",
            url: "../data/overview.json",
            dataType: "json",
            success: function (res) {
                setTimeout(function () {
                    fnChart.fnPartyPie("party_pie1", res.partyPie1.data, '全局领导干部数');
                    fnChart.fnPartyPie("party_pie2", res.partyPie2.data, '活动类型占比');
                    fnChart.fnPartyPie("party_pie3", res.partyPie3.data, '年龄分布');
                    fnChart.fnPie1("party_bar1", res.partyBar1.data, res.partyBar1.yData, '历年发展党员数量');
                    fnChart.fnPartyBar("party_bar2", res.bar5.data, res.bar5.yData, '历年活动数量统计');
                }, 1000);
            }
        });
    },
   
}
publicObj.partyBuildingManagement.init();