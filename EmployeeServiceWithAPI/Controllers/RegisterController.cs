using EmployeeServiceWithAPI.Models;
using EmployeeServiceWithAPI.Models.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Threading;
using System.Web.Http;
using System.Web.Http.Cors;

namespace EmployeeServiceWithAPI.Controllers
{
    [EnableCorsAttribute("*", "*", "*")]
    
    public class RegisterController : ApiController
    {
        RegisterUsers register = new RegisterUsers();
        // GET: api/Register
        public IEnumerable<User> Get()
        {
            return register.GetUsers();
        }

        // GET: api/Register/5
        [HttpPost]
        [Route("api/Register/Login")]
        public HttpResponseMessage Login(User user)
        {
            try
            {
                if (register.Login(user))
                {
                    EncryptandDecrypt objencrypt = new EncryptandDecrypt();

                    Thread.CurrentPrincipal = new GenericPrincipal(
                        new GenericIdentity(user.UserName), null);

                    user.user_token = objencrypt.encrypt(user.UserName);

                    var response = Request.CreateResponse<User>(HttpStatusCode.OK, user);
              
                    return response;
          
                }
                return Request.CreateResponse(HttpStatusCode.Unauthorized);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        // POST: api/Register
        public HttpResponseMessage Register([FromBody] User user)
        {
            try
            {
               
                int newid = register.RegisterUser(user);
                var response = Request.CreateResponse<User>(HttpStatusCode.Created, user);
                response.Headers.Location = new Uri(Request.RequestUri + newid.ToString());
                return response;
            }
            catch (Exception ex)
            {

                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        // PUT: api/Register/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Register/5
        public void Delete(int id)
        {
        }
    }
}
