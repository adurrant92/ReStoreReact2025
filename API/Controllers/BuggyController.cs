using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        [HttpGet("not-found")]   
        public IActionResult GetNotFound()
        {
            return NotFound();
        }

        [HttpGet("bad-request")]   
        public IActionResult GetBadRequest()
        {
            return BadRequest("this is not a good request");
        }

        [HttpGet("unauthorized")]   
        public IActionResult GetUnauthorized()
        {
            return Unauthorized();
        }

        [HttpGet("validation-error")]   
        public IActionResult GetValidationError()
        {
            ModelState.AddModelError("Problem1", "this is the first error");
            ModelState.AddModelError("Problem2", "this is the second error");
            return ValidationProblem();
        }

        [HttpGet("server-error")]   
        public IActionResult GetServerError()
        {
            throw new Exception("This is a server error");
        }
        

    }
}