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

function showtheHisTask(obj) { //展示历史任务
    var nodeidAndStatus = JSON.stringify({
        nodeId: obj.id,
        status: "2"
    });
    $('#table-modal-his').modal('show');
    // var nodeid=obj.id;
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/node/getTaskByNode", //接口名字，根据状态和节点id获取任务列表
        dataType: "json",
        data: nodeidAndStatus,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var stringfortrlist = "";
            for (var i = 0; i < data.data.length; i++) {
                var idforlog = i + 1;
                var mode = (data.data[i].mode == "0") ? "即时任务" : "定时任务";
                var starttime = data.data[i].startTime;
                var detailMode = data.data[i].mode; //0是即时任务，其他往上推
                var times = data.data[i].times;
                var executimes = data.data[i].execTimes;
                var endtime = data.data[i].endTime;
                var fortasktimeDetails = data.data[i].startTime + "&" + endtime + "&" + detailMode + "&" + times + "/" + executimes;
                var stringfortr = "<tr class=\"gradeX\">" +
                    "<td>" + idforlog + "</td>" +
                    "<td>" + data.data[i].taskName + "</td>" +
                    "<td class=\"hidden-xs\">" + mode + "</td>" +
                    "<td class=\"center hidden-xs\"><a onclick=\"showTheHisTimeInfo(this)\" id='" + fortasktimeDetails + "' class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">查看</a></td>" +
                    "+</tr>";
                stringfortrlist = stringfortrlist + stringfortr;
            }
            $("#datatableForHisTask").dataTable().fnDestroy();
            $('#tbodyforHisTask').html(stringfortrlist);
            AutoCheckLang();
        }
    });
}

function showTheWarnModal(obj) { //关闭节点时先提检查节点上的任务运行情况
    var stringingret = obj.id;
    strs = stringingret.split("&");
    var nodeId = strs[0];
    var amount = strs[1];
    var index = strs[2] - 1; //yao'z
    //var operate=strs[3];//关闭和和开启
    var operate = $("table#datatableForNode tbody").find("tr:eq(" + index + ")").find("td:eq(12)").find("a:eq(0)").text(); //直接从按钮上取，不从id里取

    if (operate == "关闭") { //我要关闭节点啦！！
        alert("我要关闭节点啦！！");
        $("#spanForActiveTask").text(amount); //显示正在执行的任务数
        $("#hiddenforCloseOneNode").val(nodeId); //把nodeId暂存，用于后期删除
        $("#hiddenforCloseIndex").val(index); //用于ajax局部刷新
        $("#hiddenforCloseOperateButton").val(stringingret); //用于ajax局部刷新

        $("#table-modal-closeNode").modal('show');

    } else {
        alert("我要开启节点啦！！");
        $("#hiddenforStartOneNode").val(nodeId); //把nodeId暂存，用于后期开启节点
        $("#hiddenforStartIndex").val(index); //用于ajax局部刷新
        $("#hiddenforStartOperateButton").val(stringingret); //用于ajax局部刷新

        $("#table-modal-ReActiveNode").modal('show');
    }
}

function StartTheNode() { //开启关闭中的节点，只能单个开启
    var index = $("#hiddenforStartIndex").val();
    var nodeIds = $("#hiddenforStartOneNode").val();
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/node/startNode", //接口名字
        dataType: "json",
        data: {
            nodeId: nodeIds
        },
        success: function (data) { //删除成功node/closeNode
            if (data.data != null) { //开启成功了
                alert("开启节点成功！"); //更新按钮和状态信息

                $("table#datatableForNode tbody").find("tr:eq(" + index + ")").find("td:eq(6)").text("空闲");
                $("table#datatableForNode tbody").find("tr:eq(" + index + ")").find("td:eq(12)").find("a:eq(0)").text("关闭");

                var modifyid = $("#hiddenforStartOperateButton").val(); //存的是id
                //$("#"+modifyid+"").text("关闭");
            } else {
                alert("服务器发生了不可言状的错误！找王阿星都不好使");
            }
        }
    });
}

function closeTheNode() { //节点列表页面关闭某个节点，只能单个关闭
    var index = $("#hiddenforCloseIndex").val();
    var nodeIds = $("#hiddenforCloseOneNode").val();
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/node/closeNode", //接口名字
        dataType: "json",
        data: {
            nodeId: nodeIds
        },
        success: function (data) { //删除成功node/closeNode
            if (data.data != null) { //关闭成功了
                alert("关闭节点成功！"); //更新按钮和状态信息
                var modifyid = $("#hiddenforCloseOperateButton").val();
                $("table#datatableForNode tbody").find("tr:eq(" + index + ")").find("td:eq(6)").text("关闭");
                $("table#datatableForNode tbody").find("tr:eq(" + index + ")").find("td:eq(12)").find("a:eq(0)").text("开启");
                //$("#"+modifyid+"").text("开启");
            } else {
                alert("服务器发生了不可言状的错误！找王阿星都不好使");
            }
        }
    });
}

function showTheTimeInfo(obj) { //查看时间信息
    var detailTime = obj.id;
    $("#table-modal-showTaskSchedual").modal("show");
    console.log(obj.id);
    var strs = detailTime.split("&");
    var startTime = strs[0];
    var persistTime = strs[1];
    var realmode = strs[2];
    var times = strs[3];
    if (realmode == 0) { //即时任务
        var stringfortr = "<tr class=\"gradeA\"><td> 开始时间:</td><td>" + startTime + "</td></tr><tr><td>执行时间:</td><td>" + persistTime + "</td> </tr>";
    } else {
        var timemode;
        if (realmode == "1")
            timemode = "按时";
        if (realmode == "2")
            timemode = "按天";
        if (realmode == "3")
            timemode = "按周";
        if (realmode == "4")
            timemode = "按月";
        if (realmode == "5")
            timemode = "按年";
        var stringfortr = "<tr class=\"gradeA\"><td> 开始时间:</td><td>" + startTime + "</td></tr><tr><td>执行时间:</td><td>" + persistTime + "</td></tr><tr><td>定时模式:</td><td>" + timemode + "</td></tr><tr><td>执行次数:</td><td>" + times + "</td> </tr>";
    }
    $('#tbodyForDetailTime').html(stringfortr);
    //$('#idForUsernameWhenDeleteNodes').val(username);
}

function showTheHisTimeInfo(obj) { //查看时间信息
    var detailTime = obj.id;
    $("#table-modal-showTaskSchedual").modal("show");
    console.log(obj.id);
    var strs = detailTime.split("&");
    var startTime = strs[0];
    var endTime = strs[1];
    var realmode = strs[2];
    var times = strs[3];

    if (realmode == 0) { //即时任务
        var stringfortr = "<tr class=\"gradeA\"><td> 开始时间:</td><td>" + startTime + "</td></tr><tr><td>结束时间:</td><td>" + endTime + "</td> </tr>";
    } else {
        var timemode;
        if (realmode == "1")
            timemode = "按时";
        if (realmode == "2")
            timemode = "按天";
        if (realmode == "3")
            timemode = "按周";
        if (realmode == "4")
            timemode = "按月";
        if (realmode == "5")
            timemode = "按年";
        var stringfortr = "<tr class=\"gradeA\"><td> 开始时间:</td><td>" + startTime + "</td></tr><tr><td>结束时间:</td><td>" + endTime + "</td></tr><tr><td>定时模式:</td><td>" + timemode + "</td></tr><tr><td>执行次数:</td><td>" + times + "</td> </tr>";
    }
    $('#tbodyForDetailTime').html(stringfortr);
    //$('#idForUsernameWhenDeleteNodes').val(username);
}

function changeToTaskView(obj) { //用户点击”正在执行的任务“时显示任务列表
    var nodeid = obj.id;
    var nodeidAndStatus = JSON.stringify({
        nodeId: nodeid,
        status: "1"
    });
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/node/getTaskByNode", //接口名字，根据状态和节点id获取任务列表
        dataType: "json",
        data: nodeidAndStatus,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var stringfortrlist = "";
            for (var i = 0; i < data.data.length; i++) {
                var idforlog = i + 1;
                var mode = (data.data[i].mode == "0") ? "即时任务" : "定时任务";
                var starttime = data.data[i].startTime;
                var detailMode = data.data[i].mode; //0是即时任务，其他往上推
                var times = data.data[i].times;
                var executimes = data.data[i].execTimes;

                var nowtime = new Date();


                var seperator1 = "/";
                var seperator2 = ":";
                var year = nowtime.getFullYear();
                var month = nowtime.getMonth() + 1;
                var strDate = nowtime.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currenttime = year + seperator1 + month + seperator1 + strDate + " " + nowtime.getHours() + seperator2 + nowtime.getMinutes() + seperator2 + nowtime.getSeconds();
                starttime = new Date(Date.parse(starttime.replace(/-/g, "/"))).getTime();
                // endtime = new Date(Date.parse(endtime.replace(/-/g,   "/"))).getTime();
                var runtime = new Date(currenttime).getTime() - starttime;
                var day = parseInt(runtime / (1000 * 60 * 60 * 24)); //获取相差多少天
                runtime = runtime - day * (1000 * 60 * 60 * 24);
                var H = parseInt(runtime / (1000 * 60 * 60));
                runtime = runtime - H * (1000 * 60 * 60);
                var M = parseInt(runtime / (1000 * 60));
                runtime = runtime - M * (1000 * 60);
                var S = parseInt(runtime / (1000));
                var persistentTime = day + "天" + H + "时" + M + "分" + S + "秒"; //这是执行时间

                var fortasktimeDetails = data.data[i].startTime + "&" + persistentTime + "&" + detailMode + "&" + times + "/" + executimes;

                var stringfortr = "<tr class=\"gradeX\">" +
                    "<td>" + idforlog + "</td>" +
                    "<td>" + data.data[i].taskName + "</td>" +
                    "<td class=\"hidden-xs\">" + mode + "</td>" +
                    "<td class=\"center hidden-xs\"><a onclick=\"showTheTimeInfo(this)\" id='" + fortasktimeDetails + "' class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">查看</a></td>" +
                    "<td class=\"center hidden-xs\"><a onclick=\"clickTaskbutton(this)\" id='" + nodeid + "'class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">查看</a></td>" +
                    "+</tr>";
                stringfortrlist = stringfortrlist + stringfortr;
            }
            $("#datatableForTask").dataTable().fnDestroy();
            $('#tbodyforTaskList').html(stringfortrlist);
            AutoCheckLang();
        }
    });
    $("#nodeView").css("display", "none");
    $("#taskView").css("display", "block");
    $("#datatableForTask").css("width", "100%");
}

function showThreeChartsWhenViewTask() {
    $("#threeCharts").css("display", "block");
}

function eventForidforReload() { //刷新按钮重新加载数据
    var nodeid = obj.id;
    var nodeidAndStatus = JSON.stringify({
        nodeId: nodeid,
        status: "1"
    });
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/node/getTaskByNode", //接口名字，根据状态和节点id获取任务列表
        dataType: "json",
        data: nodeidAndStatus,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var stringfortrlist = "";
            for (var i = 0; i < data.data.length; i++) {
                var idforlog = i + 1;
                var mode = (data.data[i].mode == "0") ? "即时任务" : "定时任务";
                var starttime = data.data[i].startTime;
                var detailMode = data.data[i].mode; //0是即时任务，其他往上推
                var times = data.data[i].times;
                var executimes = data.data[i].execTimes;

                var nowtime = new Date();


                var seperator1 = "/";
                var seperator2 = ":";
                var year = nowtime.getFullYear();
                var month = nowtime.getMonth() + 1;
                var strDate = nowtime.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currenttime = year + seperator1 + month + seperator1 + strDate + " " + nowtime.getHours() + seperator2 + nowtime.getMinutes() + seperator2 + nowtime.getSeconds();
                starttime = new Date(Date.parse(starttime.replace(/-/g, "/"))).getTime();
                // endtime = new Date(Date.parse(endtime.replace(/-/g,   "/"))).getTime();
                var runtime = new Date(currenttime).getTime() - starttime;
                var day = parseInt(runtime / (1000 * 60 * 60 * 24)); //获取相差多少天
                runtime = runtime - day * (1000 * 60 * 60 * 24);
                var H = parseInt(runtime / (1000 * 60 * 60));
                runtime = runtime - H * (1000 * 60 * 60);
                var M = parseInt(runtime / (1000 * 60));
                runtime = runtime - M * (1000 * 60);
                var S = parseInt(runtime / (1000));
                var persistentTime = day + "天" + H + "时" + M + "分" + S + "秒"; //这是执行时间

                var fortasktimeDetails = data.data[i].startTime + "&" + persistentTime + "&" + detailMode + "&" + times + "/" + executimes;

                var stringfortr = "<tr class=\"gradeX\">" +
                    "<td>" + idforlog + "</td>" +
                    "<td>" + data.data[i].taskName + "</td>" +
                    "<td class=\"hidden-xs\">" + mode + "</td>" +
                    "<td class=\"center hidden-xs\"><a onclick=\"showTheTimeInfo(this)\" id='" + fortasktimeDetails + "' class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">查看</a></td>" +
                    "<td class=\"center hidden-xs\"><a onclick=\"showThreeChartsWhenViewTask()\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">查看</a></td>" +
                    "+</tr>";
                stringfortrlist = stringfortrlist + stringfortr;
            }
            $("#datatableForTask").dataTable().fnDestroy();
            $('#tbodyforTaskList').html(stringfortrlist);
            AutoCheckLang();
        }
    });
}
load();
//alert(location.href)
function load() {
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
