using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Data.SqlClient;//需引入的命名空间
using System.Text.RegularExpressions;

public partial class register : System.Web.UI.Page
{
    int reValue;//用于保存返回值。返回值为-1（用户名存在），0（失败），1（成功），2（用户名不存在）
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void btnLogup_Click(object sender, EventArgs e)
    {
        int result = IsLogal();
        int i = 0;

        switch (result)
        {                
            case 0:
            case 1:
            case 2:
            case 4:
            case 5:
            case 6:
                Response.Write("<script>alert('用户名或者密码格式不正确，请重新输入！');</script>");
                i++;
                break;
            case 3:
                Response.Write("<script>alert('邮箱格式不正确，请重新输入！');</script>");
                i++;
                break;
        }
        if (!string.Equals(this.tbUserPwd.Text, this.tbPwdConfirm.Text))
        {
            Response.Write("<script>alert('两次输入的密码不一致！');</script>");
            i++;
        }

        if(i==0)
        {
            reValue = CheckName();
            if (reValue == -1)
            {
                Response.Write("<script>alert('用户名存在！');</script>");
            }
            else
            {
                DB db = new DB();
                string UserName = this.tbUserId.Text;
                string PassWord = db.GetMD5(this.tbUserPwd.Text.ToString());//MD5加密
                string Email = this.tbEmail.Text;

                string cmdstr = "insert into tb_User(UserName,PassWord,Email) values('" + UserName + "','" + PassWord + "','" + Email + "')";
                try
                {
                    reValue = db.sqlEx(cmdstr);
                    if (reValue == 1)
                    {
                        //Response.Write("<script>alert('注册成功！');</script>");//并不显示
                        //Response.Redirect("~/login.aspx");
                        Response.Write("<script>alert('注册成功');window.location.href='login.aspx';</script>");
                        Clear();//清空文本框
                    }
                    else if (reValue == 0)
                    {
                        Response.Write("<script>alert('注册失败！');</script>");
                    }
                }
                catch (Exception ee)
                {
                    Response.Write("<script>alert('注册失败！');</script>");
                }
            }
        }
    }

    //验证用户名、密码、邮箱的合法性
    public int IsLogal()
    {
        string UserName = this.tbUserId.Text;
        string PassWord = this.tbUserPwd.Text;
        string Email = this.tbEmail.Text;

        int i = 0;
        //bool b = Regex.IsMatch(UserName, "^[A-Za-z0-9]+$");               
        if(Regex.IsMatch(UserName, @"^[A-Za-z0-9]+$"))
        {
            i = i + 1;
        }
        if (Regex.IsMatch(PassWord, @"^[A-Za-z0-9]+$"))
        {
            i = i + 2;
        }
        if (Regex.IsMatch(Email, @"^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$"))
        {
            i = i + 4;
        }
        return i;
    }


    //验证用户名是否存在
    public int CheckName()
    {
        //实例化公共类对象
        DB db = new DB();
        string str = "select count(*) from tb_User where UserName='" + this.tbUserId.Text + "'";
        try
        {
            DataTable dt = db.reDt(str);
            if (dt.Rows[0][0].ToString() != "0")
            {
                return -1;//该用户名已经存在
            }
            else
            {
                return 2;//该用户名尚未注册
            }
        }
        catch (Exception ee)
        {
            return 0;
        }
    }
    //清空文本框
    public void Clear()
    {
        this.tbUserId.Text = "";
        this.tbUserPwd.Text = "";
        this.tbPwdConfirm.Text = "";
        this.tbEmail.Text = "";
    }
    protected void btnBack_Click(object sender, EventArgs e)
    {
        Response.Redirect("login.aspx");
    }
}