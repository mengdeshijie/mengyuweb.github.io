publicObj.floor = {
    isChanged: true,
    init() {
        publicObj.fnAreaHtml(publicObj.selectRow.compName);
        moveTo(publicObj.selectRow.areaHomesLayer);
        if (publicObj.modelCllck) {
            publicObj.fnAjaxFloor("system/node/selectlist?areaHomesLayer=" + publicObj.modelCllck, (d) => {
                this.fnEnterpriseTr(d.rows);
            });
        } else {
            this.fnEnterpriseTr(publicObj.selectRow);
        }
        publicObj.modelCllck = "";
        this.fnClick();
    },
    fnRowAjax(url, floorName) {
        publicObj.fnAjaxFloor(url + floorName, (d) => {
            this.fnEnterpriseTr(d.rows, floorName);
        });
    },
    fnEnterpriseTr(o, floorName) {
        let lis = "", home = "1";
        if (o && o.id) {
            let { id, compName, areaHomesLayer } = o;
            lis = `<tr data-id="${id}"><td>${compName}</td><td class="details">信息</td></tr>`;
            this.fnIndexOf(areaHomesLayer, 1);
        } else {
            for (let k in o) {
                lis += `<tr data-id="${o[k].id}"><td>${o[k].compName}</td><td class="details">信息</td></tr>`;
            }
            home = o.length;
            if (floorName) {
                let f = floorName.split("-").length;
                if (f > 2) {//单条
                    this.fnIndexOf(floorName, 1);
                } else {
                    this.fnIndexOf(floorName);
                }
            }
        }
        $("#home").text(`${home}家`);
        if (!lis) {
            lis = `<tr class="noData"><td>暂无数据</td></tr>`;
        }
        $("#htmlUlLi").html(lis);
    },
    fnIndexOf(floorName, n) {
        let tung = "A", num = "", layer = "";
        if (n == 1) {
            num = floorName.substring(floorName.length - 2);
            layer = `/${num}层`;
        }
        if (floorName.indexOf("B001") == -1) {
            tung = "B";
        }
        $("#tung").text(`${tung}栋${layer}`);
    },
    fnClick() {
        let self = this;
        $(".centerHtml").off("changed.bs.select").on('changed.bs.select', '#mySelect', () => {
            publicObj.fnSelectChanged();
            moveTo(publicObj.selectRow.areaHomesLayer);
            this.fnEnterpriseTr(publicObj.selectRow);
            this.isChanged = false;
        });
        // $("#htmlUlLi").off("click").on('click', '.details', function () {
        //     publicObj.selectRow.id = $(this).parent().data("id");
        //     console.log($(this).parent().data("id"))
        //     fnHtml({
        //         id: "modalHtml",
        //         fn: () => {
        //             $('.modal_delete').click(function (event) {
        //                 event.preventDefault();
        //                 $('#modal-container').addClass('out');
        //             });
        //             self.isChanged = true;
        //         }
        //     });
        // });
       
        $("#htmlUlLi").off("click").on('click', 'tr', function () {
            let oIndex = $(this).index();
            $(".table_box .table>tbody>tr").eq(oIndex).addClass("activel").siblings().removeClass("activel");
            publicObj.selectRow.id = $(this).data("id");
            fnHtml({
                id: "modalHtml",
                fn: () => {
                    $('.modal_delete').click(function (event) {
                        event.preventDefault();
                        $('#modal-container').addClass('out');
                    });
                    self.isChanged = true;
                }
            });
        });
    }
}
publicObj.floor.init();