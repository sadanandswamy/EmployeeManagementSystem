using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.OleDb;
using System.Data;

namespace EmployeeServiceWithAPI.Models.EmployeeCrud
{
    public class EmployeeCrudMethods
    {
        OleDbConnection con;
        OleDbCommand cmd;
        OleDbDataAdapter adapter;
        DataSet ds;
        int rno;
         
        public static List<Department> departments = new List<Department>()
                {
                    new Department(){ DeptId=1,DeptName="IT" },
                    new Department(){ DeptId=2,DeptName="PayRoll" },
                    new Department(){ DeptId=3,DeptName="Finance" },
                    new Department(){ DeptId=4,DeptName="HR" },
                    new Department(){ DeptId=5,DeptName="Accounting" },
                    new Department(){ DeptId=6,DeptName="Admin" },
                };
        public EmployeeCrudMethods()
        {
            try
            {
                con = new OleDbConnection(@" provider=Microsoft.ace.Oledb.12.0; data source=D:\Sadanand Projects\EmployeeDb.accdb;Persist Security Info=False");
                

            }
            catch (Exception ex)
            {


            }

        }


        public int deleteEmployee(int id)
        {
             if (id.ToString() != null)
            {
                cmd = new OleDbCommand("delete from Employee where ID=@ID", con);
                cmd.Parameters.AddWithValue("@ID", id);
                con.Open();
                  cmd.ExecuteNonQuery();
               
                con.Close();
                return id;
            }
            else
            {
                return id;
            }

        }

        public Employee GetEmployeeByid(int id)
        {
            return GetAllEmployees().ToList().FirstOrDefault(e => e.ID == id);
        }


        public List<Employee> GetAllEmployees()
        {
            List<Employee> employees = new List<Employee>();
            try
            {
               
               
                
                adapter = new OleDbDataAdapter("select * from Employee", con);
                ds = new DataSet();//student-> table name in stud.accdb file
                adapter.Fill(ds, "Employee");
                //ds.Tables[0].Columns[0].AutoIncrement = true;
                //ds.Tables[0].Columns[0].AutoIncrementSeed = 0;
                //ds.Tables[0].Columns[0].AutoIncrementStep = 1;
                //DataColumn[] pKey = new DataColumn[1];
                //pKey[0] = ds.Tables[0].Columns["ID"];
                //ds.Tables[0].PrimaryKey = pKey; 
                employees = ds.Tables[0].AsEnumerable().
                     Select(dataRow => new Employee
                     {

                         ID = dataRow.Field<int>("ID"),
                         Name = dataRow.Field<string>("FullName"),
                         Gender = dataRow.Field<string>("Gender"),

                         Email = dataRow.Field<string>("Email"),


                         PhoneNumber = dataRow.Field<string>("PhoneNumber"),
                         DepartmentId = Convert.ToInt32(dataRow.Field<int>("DepartmentID")),
                         DepartmentName  = (dataRow.Field<string>("DepartmentName")),
                         DateOfBirth = dataRow.Field<DateTime>("DateOfBirth"), 
                         Address = dataRow.Field<string>("Address"),

                         CityId = dataRow.Field<int>("CityId"),
                         CityName = dataRow.Field<string>("CityName"),

                         StateId = dataRow.Field<int>("StateId"),
                         StateName = dataRow.Field<string>("StateName"),

                         CountryId = dataRow.Field<int>("CountryId"),
                         CountryName = dataRow.Field<string>("CountryName"),
                         PostalCode = dataRow.Field<int>("PostalCode").ToString(),

                     }).ToList();


                con.Close();
                   
                return employees;
               
            }
            catch (Exception ex)
            {

                throw;
            }

        }
        public int InsertEmployee(Employee employee)
        {
            List<Employee> employees = GetAllEmployees();
            int maxnumber = (employees.Max(e=>e.ID)+1);
            cmd = new OleDbCommand("insert into Employee(ID,FullName,Gender,Email,PhoneNumber,DepartmentId,DepartmentName,DateOfBirth,Address,CityId,CityName,StateId,StateName,CountryId,CountryName,PostalCode) values(@ID,@FullName,@Gender,@Email,@PhoneNumber,@DepartmentId,@DepartmentName,@DateOfBirth,@Address,@CityId,@CityName,@StateId,@StateName,@CountryId,@CountryName,@PostalCode)", con);
            cmd.Parameters.AddWithValue("@ID", maxnumber);
            cmd.Parameters.AddWithValue("@FullName", employee.Name);
            cmd.Parameters.AddWithValue("@Gender", employee.Gender);
            cmd.Parameters.AddWithValue("@Email", employee.Email);
            cmd.Parameters.AddWithValue("@PhoneNumber", employee.PhoneNumber);
            cmd.Parameters.AddWithValue("@DepartmentId", employee.DepartmentId);
            cmd.Parameters.AddWithValue("@DepartmentName", employee.DepartmentName);
            cmd.Parameters.AddWithValue("@DateOfBirth", employee.DateOfBirth);
            cmd.Parameters.AddWithValue("@Address", employee.Address);
            cmd.Parameters.AddWithValue("@CityId", employee.CityId);
            cmd.Parameters.AddWithValue("@CityName", employee.CityName);
            cmd.Parameters.AddWithValue("@StateId", employee.StateId);
            cmd.Parameters.AddWithValue("@StateName", employee.StateName);
            cmd.Parameters.AddWithValue("@CountryId", employee.CountryId);
            cmd.Parameters.AddWithValue("@CountryName", employee.CountryName);
            cmd.Parameters.AddWithValue("@PostalCode", employee.PostalCode);
            con.Open();
            int n = cmd.ExecuteNonQuery();
            
            con.Close();


            return n;

        }

        public Employee updateEmployee(int id, Employee employee)
        {
            var emp = GetAllEmployees().ToList().FirstOrDefault(e => e.ID == id);
            if (emp != null)
            {
                cmd = new OleDbCommand("update  Employee set FullName=@FullName,Gender=@Gender,Email=@Email,PhoneNumber=@PhoneNumber,DepartmentId=@DepartmentId,DepartmentName=@DepartmentName,DateOfBirth=@DateOfBirth,Address=@Address,CityId=@CityId,CityName=@CityName,StateId=@StateId,StateName=@StateName,CountryId=@CountryId,CountryName=@CountryName,PostalCode=@PostalCode where ID=@ID", con);
                
                cmd.Parameters.AddWithValue("@FullName", employee.Name);
                cmd.Parameters.AddWithValue("@Gender", employee.Gender);
                cmd.Parameters.AddWithValue("@Email", employee.Email);
                cmd.Parameters.AddWithValue("@PhoneNumber", employee.PhoneNumber);
                cmd.Parameters.AddWithValue("@DepartmentId", employee.DepartmentId);
                cmd.Parameters.AddWithValue("@DepartmentName", employee.DepartmentName);
                cmd.Parameters.AddWithValue("@DateOfBirth", employee.DateOfBirth);
                cmd.Parameters.AddWithValue("@Address", employee.Address);
                cmd.Parameters.AddWithValue("@CityId", employee.CityId);
                cmd.Parameters.AddWithValue("@CityName", employee.CityName);
                cmd.Parameters.AddWithValue("@StateId", employee.StateId);
                cmd.Parameters.AddWithValue("@StateName", employee.StateName);
                cmd.Parameters.AddWithValue("@CountryId", employee.CountryId);
                cmd.Parameters.AddWithValue("@CountryName", employee.CountryName);
                cmd.Parameters.AddWithValue("@PostalCode", employee.PostalCode);
                cmd.Parameters.AddWithValue("@ID", employee.ID);
                con.Open();
                int n = cmd.ExecuteNonQuery();
                con.Close();
                return employee;
            }
            else
            {
                 return employee;
            }

        }

        public class Employee
        {

            public int ID { get; set; }

            public string Name { get; set; }

            public string Gender { get; set; }
            public string Email { get; set; }

            public DateTime DateOfBirth { get; set; }
            public int DepartmentId { get; set; }
            public string DepartmentName { get; set; }
            public string Address { get; set; }
            public string PhoneNumber { get; set; }
            public int StateId { get; set; }

            public string StateName { get; set; }

            public int CityId { get; set; }
            public string CityName { get; set; }
            public int CountryId { get; set; }
            public string CountryName { get; set; }

            public string PostalCode { get; set; }

        }
    }
}