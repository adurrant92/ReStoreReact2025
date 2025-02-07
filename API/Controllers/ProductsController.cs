using API.Data;
using API.Entities;
using API.Extentions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class ProductsController(StoreContext context) : BaseApiController
    {
       

        [HttpGet]
         public async Task <ActionResult<List<Product>>> GetProducts(
          [FromQuery]ProductParams productParams)
         {
           var query = context.Products
              .Sort(productParams.OrderBy)
              .Search(productParams.SearchTerm)
              .Filter(productParams.Brands, productParams.Types) // must match order
              .AsQueryable(); // Creating expression tree      

           var products = await PagedList<Product>.ToPagedList(query, 
              productParams.PageNumber, productParams.PageSize); 

              Response.AddPaginationHeader(products.Metadata);      

           return products;
         }

         [HttpGet("{id}")]

         public async Task<ActionResult<Product>> GetProduct(int id)
         {
            var product = await context.Products.FindAsync(id);

            if (product == null) return NotFound();            

            return product;
            
         }

         [HttpGet("filters")]

         public async Task<IActionResult> GetFilters() 
         {
            var brands = await context.Products.Select(x => x.Brand).Distinct().ToListAsync();
            var types = await context.Products.Select(x => x.Type).Distinct().ToListAsync();

            return Ok(new{brands, types});
         }
        
    }
}