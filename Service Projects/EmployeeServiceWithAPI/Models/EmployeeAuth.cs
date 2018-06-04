using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using EmployeeServiceWithAPI.Models.Security;
namespace EmployeeServiceWithAPI.Models
{

    public class BasicAuthenticationAttribute : AuthorizationFilterAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            RegisterUsers objRegisterUsers = new RegisterUsers();
            if (actionContext.Request.Headers.Authorization == null || actionContext.Request.Headers.Authorization.Parameter == "null")
            {
                actionContext.Response = actionContext.Request
                    .CreateResponse(HttpStatusCode.Unauthorized, "you Are Unauthorized ");
            }
            else
            {

                string authenticationToken = actionContext.Request.Headers
                                            .Authorization.Parameter;
                EncryptandDecrypt obj = new EncryptandDecrypt();
                string user_token = obj.Decrypt(authenticationToken);

                //if (objRegisterUsers.Login(user))
                //{
                Thread.CurrentPrincipal = new GenericPrincipal(
                    new GenericIdentity(user_token), null);
                //}
                //else
                //{
                //    actionContext.Response = actionContext.Request
                //        .CreateResponse(HttpStatusCode.Unauthorized);
                //}
            }
        }
    }

}