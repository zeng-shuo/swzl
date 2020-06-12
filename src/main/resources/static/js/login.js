var app = new Vue({
    el:"#app",
    data:{
        username:"",
        password:"",
        umessage: "",
        pmessage: ""
    },
    mounted:function(){
       var cookies =  document.cookie.split(";");
       for(var i=0;i<cookies.length;i++){
           var map = cookies[i].split("=");
           if (map[0].toString().trim()=='unameCookie'){
               this.username = map[1];
           }
           if (map[0].toString().trim()=="passwdCookie"){
               this.password = map[1];
           }
       }
    },
    methods:{
        doLogin:function () {
            if (this.username==""){this.umessage = "请输入用户名";return false;}
            if (this.password==""){this.pmessage = "请输入密码";return false;}
            var uname = this.username;
            var passwd = this.password;
            var checked = $("#checked1").prop("checked");

            $.ajax({
                url:"login",
                type:"post",
                dataType:"JSON",
                async:false,
                data:{
                  username:uname,password:passwd,remember:checked.toString()
                },
                success:function (response) {
                    if (response==1){
                        window.location.href = "index";
                    }
                    if (response==0){
                        alert("用户名或密码错误")
                    }
                    if (response==2){
                        location.href = "admin/userManage";
                    }
                },
                error:function (error) {
                    console.error(error);
                }
            });

            // axios.post("login",
            //     {username:uname,password:passwd,remember:checked.toString()}
            // ).then(function (response) {
            //     if (response.data==1){
            //         window.location.href = "index";
            //     }
            //     if (response.data==0){
            //         alert("用户名或密码错误")
            //     }
            //     if (response.data==2){
            //         location.href = "admin/userManage";
            //     }
            // },function (error) {
            //     alert(error);
            // });
        }
    }
});