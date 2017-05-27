function showThreeChartsWhenViewTask() {
    $("#threeCharts").css("display", "block");
}

load();
//alert(location.href)
function load() {
    $('#datatable2').dataTable().fnClearTable();
    $('#datatable2').dataTable().fnDestroy();
    $.ajax({
    type: "POST",
    url: "http://localhost:3001/orders/getOrderByFactory.json", //接口名字
    dataType: "json",
    //contentType: "application/json; charset=utf-8",
    data: {
        factoryId: 1
    },
    success: function (data) {
        for (var i = 0; i < data.data.length; i++) {
            data.data[i].button = '<button  class="btn btn-md btn-info" style="height: 25px;font-size: 10px;"><i class="fa fa-search">操作</i></button>';
        }
        var dt = $('#datatable2').dataTable({
            "oLanguage": {
                "sProcessing": "处理中...",
                "sLengthMenu": "_MENU_ 记录/页",
                "sZeroRecords": "没有匹配的记录",
                "sInfo": "显示第 _START_ 至 _END_ 项记录，共 _TOTAL_ 项",
                "sInfoEmpty": "显示第 0 至 0 项记录，共 0 项",
                "sInfoFiltered": "(由 _MAX_ 项记录过滤)",
                "sInfoPostFix": "",
                "sSearch": "查找:",
                "sUrl": "",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "上页",
                    "sNext": "下页",
                    "sLast": "末页"
                },
            },
            "bStateSave": false,
            "iDisplayLength": 50,
            "bSort": false,
            "aoColumns": [
                {
                    "data": "id"
                },
                {
                    "data": "user_id"
                },
                {
                    "data": "total_price"
                },
                {
                    "data": "cleaning_status"
                },
                {
                    "data": "created_at"
                },
                {
                    "data": "button"
                }
    ],
            "fnDrawCallback": function (oSettings) {
                $('#datatable2').find('button').bind('click', function (e) {
                    var obj = this.parentNode.parentNode;
                    var status = obj.childNodes[3].innerText;
                    var oderid = obj.childNodes[0].innerText;
                    if (status == "0") {
                        $("#s0").css("color", "red");
                        $('#change').val('点击接收');

                    } else if (status == "1") {
                        $("#s1").css("color", "red");
                        $('#change').val('已接收');
                    } else if (status == "2") {
                        $("#s2").css("color", "red");
                        $('#change').val('已洗完');
                    } else if (status == "3") {
                        $("#s3").css("color", "red");
                        $('#change').val('已送出');

                    }
                    
                    $('#table-modal-addOneNodeForUser').modal('show');
                    $('#oderid').html(oderid);
                });
            },
            data: data.data,
        });
    },
    error: function (d) {
        console.log(d);
    }
})}

function change() {
    $('#datatable2').dataTable().fnClearTable();
    $('#datatable2').dataTable().fnDestroy();

    
    var orderId = $('#oderid').html();
    console.log(orderId);
    var val = $('#change').val();
    if (val == "点击接收") {
        $.ajax({
            type: "POST",
            url: "http://localhost:3001/orders/createProductItem.json", //接口名字，根据状态和节点id获取任务列表
            dataType: "json",
            data: {
                orderId: orderId
            },
            success: function (data) {
                if (data.data == "Succ") {
                    alert(data.data);
                }
            },
            error: function (d) {}
        });
    }
    else if (val == "已接收") {
        $.ajax({
            type: "POST",
            url: "http://localhost:3001/orders/finishCleaning.json", //接口名字，根据状态和节点id获取任务列表
            dataType: "json",
            data: {
                orderId: orderId
            },
            success: function (data) {
                if (data.data == "Succ") {
                    alert(data.data);
                }
            },
            error: function (d) {}
        });
    } else if (val == "已洗完") {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/node/getTaskByNode", //接口名字，根据状态和节点id获取任务列表
            dataType: "json",
             data: {
                orderId: orderId
            },
            success: function (data) {
                if (data.data == "Succ") {
                    alert(data.data);
                }
            },
            error: function (d) {}
        });
    } else if (val == "已送出") {
        alert("又完成一单好开心呀");
    }
    load();
}

