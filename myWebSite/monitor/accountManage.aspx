<%@ Page Language="C#" AutoEventWireup="true" CodeFile="accountManage.aspx.cs" Inherits="monitor_accountManage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>账户管理</title>
  <!--Jquery-->
    <script src="//cdn.bootcss.com/jquery/2.2.1/jquery.min.js"></script>


    <!--bootstrap-->
    <link href="http://libs.baidu.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet" />
    <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
    <script src="http://libs.baidu.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>

    <!-- public -->
    <link href="css/public.css" rel="stylesheet" media="screen" />
    <script src="js/public.js"></script>

<%--<script src="jquery-1.11.3.min.js"></script>
        <script type="text/javascript">
            function gvselchange(o1, o2, o3) {
                document.getElementById("<%=tbUserName.ClientID %>").value = o1;
            document.getElementById("<%=tbConfirmName.ClientID %>").value = o1;
            document.getElementById("<%=tbEmail.ClientID %>").value = o2;
            if (o3 == "系统管理员") {
                document.getElementById("<%=cb1.ClientID %>").checked = true;
                document.getElementById("<%=cb2.ClientID %>").checked = false;
            }
            else if (o3 == "普通用户") {
                document.getElementById("<%=cb1.ClientID %>").checked = false;
                document.getElementById("<%=cb2.ClientID %>").checked = true;
            }
            else {
                document.getElementById("<%=cb1.ClientID %>").checked = false;
                document.getElementById("<%=cb2.ClientID %>").checked = false;
            }
    }// →JS文件
    </script>--%>
    <style type="text/css">

        .account{
	width:980px;
	float:left;
	color:#999;
	}
.account-title{
	margin-top: 20px;
	width: 978px;
	float: left;
	-webkit-border-radius: 4px 4px 0px 0px;
    -moz-border-radius: 4px 4px 0px 0px;
    border-radius: 4px 4px 0px 0px;
	}
.account-title li:nth-child(1){
	float:left;
	margin:10px 0px 0px 20px;
}
.account-context
{
	float:left;
	width:918px;
	height:350px;
	margin-top:-1px;
	padding:20px 30px 30px 30px;
	background-color:white;
	border: 1px solid #d4d4d4;

}
.account-context ul{
	width:978px;
	display:block;
	float:left;
	}
.account-context li{
	height:35px;
	float:left;
	line-height:35px;
	
	}	

.account-context  input{
	width:20px;
	height:22px;

	float:left;
    font-family:"黑体";
	text-indent:0em;
box-sizing:border-box;
-moz-box-sizing:border-box; /* Firefox */
-webkit-box-sizing:border-box; /* Safari */
	}

.account-context table{
	float:left;
    color:black;
    border:0px;
	}

.account-context table td{
	padding:0px 5px 0px 0px;
	width:120px;
	height:35px;
	text-align:center;
	}

        #btnModify,#btnAdd,#btnDel{
        margin-right:5px;
        
        }

select{
	width: 26px;
	height: 20px;
	color: #bfbfbf;
	font-size: 14px;
	font-family: "黑体","Helvetica Neue", Helvetica, Arial, sans-serif;
	background-color: rgba(0,0,0,0.0);
	border: 1px solid #d9d9d9;
	-webkit-box-shadow: 0 1px 6px rgba(0,0,0,0.08);
	-moz-box-shadow: 0 1px 6px rgba(0,0,0,0.08);
	box-shadow: 0 1px 6px rgba(0,0,0,0.08);
	-webkit-border-radius: 4px;
	-moz-border-radius: 4px;
	border-radius: 4px;
	float: left;
	text-indent: 0.5em;

  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
     -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border linear 0.2s, box-shadow linear 0.2s;
     -moz-transition: border linear 0.2s, box-shadow linear 0.2s;
       -o-transition: border linear 0.2s, box-shadow linear 0.2s;
          transition: border linear 0.2s, box-shadow linear 0.2s;

   </style>
</head>
<body>
    <form id="form1" runat="server">
     <div id="myexample">
        <nav class="navbar navbar-default" role="navigation">
            <ul class="nav navbar-nav">
                <li><div id="logo"></div><a class="tCloud"></a></li>
                <li><a href="../home.html"><div class="icon-nav0"></div><span>首 页</span></a></li>
                <li><a href="index.html"><div class="icon-nav1"></div><span>生产监控</span></a></li>
                <li><a href="production.html"><div class="icon-nav2"></div><span>生产管理</span></a></li>
                <li><a href="equipment.html"><div class="icon-nav3"></div><span>设备管理</span></a></li>
                <li class="active"><a href="afterSale.html"><div class="icon-nav4"></div><span>设备维护</span></a></li>
                <li><a href="mould.html"><div class="icon-nav5"></div><span>工艺管理</span></a></li>
                <li><a href="statistics.html"><div class="icon-nav6"></div><span>数据统计</span></a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li><a id="action-1" href="#">信息</a></li>
                        <li><a>退出</a></li>

                    </ul>
                </li>
            </ul>
        </nav>
    </div>
<div class="content">
<div class="side-bar">
  <div class="side-bar-inner">
    
    <li class="active"> <a href="afterSale.html"><i class="icon-chevron-right"></i>账户管理</a> </li>
    <li> <a href="afterSale.html"><i class="icon-chevron-right"></i>售后维修</a> </li>
    <li> <a href="store.html"><i class="icon-chevron-right"></i>商城</a> </li>
    <li> <a href="https://tederic.kf5.com"><i class="icon-chevron-right"></i>帮助</a> </li>
 
  </div>
</div>
<div class="account">
 


            <!-- block -->
   
<%--                <div class="account-title bar-background">
                    <li>用户信息管理</li>
                </div>
    <div class="account-context">
                <div>
                    <div >
                        <table style="width: 544px; height: 40px;">
                            <tr>
                                <td style="width:90px;text-align:right">
                                    <asp:Label ID="Label1" runat="server" Text="查询条件："></asp:Label></td>
                                <td style="padding-top: 3px">
                                    <asp:DropDownList ID="DropQuerry" runat="server" Width="100px" Height="22px">
                                        <asp:ListItem>用户名</asp:ListItem>
                                        <asp:ListItem>邮箱</asp:ListItem>
                                    </asp:DropDownList></td>
                                <td style="padding-top: 0px; padding-right: 5px; padding-left: 5px;">
                                    <asp:TextBox ID="txtQueryNo" runat="server" Width="180px"></asp:TextBox></td>
                                <td style="margin: 0px; padding-top: -4px; padding-left: 5px; padding-right: 5px;" class="auto-style1">
                                    <asp:Button ID="txbQuery" runat="server" Text="查询" Height="27px" CssClass="btn btn-success"  BorderStyle="None" Width="60px" OnClick="txbQuery_Click" /></td>
                            </tr>
                        </table>
                        <div>
                            <table style="width: 100%; height: 315px;">
                                <tr>
                                    <td style="width: 60%; vertical-align: top;">
                                        <asp:GridView ID="GWStaff" runat="server" AllowPaging="True" AutoGenerateColumns="False" BackColor="Silver" BorderColor="Silver" BorderStyle="Solid" BorderWidth="0px" CellPadding="4" CssClass="table_border" DataKeyNames="UserName" EmptyDataText="暂无数据！" Font-Size="10pt" GridLines="Horizontal" OnDataBound="GridView_DataBind" OnRowDataBound="GWStaff_RowDataBound" PageSize="6" Width="100%">
                                            <FooterStyle BackColor="White" ForeColor="#000000" />
                                            <Columns>
                                                <asp:BoundField HeaderText="编号" ReadOnly="True">
                                                <HeaderStyle Width="80px" />
                                                </asp:BoundField>
                                                <asp:BoundField DataField="UserName" HeaderText="用户名">
                                                <HeaderStyle Width="100px" />
                                                </asp:BoundField>
                                                <asp:BoundField DataField="Email" HeaderText="邮箱">
                                                <HeaderStyle Width="256px" />
                                                </asp:BoundField>
                                                <asp:BoundField DataField="Role" HeaderText="权限">
                                                <HeaderStyle Width="100px" />
                                                </asp:BoundField>
                                                <asp:CommandField ShowSelectButton="false" />
                                            </Columns>
                                            <PagerTemplate>
                                                <div id="main">
                                                    <div id="info">
                                                        &nbsp;&nbsp;页次：<asp:Label ID="lblPageCurrent" runat="server" CssClass="txtInfo" Text="1"></asp:Label>
                                                        /<asp:Label ID="lblPageCount" runat="server" Text="1"></asp:Label>
                                                        &nbsp;&nbsp; 共&nbsp;<asp:Label ID="lblPageRow" runat="server" CssClass="txtInfo" Text="1"></asp:Label>
                                                        &nbsp;条记录 
                                                     
                                                    </div>
                                                    <div id="page">
                                                        <asp:LinkButton ID="btnFirst" runat="server" CommandArgument="First" CommandName="Pager" CssClass="link" OnCommand="NavigateToPage">[首页]</asp:LinkButton>
                                                        &nbsp;
                                                        <asp:LinkButton ID="btnPrev" runat="server" CommandArgument="Prev" CommandName="Pager" CssClass="link" OnCommand="NavigateToPage">[前一页]</asp:LinkButton>
                                                        &nbsp;
                                                        <asp:LinkButton ID="btnNext" runat="server" CommandArgument="Next" CommandName="Pager" CssClass="link" OnCommand="NavigateToPage">[下一页]</asp:LinkButton>
                                                        &nbsp;
                                                        <asp:LinkButton ID="btnLast" runat="server" CommandArgument="Last" CommandName="Pager" CssClass="link" OnCommand="NavigateToPage">[尾页]</asp:LinkButton>
                                                        &nbsp;&nbsp;
                                                    </div>
                                                </div>
                                            </PagerTemplate>
                                            <RowStyle BackColor="White" ForeColor="#000000" HorizontalAlign="Center" />
                                            <HeaderStyle BackColor="#dff0d8" Height="30" />
                                            <SelectedRowStyle ForeColor="#000000" />
                                            <PagerStyle BackColor="White" ForeColor="#000066" HorizontalAlign="Left" />
                                            <AlternatingRowStyle BackColor="#FAFAFA" />
                                        </asp:GridView>
                                        <asp:TextBox ID="tbConfirmName" runat="server" Style="display: none"></asp:TextBox>
                                    </td>
                                    <td style="width: 40%; vertical-align: top;">
                                        <div style="padding: 0px 0px 0px 10px;">
                                            <div style="padding: 0px 10px 5px 0px; height: 305px;">
                                                <table style="padding: 0px; margin: 0px; width: 92%; height: 310px">
                                                    <tr style="height: 40px">
                                                        <td style="width: 30%; text-align: right;">
                                                            <asp:Label ID="Label2" runat="server" Text="用户名:"></asp:Label>
                                                        </td>
                                                        <td style="width: 70%; overflow: hidden; padding-top: 5px;">
                                                            <asp:TextBox ID="tbUserName" runat="server" Width="190px"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr style="height: 40px">
                                                        <td style="width: 30%; text-align: right;">
                                                            <asp:Label ID="Label3" runat="server" Text="邮箱:"></asp:Label>
                                                        </td>
                                                        <td style="width: 70%; overflow: hidden; padding-top: 5px;">
                                                            <asp:TextBox ID="tbEmail" runat="server" Width="190px"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr style="height: 40px">
                                                        <td style="width: 30%; text-align: right;">
                                                            <asp:Label ID="Label4" runat="server" Text="密码:"></asp:Label>
                                                        </td>
                                                        <td style="width: 70%; overflow: hidden; padding-top: 5px;">
                                                            <asp:TextBox ID="tbUserPwd" runat="server" Width="190px" placeholder="" Type="password"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr style="height: 40px">
                                                        <td style="width: 30%; text-align: right;">
                                                            <asp:Label ID="Label5" runat="server" Text="确认:"></asp:Label>
                                                        </td>
                                                        <td style="width: 70%; padding-top: 5px; overflow: hidden;">
                                                            <asp:TextBox ID="tbPwdConfirm" runat="server" Width="190px" placeholder="" Type="password"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr style="height: 35px">
                                                        <td style="width: 30%; text-align: right;">
                                                            <asp:Label ID="Label6" runat="server" Text="权限:"></asp:Label>
                                                        </td>
                                                        <td style="width: 70%;text-align:left">
                                                            <input type="checkbox" id="cb1" runat="server" style="width:16px;height:16px;margin-top:2px"/>系统管理员</td>
                                                    </tr>
                                                    <tr style="height: 30px">
                                                        <td style="width: 30%;height:30px"></td>
                                                        <td style="width: 70%;text-align:left;height:30px;">
                                                            <input type="checkbox" id="cb2" runat="server" style="width:16px;height:16px;margin-top:2px"/>普通用户</td>
                                                    </tr>
                                                    <tr style="height: 40px">
                                                        <td style="width: 30%"></td>
                                                        <td style="width: 70%">
                                                            <asp:Button ID="btnModify" runat="server"  BorderStyle="None" Height="27px" Text="修改" Width="60px" CssClass="btn btn-success"  OnClick="btnModify_Click" />
                                                            <asp:Button ID="btnAdd" runat="server"  BorderStyle="None" Height="27px" Text="增加" Width="60px" CssClass="btn btn-success" OnClick="btnAdd_Click" />
                                                            <asp:Button ID="btnDel" runat="server"  BorderStyle="None" Height="27px" Text="删除" Width="60px" CssClass="btn btn-success" OnClick="btnDel_Click" />
                                                            &nbsp;&nbsp;&nbsp;
                                                            <span class="top">&nbsp;</span></td>
                                                    </tr>
                                                    <tr style="height: 20%">
                                                        <td colspan="2" style="padding-top: 7px; text-align: center;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                                            &nbsp;&nbsp;&nbsp;
                                                            &nbsp;&nbsp;&nbsp;
                                                            </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>

                </div>
</div>--%>
                <!-- /block -->

    </div>
    </div>
    </form>
</body>
</html>
