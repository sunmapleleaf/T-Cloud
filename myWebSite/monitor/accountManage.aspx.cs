
using System;
using System.Data;
using System.Configuration;
using System.Web.Security;
using System.Web.UI.WebControls.WebParts;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Data.SqlClient;
using System.Collections;
using System.Text.RegularExpressions;

public partial class monitor_accountManage : System.Web.UI.Page
{
    //SqlConnection conn;
    //DataSet ds = new DataSet();

    //int reValue;//用于保存返回值。返回值为-1（用户名存在），0（失败），1（成功），2（用户名不存在）
    //public void CreateDataSet()
    //{
    //    string connStr = ConfigurationManager.AppSettings["ConnectionString"].ToString();
    //    conn = new SqlConnection(connStr);
    //    conn.Open();

    //    //保存用户要查询的值
    //    string tmpStr, sqlStr;
    //    tmpStr = "%" + txtQueryNo.Text + "%";

    //    string DropValue = "";
    //    switch (DropQuerry.SelectedItem.ToString())
    //    {
    //        case "用户名":
    //            DropValue = "UserName";
    //            break;
    //        case "邮箱":
    //            DropValue = "Email";
    //            break;
    //    }

    //    if (txtQueryNo.Text == "")
    //    {
    //        sqlStr = "select * from tb_User";
    //    }
    //    else
    //    {
    //        sqlStr = "select * from ";
    //        sqlStr = sqlStr + "tb_User where " + DropValue + " like '" + tmpStr + "'";
    //    }

    //    SqlDataAdapter da = new SqlDataAdapter(sqlStr, conn);
    //    da.Fill(ds);
    }

//    public void initializeBinding()
//    {
//        ViewState["rowCount"] = ds.Tables[0].Rows.Count;
//        if (ds.Tables[0].Rows.Count == 0)
//        {
//            DataRow dr = ds.Tables[0].NewRow();
//            ds.Tables[0].Rows.Add(dr);

//            GWStaff.DataSource = ds.Tables[0];
//            GWStaff.DataBind();

//            int columnCount = ds.Tables[0].Columns.Count;
//            GWStaff.Rows[0].Cells.Clear();
//            GWStaff.Rows[0].Cells.Add(new TableCell());
//            GWStaff.Rows[0].Cells[0].ColumnSpan = columnCount;
//            GWStaff.Rows[0].Cells[0].Text = "没有记录";
//            GWStaff.Rows[0].Cells[0].Style.Add("text-align", "center");

//            btnAdd.Enabled = false;
//        }
//        else
//        {
//            GWStaff.DataSource = ds.Tables[0];
//            GWStaff.DataBind();

//            btnAdd.Enabled = true;
//        }

//        conn.Close();
//    }

//    public void NavigateToPage(object sender, CommandEventArgs e)
//    {
//        switch (e.CommandArgument.ToString())
//        {
//            case "First":
//                GWStaff.PageIndex = 0;
//                break;
//            case "Prev":
//                GWStaff.PageIndex -= 1;
//                break;
//            case "Next":
//                GWStaff.PageIndex += 1;
//                break;
//            case "Last":
//                GWStaff.PageIndex = GWStaff.PageCount - 1;
//                break;
//        }

//        CreateDataSet();
//        initializeBinding();
//    }

//    protected void Page_Load(object sender, EventArgs e)
//    {
//        if (!IsPostBack)
//        {
//            CreateDataSet();
//            initializeBinding();
//            btnDel.Attributes.Add("onclick", "return confirm('确定要删除选中的人员信息吗?');");
//        }
//    }
//    protected void Page_LoadComplete(Object sender, EventArgs e)
//    {
//        //System.Web.UI.HtmlControls.HtmlGenericControl liActive = (System.Web.UI.HtmlControls.HtmlGenericControl)Master.FindControl("liStaff");
//        //liActive.Attributes["class"] = "active";
//    }

//    protected void btnAdd_Click(object sender, EventArgs e)
//    {
//        int result = IsLogal();
//        int i = 0;

//        switch (result)
//        {
//            case 0:
//            case 1:
//            case 2:
//            case 4:
//            case 5:
//            case 6:
//                Response.Write("<script>alert('用户名或者密码格式不正确，请重新输入！');</script>");
//                i++;
//                break;
//            case 3:
//                Response.Write("<script>alert('邮箱格式不正确，请重新输入！');</script>");
//                i++;
//                break;
//        }
//        if (!string.Equals(this.tbUserPwd.Text, this.tbPwdConfirm.Text))
//        {
//            Response.Write("<script>alert('两次输入的密码不一致！');</script>");
//            i++;
//        }

//        if (i == 0)
//        {
//            reValue = CheckName();
//            if (reValue == -1)
//            {
//                Response.Write("<script>alert('用户名存在！');</script>");
//            }
//            else
//            {
//                DB db = new DB();
//                string UserName = this.tbUserName.Text;
//                string PassWord = db.GetMD5(this.tbUserPwd.Text.ToString());//MD5加密
//                string Email = this.tbEmail.Text;
//                string role = "";

//                string cmdstr = "";
//                if (cb1.Checked == true)
//                {
//                    role = "系统管理员";

//                }
//                else if (cb2.Checked == true)
//                {
//                    role = "普通用户";
//                }
//                else
//                {

//                }

//                cmdstr = "insert into tb_User(UserName,PassWord,Email,Role) values('" + UserName + "','" + PassWord + "','" + Email + "','" + role + "')";
//                try
//                {
//                    reValue = db.sqlEx(cmdstr);
//                    if (reValue == 1)
//                    {
//                        //Response.Write("<script>alert('注册成功！');</script>");//并不显示
//                        //Response.Redirect("~/login.aspx");

//                        //Response.Write("<script>alert('添加成功');</script>");
//                        Clear();//清空文本框
//                    }
//                    else if (reValue == 0)
//                    {
//                        Response.Write("<script>alert('添加失败！');</script>");
//                    }
//                }
//                catch (Exception ee)
//                {
//                    Response.Write("<script>alert('添加失败！');</script>");
//                }
//            }
//        }

//        CreateDataSet();
//        initializeBinding();
//    }

//    //验证用户名、密码、邮箱的合法性
//    public int IsLogal()
//    {
//        string UserName = this.tbUserName.Text;
//        string PassWord = this.tbUserPwd.Text;
//        string Email = this.tbEmail.Text;

//        int i = 0;
//        //bool b = Regex.IsMatch(UserName, "^[A-Za-z0-9]+$");               
//        if (Regex.IsMatch(UserName, @"^[A-Za-z0-9]+$"))
//        {
//            i = i + 1;
//        }
//        if (Regex.IsMatch(PassWord, @"^[A-Za-z0-9]+$"))
//        {
//            i = i + 2;
//        }
//        if (Regex.IsMatch(Email, @"^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$"))
//        {
//            i = i + 4;
//        }
//        return i;
//    }


//    //验证用户名是否存在
//    public int CheckName()
//    {
//        //实例化公共类对象
//        DB db = new DB();
//        string str = "select count(*) from tb_User where UserName='" + this.tbUserName.Text + "'";
//        try
//        {
//            DataTable dt = db.reDt(str);
//            if (dt.Rows[0][0].ToString() != "0")
//            {
//                return -1;//该用户名已经存在
//            }
//            else
//            {
//                return 2;//该用户名尚未注册
//            }
//        }
//        catch (Exception ee)
//        {
//            return 0;
//        }
//    }

//    //验证密码是否一致
//    public int CheckPassWord(string password)
//    {
//        //实例化公共类对象
//        DB db = new DB();
//        string str = "select * from tb_User where UserName='" + this.tbUserName.Text + "'";
//        try
//        {
//            DataTable dt = db.reDt(str);
//            if (dt.Rows[0][2].ToString() != password)
//            {
//                return -1;//密码不一致
//            }
//            else
//            {
//                return 2;//密码一致
//            }
//        }
//        catch (Exception ee)
//        {
//            return 0;
//        }
//    }

//    //清空文本框
//    public void Clear()
//    {
//        this.tbUserName.Text = "";
//        this.tbEmail.Text = "";
//        this.tbUserPwd.Text = "";
//        this.tbPwdConfirm.Text = "";
//        cb1.Checked = false;
//        cb2.Checked = false;
//    }

//    protected void btnDel_Click(object sender, EventArgs e)
//    {
//        string sqlStr = "";
//        string tmpStr = tbUserName.Text;
//        SqlCommand cmd;
//        int records;
//        try
//        {
//            string connStr = ConfigurationManager.AppSettings["ConnectionString"].ToString();
//            conn = new SqlConnection(connStr);
//            conn.Open();
//            sqlStr = "Delete from tb_User where UserName='" + tmpStr + "'";
//            cmd = new SqlCommand(sqlStr, conn);
//            records = cmd.ExecuteNonQuery();
//        }
//        catch (ArgumentException ex)
//        {
//            Response.Write("<script>alert(ex.Message);</script>");
//        }

//        conn.Close();
//        CreateDataSet();
//        initializeBinding();

//    }
//    protected void txbQuery_Click(object sender, EventArgs e)
//    {
//        CreateDataSet();
//        initializeBinding();
//    }

//    protected void GridView_DataBind(object sender, EventArgs e)
//    {
//        GridViewRow pagerrow = GWStaff.BottomPagerRow;

//        Label lblcurrent = (Label)pagerrow.Cells[0].FindControl("lblpagecurrent");
//        Label lblcount = (Label)pagerrow.Cells[0].FindControl("lblpagecount");
//        Label lblrow = (Label)pagerrow.Cells[0].FindControl("lblpagerow");

//        LinkButton btnfirsttem = (LinkButton)pagerrow.Cells[0].FindControl("btnfirst");
//        LinkButton btnprevtem = (LinkButton)pagerrow.Cells[0].FindControl("btnprev");
//        LinkButton btnnexttem = (LinkButton)pagerrow.Cells[0].FindControl("btnnext");
//        LinkButton btnlasttem = (LinkButton)pagerrow.Cells[0].FindControl("btnlast");

//        if (lblcurrent != null)
//        {
//            lblcurrent.Text = (GWStaff.PageIndex + 1).ToString();
//        }

//        if (lblcount != null)
//        {
//            lblcount.Text = GWStaff.PageCount.ToString();
//        }

//        if (lblcount != null)
//        {
//            lblrow.Text = ViewState["rowCount"].ToString();
//        }

//        if (GWStaff.PageIndex == 0)
//        {
//            btnfirsttem.Enabled = false;
//            btnprevtem.Enabled = false;

//            if (GWStaff.PageIndex == 1)
//            {
//                btnnexttem.Enabled = false;
//                btnlasttem.Enabled = false;
//            }
//        }
//        else if (GWStaff.PageIndex == (GWStaff.PageCount - 1))
//        {
//            btnnexttem.Enabled = false;
//            btnlasttem.Enabled = false;
//        }
//    }
//    protected void GWStaff_RowDataBound(object sender, GridViewRowEventArgs e)
//    {
//        if (e.Row.RowIndex != -1)
//        {
//            int indexID = GWStaff.PageIndex * GWStaff.PageSize + e.Row.RowIndex + 1;
//            e.Row.Cells[0].Text = indexID.ToString();
//        }
        
//        if (e.Row.RowType == DataControlRowType.DataRow)
//        {
//            e.Row.Attributes.Add("onmouseover", "c=this.style.backgroundColor;this.style.backgroundColor='#F0F0F0'");
//            e.Row.Attributes.Add("onmouseout", "this.style.backgroundColor=c");
//            //e.Row.Attributes.Add("onclick", "gvselchange('" + e.Row.RowIndex + "');currentcolor=this.style.backgroundColor;this.style.backgroundColor='#c0c0ff';");

//            e.Row.Attributes.Add("onclick", "gvselchange('" + e.Row.Cells[1].Text + "','" + e.Row.Cells[2].Text + "','" + e.Row.Cells[3].Text + "');currentcolor=this.style.backgroundColor;this.style.backgroundColor='#c0c0ff';");

//        }
//    }

//    protected void btnModify_Click(object sender, EventArgs e)
//    {
//        if (tbUserName.Text != tbConfirmName.Text)
//        {
//            //修改了用户名，密码也要跟着修改
//            int result = IsLogal();
//            int i = 0;

//            switch (result)
//            {
//                case 0:
//                case 1:
//                case 2:
//                case 4:
//                case 5:
//                case 6:
//                    Response.Write("<script>alert('用户名或者密码格式不正确，请重新输入！');</script>");
//                    i++;
//                    break;
//                case 3:
//                    Response.Write("<script>alert('邮箱格式不正确，请重新输入！');</script>");
//                    i++;
//                    break;
//            }
//            if (!string.Equals(this.tbUserPwd.Text, this.tbPwdConfirm.Text))
//            {
//                Response.Write("<script>alert('两次输入的密码不一致！');</script>");
//                i++;
//            }

//            if (i == 0)
//            {
//                reValue = CheckName();
//                if (reValue == -1)
//                {
//                    Response.Write("<script>alert('用户名存在！');</script>");
//                }
//                else
//                {
//                    DB db = new DB();
//                    string UserName = this.tbUserName.Text;
//                    string PassWord = db.GetMD5(this.tbUserPwd.Text.ToString());//MD5加密
//                    string Email = this.tbEmail.Text;
//                    string role = "";

//                    string cmdstr = "";
//                    if (cb1.Checked == true)
//                    {
//                        role = "系统管理员";

//                    }
//                    else if (cb2.Checked == true)
//                    {
//                        role = "普通用户";
//                    }
//                    else
//                    {

//                    }

//                    cmdstr = "update  tb_User set UserName='" + UserName + "',PassWord='" + PassWord + "',Email='" + Email + "',Role='" + role + "'where UserName='" + tbConfirmName.Text + "'";

//                    try
//                    {
//                        reValue = db.sqlEx(cmdstr);
//                        if (reValue == 1)
//                        {
//                            //Response.Write("<script>alert('注册成功！');</script>");//并不显示
//                            //Response.Redirect("~/login.aspx");

//                            //Response.Write("<script>alert('添加成功');</script>");
//                            Clear();//清空文本框
//                        }
//                        else if (reValue == 0)
//                        {
//                            Response.Write("<script>alert('修改失败！');</script>");
//                        }
//                    }
//                    catch (Exception ee)
//                    {
//                        Response.Write("<script>alert('修改失败！');</script>");
//                    }
//                }
//            }

//            CreateDataSet();
//            initializeBinding();
//        }
//        else
//        {
//            //没有修改用户名
//            if (tbUserPwd.Text == "")
//            {
//                //没有修改密码
//                string Email = this.tbEmail.Text;
//                //判断邮箱的合法性
//                if(Regex.IsMatch(Email, @"^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$"))
//                {
//                    string role = "";

//                    string cmdstr = "";
//                    if (cb1.Checked == true)
//                    {
//                        role = "系统管理员";

//                    }
//                    else if (cb2.Checked == true)
//                    {
//                        role = "普通用户";
//                    }
//                    else
//                    {

//                    }

//                    cmdstr = "update  tb_User set Email='" + Email + "',Role='" + role + "'where UserName='" + tbUserName.Text + "'";
//                    DB db = new DB();
//                    try
//                    {
//                        reValue = db.sqlEx(cmdstr);
//                        if (reValue == 1)
//                        {
//                            //Response.Write("<script>alert('注册成功！');</script>");//并不显示
//                            //Response.Redirect("~/login.aspx");

//                            //Response.Write("<script>alert('添加成功');</script>");
//                            Clear();//清空文本框
//                        }
//                        else if (reValue == 0)
//                        {
//                            Response.Write("<script>alert('修改失败！');</script>");
//                        }
//                    }
//                    catch (Exception ee)
//                    {
//                        Response.Write("<script>alert('修改失败！');</script>");
//                    }

//                    CreateDataSet();
//                    initializeBinding();
//                }
//                else
//                {
//                    Response.Write("<script>alert('邮箱格式不正确！');</script>");
//                }
                
//            }
//            else
//            {
//                //修改了密码,首先判断用户输入的密码与原有密码是否一致。若一致，则允许修改，若不一致，则不允许修改。
//                DB db = new DB();
//                string UserName = this.tbUserName.Text;
//                string PassWord = db.GetMD5(this.tbUserPwd.Text.ToString());//MD5加密
//                string Email = this.tbEmail.Text;
//                string role = "";

//                string cmdstr = "";
//                if (cb1.Checked == true)
//                {
//                    role = "系统管理员";

//                }
//                else if (cb2.Checked == true)
//                {
//                    role = "普通用户";
//                }
//                else
//                {

//                }
//                int result = CheckPassWord(PassWord);
//                if (result == -1)
//                {
//                    Response.Write("<script>alert('原有密码输入错误，不允许修改！');</script>");
//                }
//                else if (result == 2)
//                {
//                    string pd = this.tbPwdConfirm.Text;

//                    //判断密码和邮箱格式是否合法
//                    if (Regex.IsMatch(Email, @"^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$"))
//                    {
//                        if (Regex.IsMatch(pd, @"^[A-Za-z0-9]+$"))
//                        {
//                            string newPassWord = db.GetMD5(this.tbPwdConfirm.Text.ToString());//MD5加密
//                            cmdstr = "update  tb_User set PassWord='" + newPassWord + "',Email='" + Email + "',Role='" + role + "'where UserName='" + UserName + "'";
//                            try
//                            {
//                                reValue = db.sqlEx(cmdstr);
//                                if (reValue == 1)
//                                {
//                                    //Response.Write("<script>alert('注册成功！');</script>");//并不显示
//                                    //Response.Redirect("~/login.aspx");

//                                    //Response.Write("<script>alert('添加成功');</script>");
//                                    Clear();//清空文本框
//                                }
//                                else if (reValue == 0)
//                                {
//                                    Response.Write("<script>alert('修改失败！');</script>");
//                                }
//                            }
//                            catch (Exception ee)
//                            {
//                                Response.Write("<script>alert('修改失败！');</script>");
//                            }

//                            CreateDataSet();
//                            initializeBinding();
//                        }
//                        else
//                        {
//                            Response.Write("<script>alert('密码格式不正确！');</script>");
//                        }
//                    }
//                    else
//                    {
//                        Response.Write("<script>alert('邮箱格式不正确！');</script>");
//                    }

                    
//                }
//                else
//                {
//                    Response.Write("<script>alert('修改失败！');</script>");
//                }
//            }
//        }
//    }
    
//    //protected void GWStaff_SelectedIndexChanged(object sender, EventArgs e)
//    //{

//    //    tbUserName.Text = this.GWStaff.SelectedRow.Cells[1].Text.ToString();
//    //    tbConfirmName.Text = this.GWStaff.SelectedRow.Cells[1].Text.ToString();
//    //    tbEmail.Text = this.GWStaff.SelectedRow.Cells[2].Text.ToString();
//    //    string role = this.GWStaff.SelectedRow.Cells[3].Text.ToString();
//    //    if (role != "")          //"&nbsp;"
//    //    {
//    //        if (role == "系统管理员")
//    //        {
//    //            cb1.Checked = true;
//    //            cb2.Checked = false;
//    //        }
//    //        else if (role == "普通用户")
//    //        {
//    //            cb1.Checked = false;
//    //            cb2.Checked = true;
//    //        }
//    //    }
//    //    else
//    //    {
//    //        cb1.Checked = false;
//    //        cb2.Checked = false;
//    //    }
//    //}
//}