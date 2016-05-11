using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net;
using System.Threading;
using System.Net.NetworkInformation;
using System.Data.SqlClient;
using System.Data;

    
   public class InjectionMachine
    {
        public string machineID;
        public object clamp;
        public object injection;
        public virtual void getDataFromController(ConnectionOption p)
        {
        }
    }
    public class InjectionMachineWithGefran : InjectionMachine
    {
    //    public ClampDataFromGefran clamp;
     //   public InjectionDataFromGefran injection;
        public InjectionMachineWithGefran()
        {
            clamp = new ClampDataFromGefran();
            injection = new InjectionDataFromGefran();
        }
        public override void getDataFromController(ConnectionOption p)
        {

            string variableValue = "", variableName = "";

            DateTime beforDT = System.DateTime.Now;
            //json
            JsonSerializer jsS = new JsonSerializer();
            StringWriter sw = new StringWriter();
            jsS.Serialize(new JsonTextWriter(sw), this);

            JObject jo = (JObject)JsonConvert.DeserializeObject(sw.ToString());

       //     Console.WriteLine(jsS.DateFormatString);
            foreach (var item in jo)
            {

                if (item.Value.ToString().IndexOf(":") == -1) ;
                //  jo[item.Key] = "1";
                else
                {
                    foreach (var itemValue in (JObject)item.Value)
                    {
                        variableName += itemValue.Key + ";";
                        //  jo[item.Key][itemValue.Key] = variableValue;
                    }
                }
            }
            

            const int varArrayLength = 10;
  

            String[] varNameTmp = variableName.Split(';');
            List<String> varNameList = new List<string>();

            for (int i = 0, j = 0; i < varNameTmp.Count(); i++)
            {
                if (i % varArrayLength == 0)
                {
                    varNameList.Add(varNameTmp[i]);
                    j++;
                }
                else
                    varNameList[j - 1] += ";" + varNameTmp[i];
            }


            // p.telnet = new Telnet(p.IP, 23, 50);
          
            //if (p.telnet.Connect() == false)
            //{
            //    // // Console.WriteLine("连接失败");
            //    MessageBox.Show("连接失败");
            //    variableValue = null;
            //    variableName = null;
            //    //   p.telnetClose();
            //    return;
            //}
            //bool boolTMP= p.telnet.IsTelnetConnected();
            ////等待指定字符返回后才执行下一命令
            //p.telnet.WaitFor("login:");
            //p.telnet.Send(p.loginName);
            //p.telnet.WaitFor("password:");
            //p.telnet.Send(p.loginPassword);
            //p.telnet.WaitFor(">");
            variableValue = null;
            for (int i = 0; i < varNameList.Count(); i++)
            {
                p.telnet.Send(varNameList[i]);
                p.telnet.WaitFor(">");
                String[] varValueTmp = p.telnet.WorkingData.Split(new char[] { '\r' });

                for (int j = 0; j < varValueTmp.Count(); j++)
                {
                    if (varValueTmp[j].Split('=').Count() > 2)
                        variableValue += varValueTmp[j].Split('=')[2] + ";";
                }
            }
           
            string[] varValueArr = variableValue.Split(';');
            int iTmp = 0;
            foreach (var item in jo)
            {
                if (item.Value.ToString().IndexOf(":") != -1) 
                    foreach (var itemValue in (JObject)item.Value)
                    {                  
                        jo[item.Key][itemValue.Key] = varValueArr[iTmp];
                        iTmp++;
                    }
            }
          //  Console.WriteLine(jo.ToString());
            jo["machineID"] = p.machineID;



            string SQLCONNECT = @"server=JS-DIANQI\SQLEXPRESS;database=mySQL;uid=sa;pwd=1234";
            SqlConnection conn = new SqlConnection(SQLCONNECT);
            conn.Open();
             SqlCommand sqlcmd = new SqlCommand("", conn);
             sqlcmd.CommandText = "if exists ( select machineID from injectionMachine where machineID = '"+p.machineID+"') "+
                 "begin update injectionMachine set machineData='"+jo.ToString()+"' end "+
                 "else begin insert injectionMachine(machineID,machineData)values('"+p.machineID+"','"+jo.ToString()+"') end";
             //sqlcmd.Parameters.Add("@machineID", SqlDbType.Char, 24).Value = p.machineID;
             //sqlcmd.Parameters.Add("@machineData", SqlDbType.NText).Value = jo.ToString();

                
            //sqlcmd.CommandText = "INSERT injectionMachine(machineID,machineData)VALUES('";
            //sqlcmd.CommandText += p.machineID + "','" + jo.ToString()+"')";
            sqlcmd.ExecuteNonQuery();  
            conn.Close();



           

            DateTime afterDT = System.DateTime.Now;
            TimeSpan ts = afterDT.Subtract(beforDT);
            Console.WriteLine("DateTime总共花费{0}ms.", ts.TotalMilliseconds);

        }
    }
   public class ClampDataFromGefran
    {
       public string sPO_MC01;
       public string sPO_MC02;
       public string sPO_MC03;
       public string sPO_MC04;
       public string sSP_MC01;
       public string sSP_MC02;
       public string sSP_MC03;
       public string sSP_MC04;
       public string sSP_MC05;
       public string sPR_MC01;
       public string sPR_MC02;
       public string sPR_MC03;
       public string sPR_MC04;
       public string sPR_MC05;
       public string sSP_MCSL;
       public string sPR_MCSL;
       public string sTM_MCSA;
       public string sTM_MCLOS;
       public string sPO_MOPN;
       public string sPO_MO04;
        public string sPO_MO03;
        public string sPO_MO02;
        public string sPO_MO01;
        public string sSP_MO05;
        public string sSP_MO04;
        public string sSP_MO03;
        public string sSP_MO02;
        public string sSP_MO01;
        public string sPR_MO05;
        public string sPR_MO04;
        public string sPR_MO03;
        public string sPR_MO02;
        public string sPR_MO01;
        public string sSP_MOLS;
        public string sPR_MOLP;
        public string sTM_MOPEN;
    }
   public class InjectionDataFromGefran
    {
        public string aPO_INJE;

    }
   public class ConnectionOption
    {
        public string controllerType { get; set; }
        public string machineID{get;set;}
        public string protocol { get; set; }
        public string IP { get; set; }
        public string loginName { get; set; }
        public string loginPassword { get; set; }
        public string connConfirm { get; set; }
        public string connStatus { get; set; }
        public string isDisplay { get; set; }
        public string connTotalTime { get; set; }
        public string connTimeList { get; set; }
        public string orderNumber { get; set; }
        public string userID { get; set; }
        public Telnet telnet;
        public bool connectToController()
        {
            bool status = false;
            foreach (string item in ipList)
            {
                if(item ==IP)
                {
                    status = true;
                    break;
                }
            }

            Ping pingController = new Ping();
            PingReply reply = pingController.Send(IP, 10);
            if (reply.Status == IPStatus.Success)
            {
                status = true;
            }
            if (status == false)
                return status;
            telnet = new Telnet(IP, 23, 50);

            if (telnet.Connect() == false)
            {
                status = false;
               
                return status;
            }

            if (status.ToString() != connStatus)
            {               
                connTimeList += DateTime.Now.ToString();
            }
            if (status)
                connStatus = "1";
            else
                connStatus = "0";
            //等待指定字符返回后才执行下一命令
            telnet.WaitFor("login:");
            telnet.Send(loginName);
            telnet.WaitFor("password:");
            telnet.Send(loginPassword);
            telnet.WaitFor(">");
            return status;
        }
        public void disconnectToController()
        {
             telnet.telnetClose();
        }
        static List<string> ipList = new List<string>();
        static public void getIP()
        {

            ////获取本地机器名 
            //string _myHostName = Dns.GetHostName();
            ////获取本机IP 
            //string _myHostIP = Dns.GetHostEntry(_myHostName).AddressList[0].ToString();
            ////截取IP网段
            // string ipDuan = _myHostIP.Remove(_myHostIP.LastIndexOf('.'));
            //枚举网段计算机
            for (int i = 1; i <= 255; i++)
            {
                Ping myPing = new Ping();
                myPing.PingCompleted += new PingCompletedEventHandler(_myPing_PingCompleted);
                string pingIP = "192.168.8." + i.ToString();
                myPing.SendAsync(pingIP, 1000, null);

            }
            Thread.Sleep(500);
        }
        static void _myPing_PingCompleted(object sender, PingCompletedEventArgs e)
        {
            if (e.Reply.Status == IPStatus.Success)
            {
                ipList.Add(e.Reply.Address.ToString());
            }
        }

    }
       

