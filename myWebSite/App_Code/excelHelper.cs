using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Reflection;
using System.Diagnostics;
using System.IO;
using System.Data;
using System.Data.OleDb;
using System.ComponentModel;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Runtime.InteropServices;
using Excel = Microsoft.Office.Interop.Excel;
using ExcelApplication = Microsoft.Office.Interop.Excel.Application;
//using System.Windows.Forms;
using System.Reflection;

   public class excelHelper
    {
        //加载Excel   
        public static void writeDataToExcel(string filePath, JArray data)
        {
            Excel.Application xApp = new Excel.Application();
            try
            {
                //xApp.Visible = true;
                //得到WorkBook对象, 可以用两种方式之一: 下面的是打开已有的文件
                Excel.Workbook xBook = xApp.Workbooks._Open(filePath,
                Missing.Value, Missing.Value, Missing.Value, Missing.Value
                , Missing.Value, Missing.Value, Missing.Value, Missing.Value
                , Missing.Value, Missing.Value, Missing.Value, Missing.Value);

                //xBook=xApp.Workbooks.Add(Missing.Value);//新建文件的代码
                //指定要操作的Sheet，两种方式：

                Excel.Worksheet xSheet = (Excel.Worksheet)xBook.Sheets[1];
                xSheet.get_Range(xSheet.Cells[1, 1], xSheet.Cells[300, 30]).Delete(Excel.XlDeleteShiftDirection.xlShiftUp);//这是删除

                Excel.Range range = (Excel.Range)xSheet.get_Range("B2", "M2");     //获取Excel多个单元格区域：本例做为Excel表头
                range.NumberFormatLocal = "@";     //设置单元格格式为文本 

                range.Merge(0);     //单元格合并动作
                xSheet.Cells[2, 2] = "质量管理数据";     //Excel单元格赋值
                range.Font.Size = 15;     //设置字体大小
                range.Font.Name="黑体";     //设置字体的种类
                range = (Excel.Range)xSheet.get_Range(xSheet.Cells[3, 3], xSheet.Cells[20, 20]);
                range.ColumnWidth = 10;     //设置单元格的宽度
                range.EntireColumn.AutoFit();     //自动调整列宽
                range.HorizontalAlignment = Excel.Constants.xlCenter;     // 文本水平居中方式
                range.VerticalAlignment = Excel.Constants.xlCenter;     //文本垂直居中方式
                ((Excel.Range)xSheet.get_Range("M3", "M3")).ColumnWidth=15;
                string strTmp = "";
                int i = 3;
                List<Excel.Range> listRange = new List<Excel.Range>();
                int j = 2;

                
                string[] name = { "机器编号","产品编号","保压切换","螺杆终点","注射时间","切换压力","机器循环","周期时间","熔胶时间","熔胶终点","最大射压","采样时间"};
                foreach (string tmp in name)
                {
                    xSheet.Cells[i, j] = tmp;
                    j++;
                }
                i++;
                foreach(JObject jo in data)
                {
                    j = 2;
                    foreach (var tmp in jo)
                    {
                        if (jo[tmp.Key].Type.ToString()=="String")
                            strTmp = jo[tmp.Key].ToString();
                        else
                            strTmp = jo[tmp.Key][1].ToString();
                        xSheet.Cells[i, j] = strTmp;

                         j++;
                    }
                    i++;


                }


  


                // rng3.Interior.ColorIndex = 6; //设置Range的背景色

                //保存方式一：保存WorkBook
                xApp.DisplayAlerts = false;

                xBook.SaveAs(filePath,
                Missing.Value, Missing.Value, Missing.Value, Missing.Value, Missing.Value,
                Excel.XlSaveAsAccessMode.xlNoChange, Missing.Value, Missing.Value, Missing.Value,
                Missing.Value, Missing.Value);

                xSheet = null;
                xBook = null;
                xApp.Quit(); //这一句是非常重要的，否则Excel对象不能从内存中退出
                xApp = null;



            }
            catch
            {
                xApp.Quit(); //这一句是非常重要的，否则Excel对象不能从内存中退出
                xApp = null;
            }
            
        }

        public static bool SaveDataTableToExcel(System.Data.DataTable excelTable, string filePath)
        {
            Microsoft.Office.Interop.Excel.Application app =
                new Microsoft.Office.Interop.Excel.ApplicationClass();
            try
            {
                app.Visible = false;
                Excel.Workbook wBook = app.Workbooks.Add(true);
                Excel.Worksheet wSheet = wBook.Worksheets[1] as Excel.Worksheet;
                if (excelTable.Rows.Count > 0)
                {
                    int row = 0;
                    row = excelTable.Rows.Count;
                    int col = excelTable.Columns.Count;
                    for (int i = 0; i < row; i++)
                    {
                        for (int j = 0; j < col; j++)
                        {
                            string str = excelTable.Rows[i][j].ToString();
                            wSheet.Cells[i + 2, j + 1] = str;
                        }
                    }
                }

                int size = excelTable.Columns.Count;
                for (int i = 0; i < size; i++)
                {
                    wSheet.Cells[1, 1 + i] = excelTable.Columns[i].ColumnName;
                }
                //设置禁止弹出保存和覆盖的询问提示框 
                app.DisplayAlerts = false;
                app.AlertBeforeOverwriting = false;
                //保存工作簿 < type="text/JavaScript"> alimama_pid="mm_10249644_1605763_5027492"; alimama_type="f"; alimama_sizecode ="tl_1x5_8"; alimama_fontsize=12; alimama_bordercolor="FFFFFF"; alimama_bgcolor="FFFFFF"; alimama_titlecolor="0000FF"; alimama_underline=0; alimama_height=22; alimama_width=0; < src="http://a.alimama.cn/inf.js" type=text/javascript> 
                wBook.SaveAs(filePath);
                //保存excel文件 
                app.Save(filePath);
                app.SaveWorkspace(filePath);
                app.Quit();
                app = null;
                return true;
            }
            catch (Exception err)
            {
             //   MessageBox.Show("导出Excel出错！错误原因：" + err.Message, "提示信息",
               //     MessageBoxButtons.OK, MessageBoxIcon.Information);
                return false;
            }
            finally
            {
            }
        }

      
    }

