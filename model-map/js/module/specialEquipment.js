var tableIndex = 0;
publicObj.specialEquipment = {
    popupBox: [{
        replicator: "翁峰",
        telephone: "18621176278",
        maintenance: fnNewDate(15, "2020-10-08"),
        maintainer: ["张三", "李四", "王五"]
    }],
    init() {
        this.fnAjax();
        this.fnRuning();
        this.fnTable();
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
                for (var i = 0; i < res.bar.data.length; i++) {
                    dataShadow.push(res.bar.yMax);
                };
                setTimeout(function () {
                    fnChart.fnPie("specialEquipment_pie1", [
                        { value: 100, name: '' },
                        { value: 0, name: '' },
                    ]);
                    fnChart.fnPie("specialEquipment_pie2", [
                        { value: 50, name: '' },
                        { value: 0, name: '' },
                    ]);
                }, 1000);
            }
        });
    },
    fnRuning() {
        let elevatorNum = 10;
        let boilerNum = 10;
        for (let i = 0; i < 10; i++) {
            if (i < elevatorNum) {
                $(".running_elevator").append(`<div class="normal_num"></div>`)
            } else {
                $(".running_elevator").append(`<div class="abnormal_num"></div>`)
            }

            if (i < boilerNum) {
                $(".running_boiler").append(`<div class="normal_num"></div>`)
            } else {
                $(".running_boiler").append(`<div class="abnormal_num"></div>`)
            }
        }
    },
    fnTable() {
        $(".table_box .title>div").on("click", function () {
            tableIndex = $(this).index();
            $(this).addClass("activel").siblings().removeClass("activel");
            if (tableIndex == 0) {
                $(".table_box .table1").show();
                $(".table_box .table2").hide()
                $(".title_spr").show()
                publicObj.fnAreaHtml('特种设备', 1);
            } else {
                $(".table_box .table2").show();
                $(".table_box .table1").hide();
                $(".title_spr").hide()
                publicObj.fnAreaHtml('特种设备', 3);
            }

            $(".popup_box").removeClass("popup_box_active1").addClass("popup_box_active2");
            $(".table_box .table>tbody>tr").removeClass("activel")
        });
    },
    fnPopup() {
        var a = false, b = false, aIndex = null, bIndex = null, cIndex = null, popupBox = this.popupBox;
        $(".centerHtml").on("mouseover", "#equipmentTbody tr", function () {
            aIndex = $(this).index();
            a = true
            fnIconfont(a, b, aIndex, bIndex);
        });
        $(".centerHtml").on("mouseout", "#equipmentTbody tr", function () {
            aIndex = $(this).index();
            a = false
            fnIconfont(a, b, aIndex, bIndex);
        });
        $(".centerHtml").on("click", "#equipmentTbody tr", function () {
            if (tableIndex == 0) {
                let oIndex = $(this).index();
                let selectId = $(this).data("id");
                publicObj.fnAjaxFloor("system/cesdevice/" + selectId, (d) => {
                    let { data } = d;
                    bIndex = oIndex;
                    b = true;
                    $(".popup_box .bum_text").text(data.code.substr(10));
                    $(".popup_box .compName").text(data.compName);
                    $(".popup_box .checkTime").text(data.checkTime);
                    $(".popup_box .spanAbnormal").text(data.runStatus);
                    $("#iconAbnormal").attr("class", `iconfont icon-${data.runStatus == "正常" ? "gouxuankuangxuanzhong" : "jurassic_warning"}`);
                    $(".popup_box .floor").text(data.locationName);
                    if (data.location) {
                        moveTo(data.location);
                    }
                    $(".popup_box .replicator").text(data.person);
                    $(".popup_box .telephone").text(data.tel);
                    let maintenance = fnNewDate(6, data.wbDate), td = "";
                    for (let k in maintenance) {
                        td += `<tr><td>${maintenance[k]}</td><td>${data.person}</td></tr>`;
                    }
                    $("#maintainer").html(td);
                    $(".popup_box").removeClass("popup_box_active2").addClass("popup_box_active1");

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
                });
            } else {
                let oIndex = $(this).index();
                bIndex = oIndex;
                b = true;
                let data = [
                    {
                        checkTime: "2021.11.18",
                        code: "1200310108201602000",
                        compName: "上海远运投资管理有限公司",
                        deviceType: "电梯",
                        id: 8,
                        location: "协信商务",
                        locationName: "供应五牛控股大厦和东贤大厦",
                        runStatus: "正常",
                        person: "陈海峰",
                        tel: "13395188995",
                        bum_text: 'WNS2.1-0.7/95/70-Q'
                    },
                    {
                        checkTime: "2021.11.18",
                        code: "12003101082016020004",
                        compName: "上海远运投资管理有限公司",
                        deviceType: "电梯",
                        id: 8,
                        location: "协信商务",
                        locationName: "供应五牛控股大厦和东贤大厦",
                        runStatus: "正常",
                        person: "陈海峰",
                        tel: "13395188995",
                        bum_text: 'WNS2.1-0.7/95/70-Q'
                    },
                    {
                        checkTime: "2021.11.8",
                        code: "12003101082016020002",
                        compName: "上海远运投资管理有限公司",
                        deviceType: "电梯",
                        id: 8,
                        location: "协信商业广场",
                        locationName: "供应五牛控股大厦和东贤大厦",
                        runStatus: "正常",
                        person: "傅铁成",
                        tel: "13651806989",
                        bum_text: 'WNS2.1-0.7/95/70-Q'
                    },
                    {
                        checkTime: "2021.11.8",
                        code: "12003101082016020003",
                        compName: "上海远运投资管理有限公司",
                        deviceType: "电梯",
                        id: 8,
                        location: "协信商业广场",
                        locationName: "供应五牛控股大厦和东贤大厦",
                        runStatus: "正常",
                        person: "傅铁成",
                        tel: "13651806989",
                        bum_text: 'WNS2.1-0.7/95/70-Q'
                    }
                ]
                $(".popup_box .bum_text").text(data[oIndex].code.substr(10));
                $(".popup_box .compName").text(data[oIndex].compName);
                $(".popup_box .checkTime").text(data[oIndex].checkTime);
                $(".popup_box .spanAbnormal").text(data[oIndex].runStatus);
                $(".popup_box .person").text(data[oIndex].person);
                $(".popup_box .tel").text(data[oIndex].tel);
                $("#iconAbnormal").attr("class", `iconfont icon-${data[oIndex].runStatus == "正常" ? "gouxuankuangxuanzhong" : "jurassic_warning"}`);
                if (data[oIndex].location) {
                    $(".popup_box .floor").text(data[oIndex].location);
                    moveTo(data[oIndex].location);
                }
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
            }

        });
        $(".popup_box .close").click(function () {
            bIndex = $(this).index();
            b = false
            cIndex = null
            fnIconfont(a, b, aIndex, bIndex);
            $(".popup_box").removeClass("popup_box_active1").addClass("popup_box_active2");
            $(".table_box .table>tbody>tr").removeClass("activel")
        });
    },
    fnEquipmentTr(selectId) {
        if (selectId == "all") {
            let data = publicObj.selectAll, tr = "";
            for (let i = 0; i < data.length; i++) {
                let code = data[i].code.substr(10);
                tr += `<tr data-id="${data[i].id}"><td><div class="normal_num">${i + 1}</div></td><td>${code}</td><td><span class="iconfont icon-weizhi"></span>${data[i].locationName}</td><td><span class="iconfont icon-${data[i].runStatus == "正常" ? "gouxuankuangxuanzhong" : "jurassic_warning"}"></span></td></tr>`;
            }
            $("#equipmentTbody").html(tr);
            $("#nHome").text(data.length+"家");
        } else {
            publicObj.fnAjaxFloor("system/cesdevice/" + selectId, (d) => {
                let { data } = d;
                let tr = `<tr data-id="${data.id}"><td><div class="normal_num">1</div></td><td>${data.code.substr(10)}</td><td><span class="iconfont icon-weizhi"></span>${data.locationName}</td><td><span class="iconfont icon-${data.runStatus == "正常" ? "gouxuankuangxuanzhong" : "jurassic_warning"}"></span></td></tr>`;
                $("#equipmentTbody").html(tr);
            });
            $("#nHome").text("1家");
        }
    },
    fnClick() {
        $(".centerHtml").off("changed.bs.select").on('changed.bs.select', '#mySelect', () => {
            // console.log(selectId)
            let selectId = $('#mySelect').selectpicker('val');
            if (selectId == 'a1' || selectId == 'a2' || selectId == 'a3' || selectId == 'a4') {
                let data = publicObj.selectAll.filter((el) => el.id == selectId), tr = "";
                for (let i = 0; i < data.length; i++) {
                    let code = data[i].code.substr(10);
                    tr += `<tr data-id="${data[i].id}"><td><div class="normal_num">${i + 1}</div></td><td>${code}</td><td><span class="iconfont icon-weizhi"></span>${data[i].location}</td><td><span class="iconfont icon-${data[i].runStatus == "正常" ? "gouxuankuangxuanzhong" : "jurassic_warning"}"></span></td></tr>`;
                }
                $("#equipmentTbody").html(tr);
            } else {
                this.fnEquipmentTr(selectId);
            }
        });
    }
}
publicObj.specialEquipment.init();

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
function addDate(dd, dadd) {
    let a = new Date(dd)
    a = a.valueOf()
    a = a + dadd * 24 * 60 * 60 * 1000 * 15
    a = new Date(a);
    return a;
}
function fnNewDate(n, data) {
    let now = new Date();
    if (data) {
        now = new Date(data);
    }
    let dataTitle = [];
    for (i = 0; i < n; i++) {
        let month = (now.getMonth() + 1);
        dataTitle[i] = (now.getFullYear() + "-" + month + "-" + now.getDate());
        now = addDate(month + "/" + now.getDate() + "/" + now.getFullYear(), -1);
    }
    return dataTitle;
}