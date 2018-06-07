using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.Linq;
using System.Web;

namespace EmployeeServiceWithAPI.Models.Security
{
    public class User
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string user_token { get; set; }
    }

    public class RegisterUsers
    {

        OleDbConnection con;
        OleDbCommand cmd;
        OleDbDataAdapter adapter;
        DataSet ds;
        public RegisterUsers()
        {
            con = new OleDbConnection(@" provider=Microsoft.ace.Oledb.12.0; data source=D:\Sadanand Projects\EmployeeDb.accdb;Persist Security Info=False");
        }
        public List<User> GetUsers()
        {
            List<User> users = new List<User>();
            adapter = new OleDbDataAdapter("select * from Users", con);
            ds = new DataSet();//student-> table name in stud.accdb file
            adapter.Fill(ds, "Users");
            users = ds.Tables[0].AsEnumerable().
                     Select(dataRow => new User
                     {

                         UserName = dataRow.Field<string>("UserName"),
                         Password = dataRow.Field<string>("Password"),
                     }).ToList();
            return users;
        }

        public int RegisterUser(User user)
        {
            cmd = new OleDbCommand("insert into Users values (@UserName,@Password)", con);
            cmd.Parameters.AddWithValue("UserName", user.UserName);
            cmd.Parameters.AddWithValue("Password", user.Password);
            con.Open();
            int res = cmd.ExecuteNonQuery();
            con.Close();
            return res;
        }


        public bool Login(User user)
        {
            return GetUsers().Any(x =>
                             x.UserName.Equals(user.UserName, StringComparison.OrdinalIgnoreCase)
                                                && x.Password == user.Password);

        }

    }

}