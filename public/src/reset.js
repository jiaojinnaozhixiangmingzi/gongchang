function check(){
            var oldPW = document.getElementById("old_encrypted_password").value;
            var newPW = document.getElementById("new_encrypted_password").value;
            var renewPW = document.getElementById("renew_encrypted_password").value;
            if (oldPW == null || oldPW == undefined || oldPW == "") {
                alert("请输入旧密码。");
             }else if (newPW == null || newPW == undefined || newPW == "") {
                alert("请输入新密码。");
            }else if (renewPW == null || renewPW == undefined || renewPW == "") {
                alert("请确认密码。");
            }else{
                if(newPW == renewPW){
                resetPassword(oldPW,newPW);}
                else{
                    alert("请确认两次密码输入相同。")
                }
                }
        }
 function resetPassword(oldPW,newPW){
            
            //alert(old_encrypted_password+new_encrypted_password);
            var oldPW = oldPW;
            var newPW = newPW;
             var url = "http://localhost:3000/factories/8/reset?old_encrypted_password="+oldPW+"&&new_encrypted_password="+newPW;
             //alert(url);

              $.ajax({
                type:"POST",
                url: url,
                data:{},
                dataType: "json",
                success: function (data) {
                if(data.data == "Reset succ"){
                alert("密码修改成功！");
                window.location.href="src/showHome.html";
                }else{
                alert("您输入的账号密码有误，请重新输入");
                }
            },
                error: function(){
                alert("您输入的账号密码有误，请重新输入");
                }
             });


        }