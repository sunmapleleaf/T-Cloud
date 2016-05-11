﻿
using System.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Globalization;
using System.Net;
using System.IO;
/// <summary>
/// FtpHelper 的摘要说明
/// </summary>
public class FtpHelper
{
    public static readonly FtpHelper Instance = new FtpHelper();

    /// <summary>  
    /// 取得文件名  
    /// </summary>  
    /// <param name="ftpPath">ftp路径</param>  
    /// <returns></returns>  
    public string[] GetFilePath(string userId, string pwd, string ftpPath)
    {
        string[] downloadFiles;
        StringBuilder result = new StringBuilder();
        FtpWebRequest reqFTP;
        try
        {
            reqFTP = (FtpWebRequest)FtpWebRequest.Create(new Uri(ftpPath));
            reqFTP.UseBinary = true;
            reqFTP.Credentials = new NetworkCredential(userId, pwd);
            reqFTP.Method = WebRequestMethods.Ftp.ListDirectory;
            reqFTP.UsePassive = false;

            WebResponse response = reqFTP.GetResponse();


            StreamReader reader = new StreamReader(response.GetResponseStream());
            string line = reader.ReadLine();
            while (line != null)
            {
                result.Append(line);
                result.Append("\n");
                line = reader.ReadLine();
            }
            result.Remove(result.ToString().LastIndexOf('\n'), 1);
            reader.Close();
            response.Close();
            return result.ToString().Split('\n');
        }
        catch (Exception ex)
        {
            downloadFiles = null;
            return downloadFiles;
        }
    }

    //ftp的上传功能  
    public void Upload(string userId, string pwd, string filename, string ftpPath)
    {
        FileInfo fileInf = new FileInfo(filename);
        FtpWebRequest reqFTP;
        // 根据uri创建FtpWebRequest对象   
        reqFTP = (FtpWebRequest)FtpWebRequest.Create(new Uri(ftpPath + fileInf.Name));
        // ftp用户名和密码  
        reqFTP.Credentials = new NetworkCredential(userId, pwd);

        reqFTP.UsePassive = false;
        // 默认为true，连接不会被关闭  
        // 在一个命令之后被执行  
        reqFTP.KeepAlive = false;
        // 指定执行什么命令  
        reqFTP.Method = WebRequestMethods.Ftp.UploadFile;
        // 指定数据传输类型  
        reqFTP.UseBinary = true;
        // 上传文件时通知服务器文件的大小  
        reqFTP.ContentLength = fileInf.Length;
        // 缓冲大小设置为2kb  
        int buffLength = 2048;
        byte[] buff = new byte[buffLength];
        int contentLen;
        // 打开一个文件流 (System.IO.FileStream) 去读上传的文件  
        FileStream fs = fileInf.OpenRead();
        try
        {
            // 把上传的文件写入流  
            Stream strm = reqFTP.GetRequestStream();
            // 每次读文件流的2kb  
            contentLen = fs.Read(buff, 0, buffLength);
            // 流内容没有结束  
            while (contentLen != 0)
            {
                // 把内容从file stream 写入 upload stream  
                strm.Write(buff, 0, contentLen);
                contentLen = fs.Read(buff, 0, buffLength);
            }
            // 关闭两个流  
            strm.Close();
            fs.Close();
        }
        catch (Exception ex)
        {

        }
    }

    public void Delete(string userId, string pwd, string ftpPath, string fileName)
    {
        FtpWebRequest reqFTP;
        try
        {
            reqFTP = (FtpWebRequest)FtpWebRequest.Create(new Uri(ftpPath + fileName));
            reqFTP.Method = WebRequestMethods.Ftp.DeleteFile;
            reqFTP.UseBinary = true;
            reqFTP.Credentials = new NetworkCredential(userId, pwd);
            reqFTP.UsePassive = false;
            FtpWebResponse listResponse = (FtpWebResponse)reqFTP.GetResponse();
            string sStatus = listResponse.StatusDescription;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    //从ftp服务器上下载文件的功能  
    public void Download(string userId, string pwd, string ftpPath, string filePath, string sourceFileName, string targetFileName)
    {
        FtpWebRequest reqFTP;
        try
        {
            FileStream outputStream = new FileStream(filePath + "\\" + targetFileName, FileMode.Create);
            reqFTP = (FtpWebRequest)FtpWebRequest.Create(new Uri(ftpPath + sourceFileName));
            reqFTP.Method = WebRequestMethods.Ftp.DownloadFile;
            reqFTP.UseBinary = true;
            reqFTP.Credentials = new NetworkCredential(userId, pwd);
            reqFTP.UsePassive = false;

            //   DateTime beforDT = System.DateTime.Now;

            FtpWebResponse response = (FtpWebResponse)reqFTP.GetResponse();
            // DateTime afterDT = System.DateTime.Now;
            //  TimeSpan ts = afterDT.Subtract(beforDT);
            // Console.WriteLine("1DateTime总共花费{0}ms.", ts.TotalMilliseconds);


            Stream ftpStream = response.GetResponseStream();
            long cl = response.ContentLength;
            int bufferSize = 2048;
            int readCount;
            byte[] buffer = new byte[bufferSize];
            readCount = ftpStream.Read(buffer, 0, bufferSize);
            while (readCount > 0)
            {
                outputStream.Write(buffer, 0, readCount);
                readCount = ftpStream.Read(buffer, 0, bufferSize);
            }
            ftpStream.Close();
            outputStream.Close();
            response.Close();


        }
        catch (Exception ex)
        {
            throw ex;
        }
    }  
}