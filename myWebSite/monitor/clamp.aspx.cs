using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;



using System.Text;
using System.Net.Security;
using System.Net;
public partial class monitor_Default : System.Web.UI.Page
{
    public static string HttpPost(string Url, string postDataStr)
    {
        HttpWebRequest request = (HttpWebRequest)WebRequest.Create(Url);
        request.Method = "POST";
        request.ContentType = "application/x-www-form-urlencoded";
        request.ContentLength = postDataStr.Length;
        StreamWriter writer = new StreamWriter(request.GetRequestStream(), Encoding.ASCII);
        writer.Write(postDataStr);
        writer.Flush();
        HttpWebResponse response = (HttpWebResponse)request.GetResponse();
        string encoding = response.ContentEncoding;
        if (encoding == null || encoding.Length < 1)
        {
            encoding = "UTF-8"; //默认编码  
        }
        StreamReader reader = new StreamReader(response.GetResponseStream(), Encoding.GetEncoding(encoding));
        string retString = reader.ReadToEnd();
        return retString;
    }  




    protected void Page_Load(object sender, EventArgs e)
    {
        string UnitID = Request["UnitID"];
        string strResult = String.Empty;
        //登陆
        if (Request["userID"] !=null && Request["pwd"] != null)
        {
            //实例化公共类对象
            DB db = new DB();
            string userName = Request["userID"];
            string passWord = db.GetMD5(Request["pwd"]);//对密码进行加密处理

                //获取用户信息
                SqlDataReader dr = db.reDr("select * from tb_User where UserName='" + userName + "' and PassWord='" + passWord + "'");
                dr.Read();
                if (dr.HasRows)//通过dr中是否包含行判断用户是否通过身份验证
                {
                    //  Session["sUserName"] = dr.GetValue(0);//将该用户的ID存入Session["UserID"]中
                    Session["userID"] = userName;

                    HttpCookie cookie = Request.Cookies["userID"];
                    if (cookie == null)
                    {
                        cookie = new HttpCookie("userID");
                    }
                    cookie.Value = userName;
                    cookie.Expires = System.DateTime.Now.AddMinutes(100);
                    Response.Cookies.Add(cookie);
                    Session["sRole"] = dr.GetValue(4);//将该用户的权限存入Session["Role"]中          
                    Session["sLogInTime"] = DateTime.Now;

                    strResult = "success";
                }
                else
                {
                    strResult = "fail";
                }
                dr.Close();

        
        
        }
        //短信
        if (Request["message"] == "shortMessage" && Request["userID"] != null)
        {

            string url = "https://oauth.api.189.cn/emp/oauth2/v3/access_token";
            string data = "grant_type=client_credentials&app_id=200424440000251108&app_secret=cc9db0a6067b6a3210e31d1500a80753";
            string result = HttpPost(url, data);
            JObject joResult = (JObject)JsonConvert.DeserializeObject(result);
            url = "http://api.189.cn/v2/emp/templateSms/sendSms";
            data = "acceptor_tel=" + Request["userID"] + "&template_id=91550364&template_param=" + Request["messageData"] + "&app_id=200424440000251108&access_token=" + joResult["access_token"].ToString() + "&timestamp=" + System.DateTime.Now.ToString().Replace('/', '-');
            result = HttpPost(url, data);
            joResult = (JObject)JsonConvert.DeserializeObject(result);
            strResult = joResult.ToString();

        }




        if (Request["MachineID"] != null && Request["UnitID"] != null)
        {
            JObject jo = null;

            if (Request["MachineID"] =="all")
            {
                    string SQLCONNECT = @"server=JS-DIANQI\SQLEXPRESS;database=mySQL;uid=sa;pwd=1234";
            SqlConnection conn = new SqlConnection(SQLCONNECT);
            conn.Open();

            string SQLCOMMAND = "select connDetail from connectionOption";
            DataSet ds = new DataSet();
            SqlDataAdapter da = new SqlDataAdapter(SQLCOMMAND, conn);
            da.Fill(ds);

            jo = new JObject();
             List<ConnectionOption> listConn = new List<ConnectionOption>();
             foreach (DataRow tmp in ds.Tables[0].Rows)
             {
                 ConnectionOption connTmp = JsonConvert.DeserializeObject<ConnectionOption>(tmp[0].ToString());
                 if (Request["userID"] == "all") 
                     listConn.Add(connTmp);
                 else if (connTmp.userID == Request["userID"])
                        listConn.Add(connTmp);
             }
             conn.Close();
        
            foreach(ConnectionOption item in listConn)
            {
                string SQLCONNECT1 = @"server=JS-DIANQI\SQLEXPRESS;database=mySQL;uid=sa;pwd=1234";
                SqlConnection conn1 = new SqlConnection(SQLCONNECT1);
                conn1.Open();

                string SQLCOMMAND1 = "select machineData from injectionMachine where machineID='" + item.machineID + "'";
                // string SQLCOMMAND = "select machineData from injectionMachine where machineID='" + "gefranVedo001" + "'";

                DataSet ds1 = new DataSet();
                SqlDataAdapter da1 = new SqlDataAdapter(SQLCOMMAND1, conn1);
                da1.Fill(ds1);
                JObject joData,joConn;
                joConn = (JObject)JsonConvert.DeserializeObject(JsonConvert.SerializeObject(item));

                if (ds1.Tables[0].Rows.Count != 0)
                {
                    joData = (JObject)JsonConvert.DeserializeObject(ds1.Tables[0].Rows[0][0].ToString());
                    joConn.Merge(joData["overView"]);
                }
                jo.Add(item.machineID, joConn);

                conn1.Close();


            }

            string t = "";
            
            }
            else
            {
            string SQLCONNECT = @"server=JS-DIANQI\SQLEXPRESS;database=mySQL;uid=sa;pwd=1234";
            SqlConnection conn = new SqlConnection(SQLCONNECT);
            conn.Open();

            string SQLCOMMAND = "select machineData from injectionMachine where machineID='" + Request["machineID"] + "'";
            // string SQLCOMMAND = "select machineData from injectionMachine where machineID='" + "gefranVedo001" + "'";

            DataSet ds = new DataSet();
            SqlDataAdapter da = new SqlDataAdapter(SQLCOMMAND, conn);
            da.Fill(ds);
            if (ds.Tables[0].Rows.Count != 0)
            {
                jo = (JObject)JsonConvert.DeserializeObject(ds.Tables[0].Rows[0][0].ToString());
                conn.Close();
                string str = System.Diagnostics.Process.GetCurrentProcess().MainModule.FileName;
                StreamReader file = new StreamReader(Server.MapPath("../Clamp_ch.txt"));
                string strTmp2 = file.ReadToEnd();
                foreach (var item in jo)
                {
                    if (item.Value.ToString().IndexOf("\":") != -1)
                    {
                        foreach (var itemValue in (JObject)item.Value)
                        {
                            string valueName = itemValue.Key;
                            if (jo[item.Key][itemValue.Key][0].Count() >= 2)
                            {
                                for (int j = 0; j < jo[item.Key][itemValue.Key].Count(); j++)
                                {
                                    valueName += "[" + j.ToString() + "]";
                                    string strTempAboutName = System.Text.RegularExpressions.Regex.Match(strTmp2, valueName + @"[^;]+").ToString();
                                    if (strTempAboutName != "")
                                        jo[item.Key][itemValue.Key][j][0] = strTempAboutName.Split(':')[1];
                                }

                            }
                            else
                            {
                                string strTempAboutName = System.Text.RegularExpressions.Regex.Match(strTmp2, valueName + @"[^;]+").ToString();
                                if (strTempAboutName != "")
                                    jo[item.Key][itemValue.Key][0] = strTempAboutName.Split(':')[1];
                            }
                        }
                    }
                }
              }
            }
            try
            {
                if (UnitID == "all")
                {
                    strResult = jo.ToString();
                }
                else if (UnitID == "head")
                {
                    strResult = "{\r\n";
                    foreach (var item in jo)
                    {
                        if (item.Value.ToString().IndexOf("\":") == -1)
                            strResult += "\"" + item.Key + "\":\"" + item.Value + "\",\r\n";
                    }
                    strResult = strResult.Remove(strResult.LastIndexOf(',')) + "\r\n}";
                }
                else if (Request["UnitID"] == "overview" && Request["MachineID"] == "all")
                {

                    //strResult = "{\r\n\"machineID\":\r\n \"keba001\",\r\n\"orderID\":\r\n \"201333234\"}";
                    strResult = jo.ToString();

                }
                else if (Request["UnitID"] == "overView")
                {
                    string SQLCONNECT = @"server=JS-DIANQI\SQLEXPRESS;database=mySQL;uid=sa;pwd=1234";
                    SqlConnection conn = new SqlConnection(SQLCONNECT);
                    conn.Open();

                    string SQLCOMMAND = "select connDetail from connectionOption where machineID='"+Request["machineID"]+"'";
                    DataSet ds = new DataSet();
                    SqlDataAdapter da = new SqlDataAdapter(SQLCOMMAND, conn);
                    da.Fill(ds);
                    JObject joOverview=(JObject)jo["overView"];
                    joOverview.Merge((JObject)JsonConvert.DeserializeObject(ds.Tables[0].Rows[0][0].ToString()));
                    strResult = joOverview.ToString();
                    conn.Close();

                }
                else
                {
                    strResult = jo[UnitID].ToString();
                }
            }
            catch (Exception ex)
            {
                strResult = ex.Message;
            }
            
   
        }
        if(Request["command"] == "qualityData")
        {

            JObject Filter = (JObject)JsonConvert.DeserializeObject(Request["filter"]);

             string SQLCONNECT = @"server=JS-DIANQI\SQLEXPRESS;database=mySQL;uid=sa;pwd=1234";
            SqlConnection conn = new SqlConnection(SQLCONNECT);
            conn.Open();

            string SQLCOMMAND = "select top " + Filter["quantity"] + " machineID,qualityData,timestamp from qualityManage where machineID = '" + Filter["machineIDFilter"] + "'and timestamp>'" + Filter["datePicker_1"] + "'and timestamp<'" + Filter["datePicker_2"] + "'order by id desc";
            DataSet ds = new DataSet();
            SqlDataAdapter da = new SqlDataAdapter(SQLCOMMAND, conn);
            da.Fill(ds);
            strResult = JsonConvert.SerializeObject(ds.Tables[0].Rows[0][0]);
            JArray ja = new JArray();
            if (ds.Tables[0].Rows.Count != 0)
            {
               for(int i=0; i< ds.Tables[0].Rows.Count;i++)
               {
                   string rowData = "";
                   JObject jo = new JObject();
                   for (int j = 0; j < ds.Tables[0].Columns.Count;j++ )
                   {
                       if (ds.Tables[0].Columns[j].ColumnName == "qualityData")
                       {
                           
                           jo.Merge(JsonConvert.DeserializeObject(ds.Tables[0].Rows[i][j].ToString()));
                       }
                       else
                        jo.Add(ds.Tables[0].Columns[j].ColumnName,ds.Tables[0].Rows[i][j].ToString().Trim());
                       
                   }
                   ja.Add(jo);
               }
               if (Filter.Property("saveData") != null && Filter["saveData"].ToString() == "1")
               {
                   string filePath = Server.MapPath("") + "\\quality.xlsx";
                  // excelHelper.SaveDataTableToExcel(ds.Tables[0], filePath);                 
                   excelHelper.writeDataToExcel(filePath, ja);
               }   
               strResult= JsonConvert.SerializeObject(ja);
               conn.Close();
            }

        }
else if (Request["command"] == "moldData")
{
    string[] moldDataFileOfKeba = Directory.GetFiles("c:\\ftp\\molddata\\keba");
    string[] moldDataFileOfGefranVedo = Directory.GetFiles("c:\\ftp\\molddata\\gefranVedo");
    string[] moldDataFileOfGefranPerforma = Directory.GetFiles("c:\\ftp\\molddata\\gefranPerforma");
    JArray ja = new JArray();
    foreach (string tmp in moldDataFileOfKeba)
    {
        JObject jo = new JObject();
        System.IO.DirectoryInfo dir = new System.IO.DirectoryInfo(tmp);
                DateTime DT = dir.CreationTime;//获取目录或者文件的创建 日期
        jo.Add("name",tmp.Substring(tmp.LastIndexOf('\\')+1,tmp.LastIndexOf(".")-tmp.LastIndexOf("\\")-1));
        jo.Add("controllerType", "keba");
        jo.Add("date",DT.ToString());
        ja.Add(jo);
    }
    foreach (string tmp in moldDataFileOfGefranVedo)
    {
        JObject jo = new JObject();
        System.IO.DirectoryInfo dir = new System.IO.DirectoryInfo(tmp);
        DateTime DT = dir.CreationTime;//获取目录或者文件的创建 日期
        jo.Add("name", tmp.Substring(tmp.LastIndexOf('\\')+1,tmp.LastIndexOf(".")-tmp.LastIndexOf("\\")-1));
        jo.Add("controllerType", "gefranVedo");
        jo.Add("date", DT.ToString());
        ja.Add(jo);
    }
    foreach (string tmp in moldDataFileOfGefranPerforma)
    {
        JObject jo = new JObject();
        System.IO.DirectoryInfo dir = new System.IO.DirectoryInfo(tmp);
        DateTime DT = dir.CreationTime;//获取目录或者文件的创建 日期
        jo.Add("name", tmp.Substring(tmp.LastIndexOf('\\')+1,tmp.LastIndexOf(".")-tmp.LastIndexOf("\\")-1));
        jo.Add("controllerType", "gefranPerforma");
        jo.Add("date", DT.ToString());
        ja.Add(jo);
    }
    strResult = JsonConvert.SerializeObject(ja);
}
else if (Request["command"] == "moldDataName")
{
    JArray ja = new JArray();
    test t = new test();
    FtpHelper ftpTmp = new FtpHelper();
    string filepath = "ftp://192.168.7.210/workspace/data/molddata";
    string[] strFileName = ftpTmp.GetFilePath("keba", "keba",filepath);
    int i = 0;
    foreach (string tmp in strFileName)
    { 
        if (strFileName[i].IndexOf("xml") != -1)
        {
            ja.Add(strFileName[i].Substring(0,strFileName[i].IndexOf(".")-1));
        }
        i++;
    }
 
    strResult = ja.ToString();
    

}
    Response.Clear();
    Response.Write(strResult);
    Response.End();


    }
}