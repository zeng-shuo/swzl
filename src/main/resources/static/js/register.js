var app = new Vue({
    el:"#app",
    data:{
        username:"",
        password:"",
        mail:"",
        code:"",
        umessage: "",
        pmessage: "",
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
        doRegister:function () {
            if (this.username==""){this.umessage = "请输入用户名";return false;}
            if (this.password==""){this.pmessage = "请输入密码";return false;}
            if (this.mail==""){this.mmessage = "请输入邮箱";return false;}
            if (this.code==""){this.cmessage = "请输入邮箱";return false;}

            var uname = this.username;
            var passwd = this.password;
            var mail = this.mail;
            var code = this.code;

            $.ajax({
                url:"register",
                type:"post",
                dataType:"JSON",
                async:false,
                data:{
                    username:uname,password:passwd,mail:mail,code:code
                },
                success:function (response) {
                    if (response==1){
                        window.location.href = "login";
                    }if(response==0){
                        alert("用户名已经被注册，请更换后提交！");
                    }if (response==2){
                        alert("验证码错误！");
                    }
                },
                error:function (error) {
                    console.error(error);
                }
            });

            // axios.post("register",
            //     {username:uname,password:passwd,mail:mail,code:code}
            // ).then(function (response) {
            //     if (response.data==1){
            //         window.location.href = "login";
            //     }if(response.data==0){
            //         alert("用户名已经被注册，请更换后提交！");
            //     }if (response==2){
            //         alert("验证码错误！");
            //     }
            // },function (error) {
            //     alert(error);
            // });
        }
    }
});