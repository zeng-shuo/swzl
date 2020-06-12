var app = new Vue({
    el:"#app",
    data:{
        username:"",
        newpass:"",
        newpass2:"",
        mail:"",
        code:"",
        pmessage: "",
        pmessage2: "",
        pmessage3:"",
        umessage:"",
        mmessage:"",
        cmessage:""
    },
    methods:{
        getCode:function () {
            if (this.mail==""){this.mmessage = "请输入邮箱";return false;}
            var mail = this.mail;
            $("#codeBtn").attr('disabled','disabled');
            $("#codeBtn").val("已发送");
            axios.post("getcode",
                {mail:mail}
            ).then(function (response) {
                alert("邮箱已发送，请注意查收！")
            },function (error) {
                alert(error);
            });
        },
        doRepassword:function () {
            if (this.username == "") {
                this.umessage = "请输入用户名";
                return false;
            }
            if (this.newpass == "") {
                this.pmessage = "请输入新密码";
                return false;
            }
            if (this.newpass2 == "") {
                this.pmessage2 = "请确认密码";
                return false;
            }
            if (this.mail == "") {
                this.mmessage = "请输入邮箱";
                return false;
            }
            if (this.code == "") {
                this.cmessage = "请输入验证码";
                return false;
            }
            if (this.newpass != this.newpass2) {
                this.pmessage3 = "两次输入密码不一致！";
                return false;
            }

            var username = this.username;
            var newpass = this.newpass;
            var mail = this.mail;
            var code = this.code;
            $.ajax({
                url: "repassword",
                async: false,
                type: "post",
                data: {username:username,newpass: newpass, mail: mail, code: code},
                success: function (response) {
                    console.error(response);
                    console.error(typeof response);
                    if (response == 0) {
                        alert("验证码错误！");
                    } else if (response == 2) {
                        alert("当前邮箱未绑定任何账户！")
                    } else {
                        alert("密码重置成功！");
                        location.href = "login";
                    }
                },
                error: function (error) {
                    alert(error)
                }
            });
        }
    }
});