using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extentions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController(StoreContext context) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();
            if (basket == null) return NoContent();

            return basket.toDto();
        
            
        }

        [HttpPost]

        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            // get basket
            var basket = await RetrieveBasket();
            // create basket 
            basket ??= CreateBasket(); // checks if the basket is null
            // get product
            var product = await context.Products.FindAsync(productId);

            if (product == null) return BadRequest("Problem adding item to basket");
            // add item to basket 
            basket.AddItem(product, quantity);
            // save changes 
            var result = await context.SaveChangesAsync() > 0;
            if (result) return CreatedAtAction(nameof(GetBasket), basket.toDto());
            return BadRequest("problem updating basket");
        }



        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            var basket = await RetrieveBasket();
            if ( basket == null) return BadRequest("Problem removing item to basket");

            basket.RemoveItem(productId, quantity);

            var delete = await context.SaveChangesAsync() > 0;

            if(delete) return Ok();
          
            return BadRequest("problem updating basket");
        }

        private async Task<Basket?> RetrieveBasket()
        {
           return await context.Baskets
           .Include(x => x.Items)
           .ThenInclude(x => x.Product)
           .FirstOrDefaultAsync(x => x.BasketId == Request.Cookies["basketId"]);
        }

        private Basket CreateBasket()
        {
            var basketid = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.UtcNow.AddDays(7)
            };
            Response.Cookies.Append("basketId", basketid, cookieOptions);
            var basket = new Basket {BasketId = basketid};

            context.Baskets.Add(basket);
            return basket;
        }
    }
}