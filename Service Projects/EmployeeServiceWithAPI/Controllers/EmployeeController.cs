using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using EmployeeServiceWithAPI.Models;
using EmployeeServiceWithAPI.Models.EmployeeCrud;
using static EmployeeServiceWithAPI.Models.EmployeeCrud.EmployeeCrudMethods;
using EmployeeServiceWithAPI.Models.Security;
using System.Threading;

namespace EmployeeServiceWithAPI.Controllers
{
    [EnableCorsAttribute("*", "*", "*")]
    [BasicAuthentication]
    public class EmployeeController : ApiController
    {
        // GET: api/Employee

        EmployeeCrudMethods objEmployeeCrudMethods = new EmployeeCrudMethods();
        public HttpResponseMessage Get()
        {
            try
            {
                string username = Thread.CurrentPrincipal.Identity.Name;
                HttpResponseMessage response;
                if (!string.IsNullOrEmpty(username))
                {
                    response= Request.CreateResponse(HttpStatusCode.OK, objEmployeeCrudMethods.GetAllEmployees());
                    return response;
                }
                else
                {
                    response= Request.CreateResponse(HttpStatusCode.OK,"401");
                    return response;
                }
               

            }
            catch (Exception ex)
            {

                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
           
 
        }

        // GET: api/Employee/5
        public HttpResponseMessage Get(int id)
        {
            try
            {
                Employee emp = objEmployeeCrudMethods.GetEmployeeByid(id);
                if (emp==null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, "Employee with id: "+id.ToString() +" Not found");
                }
                   return Request.CreateResponse(HttpStatusCode.OK, emp);
            }
            catch (Exception ex )
            {

                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        // POST: api/Employee
        public HttpResponseMessage Post([FromBody]Employee employee)
        {
            try
            {
               int newid= objEmployeeCrudMethods.InsertEmployee(employee);
                var response= Request.CreateResponse<Employee>(HttpStatusCode.Created, employee);
                response.Headers.Location = new Uri(Request.RequestUri + newid.ToString());
                return response;
            }
            catch (Exception ex)
            {

                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        // PUT: api/Employee/5
        public HttpResponseMessage Put(int id, [FromBody]Employee employee)
        {
            try
            {
                 Employee emp= objEmployeeCrudMethods.updateEmployee(id,employee);
                if (emp==null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, "Employee not found with id: " + id.ToString());
                }
                var response = Request.CreateResponse<Employee>(HttpStatusCode.Created, employee);
                response.Headers.Location = new Uri(Request.RequestUri + employee.ID.ToString());
                return response;
            }
            catch (Exception ex)
            {

                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        // DELETE: api/Employee/5
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                
                    Employee entity = objEmployeeCrudMethods.GetAllEmployees().FirstOrDefault(e => e.ID == id);
                    if (entity == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound,
                            "Employee with Id = " + id.ToString() + " not found to delete");
                    }
                    else
                    {
                     objEmployeeCrudMethods.deleteEmployee(id);
                        return Request.CreateResponse(HttpStatusCode.OK,"Deleted");
                    }
                
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
        
        
      

    }
}
