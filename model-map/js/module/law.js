publicObj.internetRegulation = {
    selectData: {
        "0": ["广告", "合同", "商标", "消保", "异常名录、年报", "市场竞争"],
        "1": ["食品", "药品", "化妆品", "医疗器械", "食品标准", "食品标准"],
        "2": ["特种设备", "计量"],
        "3": ["价格法", "行政许可"]
    },
    init() {
        this.fnAjax("lawType=工商行政管理", "0");
        $(".form_datetime").datetimepicker({
            language: "zh-cn",
            format: "yyyy-mm-dd",
            minView: "month",
            autoclose: true
        });
        this.fnClick();
    },
    fnLawTbody(data, index) {
        let tr = "";
        if (data.length) {
            for (let i = 0; i < data.length; i++) {
                tr += `<tr><td>${data[i].title}</td><td>${data[i].publishDate}</td><td>${data[i].secClass}</td><td data-id="${data[i].title}">查看详情</td></tr>`;
            }
        } else {
            tr += '<tr><td colspan="4">暂无数据</td></tr>';
        }
        $("#lawTbody").html(tr);
        if (index) {
            this.fnSelect(index);
        }
    },
    fnSelect(index) {
        let selectData = this.selectData[index],
            oHtml = "<option value=''>全部</option>";
        for (let i = 0; i < selectData.length; i++) {
            oHtml += `<option value="${selectData[i]}">${selectData[i]}</option>`;
        }
        $("#selectId").html(oHtml);
    },
    fnAjax(url, index) {
        let self = this;
        $.ajax({
            type: "GET",
            url: publicObj.oulAll + "system/law/list?" + url,
            dataType: "json",
            success: function (res) {
                if (res.code == "200") {
                    self.fnLawTbody(res.rows, index);
                }
            }
        });
    },
    fnClick() {
        let self = this;
        $("#leftNavList>div").click(function () {
            let oIndex = $(this).index();
            let oText = $(this).text();
            $('#formId')[0].reset();
            self.fnAjax("lawType=" + oText, oIndex);
            $(this).addClass("left_nav_active").siblings().removeClass("left_nav_active");
        });
        $("#resetId").click(function () {
            $('#formId')[0].reset();
        });
        $("#queryId").click(function () {
            let ourl = "";
            let t = $('#formId').serializeArray();
            $.each(t, function () {
                ourl += this.name + '=' + this.value + "&";
            });
            self.fnAjax(ourl);
        })
        $("#tableId").on("click","#lawTbody>tr>td:last-of-type",function () {
            let id = $(this).data("id");
            publicObj.fnPdf("law/"+id);
        });
    }

}
publicObj.internetRegulation.init();