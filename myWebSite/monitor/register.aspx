<%@ Page Language="C#" AutoEventWireup="true" CodeFile="register.aspx.cs" Inherits="register" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
<link href="css/public.css" rel="stylesheet" media="screen"/>
    <script src="js/jquery-1.11.3.min.js"></script>

<script>
    window.onload = function () {

    }

    $(document).ready(function () {


        $("#login").click(function () {
            location.href = "../login.html";

        });




    });
</script>
<style>
.login{
		width: 350px;
		height:330px;
	margin:50px auto;
    font-family:"Helvetica Neue", Helvetica, Arial, sans-serif;
	background-color:#FFF;
	-webkit-border-radius: 6px;
	-moz-border-radius: 6px;
	border-radius: 6px;
	-webkit-box-shadow: 0 1px 4px rgba(0,0,0,.065);
	-moz-box-shadow: 0 1px 4px rgba(0,0,0,.065);
	box-shadow: 0 1px 4px rgba(0,0,0,.065);
		border: 1px solid #e5e5e5;

	}
.login li{
		width: 300px;
		height:30px;
	    margin:15px 25px;

	}

input::-webkit-input-placeholder
{
	color:#e5e5e5;
	
	}
.login li:nth-child(1){
	    margin-top:20px;
		font-size:25px;
	}
.login li input{
		width: 290px;
		height:30px;
		font-size:16px;
        padding-left:10px;
	}
#btnLogup{
    width:300px;
		height:30px;
        margin:0px;
		padding:0px;
			text-indent: 0em;

	}



input[name=login]{
		width: 30px;
		height:30px;
	    margin:5px 15px;
        text-indent: 0em;
	}
.login li:last-child{
		color:#a5a5a5;
        cursor:pointer;
	}
</style>
</head>
<body>
    <form id="form1" runat="server">

    <div class="login">
    <ul>
    <li>注 册</li>
    <li><asp:TextBox ID="tbUserId" runat="server" Type="text" placeholder="用户名"/></li>
    <li><asp:TextBox ID="tbUserPwd" runat="server" Type="password" placeholder="密 码"/></li>
    <li><asp:TextBox ID="tbPwdConfirm" runat="server" Type="password" placeholder="确 认"/></li>
    <li><asp:TextBox ID="tbEmail" runat="server" Type="text" placeholder="邮 箱"/></li>
    <li><asp:Button ID="btnLogup" runat="server" Text="注 册"  class="btn btn-large btn-primary" type="submit" OnClick="btnLogup_Click"/></li>
        <li id="login">返 回</li>

    </ul>
    </div>
    </form>
</body>
</html>
