//登录校验
function goLogin() {
    var uName = document.getElementById("uName").value;
    var uPwd = document.getElementById("pwd").value;
    
    var noErr = true;
    if (uName.length > 20 || uName.length < 8) {
        alert("用户名请输入8-20位字符");
        noErr = false;
        return;
    } else if ((uName.charCodeAt(i) < 97) || (uName.charCodeAt(i) > 122)) {
        // oErr.innerHTML = "用户名必须以字母开头";
        alert("用户名必须以字母开头");
        return;
    } else for (var i = 0; i < uName.charCodeAt(i); i++) {
        if ((uName.charCodeAt(i) < 48) || (uName.charCodeAt(i) > 57) && (uName.charCodeAt(i) < 97) || (uName.charCodeAt(i) > 122)) {
            // oError.innerHTML = "必须为字母跟数字组成!";
            alert("必须为字母跟数字组成!");
            return;
        }
    } if (uPwd.length > 20 || uPwd.length < 6) {
        //oErr.innerHTML = "请输入6-20位的密码!"
        alert("请输入6-20位的新密码!");
        noErr = false;
        return;
    }
    alert("登录成功")
    
}

function goRegist() {
    var uName = document.getElementById("uName").value;
    var uPwd = document.getElementById("pwd").value;
    var agePwd = document.getElementById("pwd_ag").value;
    //var oErr = document.getElementById("oError");
    var noErr = true;
    if (uName.length > 20 || uName.length < 8) {
        alert("用户名请输入8-20位字符");
        noErr = false;
        return;
    } else if ((uName.charCodeAt(i) < 97) || (uName.charCodeAt(i) > 122)) {
        // oErr.innerHTML = "用户名必须以字母开头";
        alert("用户名必须以字母开头");
        return;
    } else for (var i = 0; i < uName.charCodeAt(i); i++) {
        if ((uName.charCodeAt(i) < 48) || (uName.charCodeAt(i) > 57) && (uName.charCodeAt(i) < 97) || (uName.charCodeAt(i) > 122)) {
            // oError.innerHTML = "必须为字母跟数字组成!";
            alert("必须为字母跟数字组成!");
            return;
        }
    } if (uPwd.length > 20 || uPwd.length < 6) {
        //oErr.innerHTML = "请输入6-20位的密码!"
        alert("请输入6-20位的新密码!");
        noErr = false;
        return;
    }else if(uPwd!=agePwd){
        alert("两次输入的密码不一致!");
        noErr = false;
        return;
    }
    alert("注册成功")
}
