<%@ Page Language="C#" AutoEventWireup="true" CodeFile="clamp.aspx.cs" Inherits="monitor_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <link href="../webM/bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="../webM/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet" media="screen">

    <%--<link href="../webM/vendors/easypiechart/jquery.easy-pie-chart.css" rel="stylesheet" media="screen">--%>
    <link href="../webM/assets/styles.css" rel="stylesheet" media="screen">
<%--    <link href="SpecialEffects.css" rel="stylesheet" media="screen">--%>
    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->


    <script src="../webM/vendors/modernizr-2.6.2-respond-1.1.0.min.js"></script>
    <%--    <asp:ContentPlaceHolder ID="head" runat="server">
    </asp:ContentPlaceHolder>--%>
    <script src="../jquery-1.11.3.min.js"></script>
    
    <script src="createTable.js"></script>
    <script src="SpecialEffects.js"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div class="navbar navbar-fixed-top" id="topbar">
            <div class="navbar-inner">
                <div class="container-fluid">
                    <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"><span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </a>
                    <a class="brand" href="#"></a>
                    <div class="nav-collapse collapse">
                        <ul class="nav pull-right">
                            <li class="dropdown">
                                <asp:HyperLink ID="hlUserName" runat="server" NavigateUrl="#" role="button" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-user"></i>监控 <i class="caret"></i></asp:HyperLink>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a tabindex="-1" href="#">Profile</a>
                                    </li>
                                    <li class="divider"></li>
                                    <li>
                                        <a tabindex="-1" href="login.aspx">退出</a>
                                    </li>                                    
                                </ul>
         
                            </li>
                            
                        </ul>
  
                        <ul class="nav">
                            
                            <li class="active"id="navMonitor">
                                <a href="#" >监 控</a>
                            </li>
                            <li class="icon-fullscreen fullscreen">
                                
                            </li>
                                
                            <li class="dropdown">
                                <a href="#" data-toggle="dropdown" class="dropdown-toggle">设 置 <b class="caret"></b>

                                </a>
                                <ul class="dropdown-menu" id="menu1">
                                    <li>
                                        <a href="#">工 具 <i class="icon-arrow-right"></i>

                                        </a>
                                        <ul class="t_t_t_dropdown-menu sub-menu">
                                            <li>
                                                <a href="#">Reports</a>
                                            </li>
                                            <li>
                                                <a href="#">Logs</a>
                                            </li>
                                            <li>
                                                <a href="#">Errors</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">链 接</a>
                                    </li>
                                </ul>
                            </li>
                            <li class="dropdown">
                                <a href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">首 页 <i class="caret"></i>

                                </a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a tabindex="-1" href="#">新 闻</a>
                                    </li>
                                    <li>
                                        <a tabindex="-1" href="#">微 博</a>
                                    </li>
                 
                                    <li>
                                        <a tabindex="-1" href="#">日 历</a>
                                    </li>
                                    <li class="divider"></li>
                                    <li>
                                        <a tabindex="-1" href="#">问 题</a>
                                    </li>
                                </ul>
                            </li>
                            <li class="dropdown">
                                <a href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">用 户 <i class="caret"></i>

                                </a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a tabindex="-1" href="#">用户列表</a>
                                    </li>
                                    <li>
                                        <a tabindex="-1" href="#">搜 索</a>
                                    </li>
                                    <li>
                                        <a tabindex="-1" href="#">许 可</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                                                

                    </div>
                </div>
            </div>
        </div>

        <%--        <div class="container-fluid" id="content">--%>

        <div>
 <%--           <i class="icon-chevron-left hide-sidebar"><a href='#' title="Hide Sidebar" rel='tooltip'>&nbsp;</a></i>
            <i class="icon-chevron-right show-sidebar" style="display: none;"><a href='#' title="Show Sidebar" rel='tooltip'>&nbsp;</a></i>

            <i class=" icon-chevron-up hide-topbar"></i>
            <i class=" icon-chevron-down show-topbar" style="display: none;"></i>--%>

<%--            <i class="icon-fullscreen fullscreen"></i>--%>
        </div>

        <div class="row-fluid" id="content">



            <div class="span2" id="sidebar">


                <ul class="nav nav-list bs-docs-sidenav">
                    <%--                    <ul class="nav nav-list bs-docs-sidenav nav-collapse collapse">--%>
                    <li id="liMonitor" runat="server" class="active">
                        <asp:HyperLink ID="HyperLink7" runat="server" NavigateUrl="~/Monitor.aspx"><i class="icon-chevron-right "></i>监控</asp:HyperLink>
                    </li>
                    <li id="liDevice" runat="server">
                        <asp:HyperLink ID="HyperLink6" runat="server" NavigateUrl="~/Device.aspx"><i class="icon-chevron-right"></i>设备管理</asp:HyperLink>
                    </li>
                    <li id="liCraft" runat="server">
                        <asp:HyperLink ID="HyperLink5" runat="server" NavigateUrl="~/Craft.aspx"><i class="icon-chevron-right"></i>成型工艺</asp:HyperLink>
                    </li>
                    <li id="liStaff" runat="server">
                        <asp:HyperLink ID="HyperLink4" runat="server" NavigateUrl="~/Staff.aspx"><i class="icon-chevron-right"></i>辅助设备</asp:HyperLink>
                    </li>
                    <li id="liSystem" runat="server">
                        <asp:HyperLink ID="HyperLink3" runat="server" NavigateUrl="~/SystemSet.aspx"><i class="icon-chevron-right"></i>系统设置</asp:HyperLink>
                    </li>
                    <li id="liGPS" runat="server">
                        <asp:HyperLink ID="HyperLink2" runat="server" NavigateUrl="~/GPS.aspx"><i class="icon-chevron-right"></i>GPS</asp:HyperLink>

                    </li>
                    <li id="liOthers" runat="server">
                        <asp:HyperLink ID="HyperLink1" runat="server" NavigateUrl="~/Others.aspx"><i class="icon-chevron-right"></i>其他</asp:HyperLink>

                    </li>
                </ul>
            </div>


            <div>

                <style type="text/css">
                    li {
                        list-style-type: none;
                    }
                </style>


                <div class="span9">
                    <%-- <div class="row-fluid">--%>

                    <div class="alert alert-success" >
                        <div >
                            <h4 >机器概况</h4>
                        </div>
                    </div>
                    <div style="width: 1200px;">
                        <asp:Label ID="Label1" runat="server" Text="机器编号" Width="60px"></asp:Label>
                        <asp:TextBox ID="TextBox1" runat="server" ReadOnly="True"></asp:TextBox>
                        <asp:Label ID="Label2" runat="server" Text="间隔(ms) " Width="60px"></asp:Label>
                        <asp:TextBox ID="TextBox2" runat="server" ReadOnly="True"></asp:TextBox>
                        <asp:Label ID="Label3" runat="server" Text="时间戳" Width="60px"></asp:Label>
                        <asp:TextBox ID="TextBox3" runat="server" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div style="width: 1200px;">
                        <asp:Label ID="Label4" runat="server" Text="颜色" Width="60px"></asp:Label>
                        <asp:TextBox ID="TextBox4" runat="server" ReadOnly="True"></asp:TextBox>
                        <asp:Label ID="Label5" runat="server" Text="全程计时 " Width="60px"></asp:Label>
                        <asp:TextBox ID="TextBox5" runat="server" ReadOnly="True"></asp:TextBox>
                        <asp:Label ID="Label6" runat="server" Text="模具编号 " Width="60px"></asp:Label>
                        <asp:TextBox ID="TextBox6" runat="server" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div style="width: 1200px;">
                        <asp:Label ID="Label7" runat="server" Text="计划单号" Width="60px"></asp:Label>
                        <asp:TextBox ID="TextBox7" runat="server" ReadOnly="True"></asp:TextBox>
                        <asp:Label ID="Label8" runat="server" Text="产品编号 " Width="60px"></asp:Label>
                        <asp:TextBox ID="TextBox8" runat="server" ReadOnly="True"></asp:TextBox>
                        <asp:Label ID="Label9" runat="server" Text="预计产量 " Width="60px"></asp:Label>
                        <asp:TextBox ID="TextBox9" runat="server" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div style="width: 1200px;">
                        <asp:Label ID="Label10" runat="server" Text="完成数量 " Width="60px"></asp:Label>
                        <asp:TextBox ID="TextBox10" runat="server" ReadOnly="True"></asp:TextBox>
                        <asp:Label ID="Label11" runat="server" Text="次品数" Width="60px"></asp:Label>
                        <asp:TextBox ID="TextBox11" runat="server" ReadOnly="True"></asp:TextBox>
                        <asp:Label ID="Label12" runat="server" Text="控制器" Width="60px"></asp:Label>
                        <asp:TextBox ID="TextBox12" runat="server" ReadOnly="True"></asp:TextBox>
                    </div>

                    <%--</div>--%>

                    <%--                        <div class="row-fluid">--%>

                    <div class="navbar">
                        <div class="navbar-inner">
                            <ul class="breadcrumb" >
                                <%--                                        <i class="icon-chevron-left hide-sidebar"><a href='#' title="Hide Sidebar" rel='tooltip'>&nbsp;</a></i>
                                        <i class="icon-chevron-right show-sidebar" style="display: none;"><a href='#' title="Show Sidebar" rel='tooltip'>&nbsp;</a></i>--%>

                                <li id="clamp" style="color: blue;">开合模<span class="divider">|</span>
                                </li>
                                <li id="ejector" style="color: blue">脱模 <span class="divider">|</span>
                                </li>
                                <li id="injection" style="color: blue">射出 <span class="divider">|</span>
                                </li>
                                <li id="charge" style="color: blue">储料 <span class="divider">|</span>
                                </li>
                                <li id="core" style="color: blue">中子<span class="divider">|</span>
                                </li>
                                <li id="carriage" style="color: blue">座台<span class="divider">|</span>
                                </li>
                                <li id="temperature" style="color: blue">温度<span class="divider">|</span>
                                </li>
                                <li id="other" style="color: blue">其他	
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="row-fluid">
                    <div class="span6">
                        <div class="navbar">
                            <div class="block-content collapse in" style="width: 800px">
                                <div id="createtable" class="span12">
                                </div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <%--</div>--%>

            <script src="../webM/vendors/jquery-1.9.1.min.js"></script>
            <script src="../webM/bootstrap/js/bootstrap.min.js"></script>
            <script src="../webM/vendors/easypiechart/jquery.easy-pie-chart.js"></script>
            <%--<script src="../webM/assets/scripts.js"></script>--%>
        </div>


        <%--<footer><p>&copy; tederic  2015</p></footer>--%>
        <%--</div>--%>
    </form>
</body>
</html>
