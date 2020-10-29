publicObj.foodSupervision = {
    init() {
        this.fnAjax();
        this.fnPopup();
        fnHtml("iframeHtml");
        this.fnClick();
    },
    fnAjax() {
        $.ajax({
            type: "GET",
            url: "../data/overview.json",
            dataType: "json",
            success: function (res) {
                var dataShadow = [];
                for (var i = 0; i < res.bar4.data.length; i++) {
                    dataShadow.push(res.bar4.yMax);
                };
                setTimeout(function () {
                    fnChart.fnBarY2("foodSupervision_bar1", res.bar5.data, res.bar5.yData, '告警数分析');
                    fnChart.fnPie1("foodSupervision_bar2", res.bar4.data, res.bar4.yData, '告警企业分析');
                    fnChart.fnPie1("foodSupervision_bar4", res.foodSupervision_bar4.data, res.foodSupervision_bar4.yData, '近一周', "#fff");
                    fnChart.fnBar("foodSupervision_bar3", res.foodSupervision_bar3.data, res.foodSupervision_bar3.yData, res.foodSupervision_bar3.yMax, '告警因素分析');
                }, 1000);
            }
        });
    },
    fnPopup() {
        var a = false,
            b = false,
            aIndex = null,
            bIndex = null,
            cIndex = null
        $(".table_box .table>tbody>tr").on("mouseover", function () {
            aIndex = $(this).index();
            a = true
            fnIconfont(a, b, aIndex, bIndex);
        });
        $(".table_box .table>tbody>tr").on("mouseout", function () {
            aIndex = $(this).index();
            a = false
            fnIconfont(a, b, aIndex, bIndex);
        });
        $(".centerHtml").on('click', '#foodTbody tr', function () {
            let oIndex = $(this).index();
            let selectId = $(this).data("id");
            publicObj.fnAjaxFloor("system/cesbasenodefood/" + selectId, (d) => {
                bIndex = oIndex;
                b = true;
                let {
                    data
                } = d;
                $(".popup_box .nameSpan").text(data.compName);
                $(".popup_box .link").text(data.link);
                $(".popup_box .tel").text(data.tel);
                $(".popup_box .oaddress").text(data.address);
                $(".popup_box .police").text(Math.ceil(Math.random() * 3));
                moveTo("大型餐饮定位-" + data.mark);
                if (bIndex != cIndex) {
                    if (cIndex == null) {
                        $(".popup_box").removeClass("popup_box_active2").addClass("popup_box_active1");
                    } else {
                        $(".popup_box").removeClass("popup_box_active1");
                        setTimeout(() => {
                            $(".popup_box").removeClass("popup_box_active2").addClass("popup_box_active1");
                        }, 200)
                    }
                    cIndex = bIndex
                } else {
                    $(".popup_box").removeClass("popup_box_active2").addClass("popup_box_active1");
                }
                $(".table_box .table>tbody>tr").eq(oIndex).addClass("activel").siblings().removeClass("activel");
                fnIconfont(a, b, aIndex, bIndex);
            })

        });
        $(".popup_box .close").click(function () {
            bIndex = $(this).index();
            b = false
            fnIconfont(a, b, aIndex, bIndex);
            cIndex = null
            $(".popup_box").removeClass("popup_box_active1").addClass("popup_box_active2");
            $(".table_box .table>tbody>tr").removeClass("activel")
        });
    },
    fnEquipmentTr(selectId) {
        if (selectId == "all") {
            let data = publicObj.selectAll,
                tr = "";
            for (let i = 0; i < data.length; i++) {
                tr += `<tr data-id="${data[i].id}"><td><div class="normal_num">${i + 1}</div></td><td>${data[i].compName}</td><td><span class="iconfont icon-weizhi"></span></td></tr>`;
            }
            $("#foodTbody").html(tr);
            $("#home").text(data.length + "家");
        } else {
            publicObj.fnAjaxFloor("system/cesbasenodefood/" + selectId, (d) => {
                let arrs = [],
                    tr = "";
                if (typeof d.data === "object" && d.data.id) {
                    arrs.push(d.data);
                } else {
                    arrs = d.rows;
                }
                for (let i = 0; i < arrs.length; i++) {
                    tr += `<tr data-id="${arrs[i].id}"><td><div class="normal_num">${i+1}</div></td><td>${arrs[i].compName}</td><td><span class="iconfont icon-weizhi"></span></td></tr>`
                }
                $("#foodTbody").html(tr);
                $("#home").text(arrs.length + "家");
            });
        }
    },
    fnClick() {
        let self = this;
        $(".centerHtml").off("changed.bs.select").on('changed.bs.select', '#mySelect', () => {
            let selectId = $('#mySelect').selectpicker('val');
            this.fnEquipmentTr(selectId);
        });
        $("#foodLeftTop>div .info_num").click(function () {
            let id = $(this).data("id");
            if (id != "all") {
                id = "list?" + id;
            }
            self.fnEquipmentTr(id);
        });
    }
}
publicObj.foodSupervision.init();

function fnIconfont(a, b, aIndex, bIndex) {
    if (b) {
        $(".icon-weizhi").removeClass("activel");
        $(".icon-weizhi").eq(bIndex).addClass("activel");
    } else {
        $(".icon-weizhi").removeClass("activel");
    }
    if (a) {
        $(".icon-weizhi").eq(aIndex).addClass("activel");
    } else {
        $(".icon-weizhi").eq(aIndex).removeClass("activel");
    }
}