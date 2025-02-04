using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }

        public required string BasketId { get; set; }

        public List<BasketItem> Items { get; set; } = [];

        public void AddItem(Product product, int quantity)
        {
            if (product == null) ArgumentNullException.ThrowIfNull(product);

            if(quantity <= 0) 
            throw new ArgumentException("Product should be 1 or more", nameof(quantity));

            var existingItem  = FindItem(product.Id);

            if (existingItem == null)
            {
                Items.Add(new BasketItem{
                    Product = product,
                    Quantity = quantity
                                        
                });
            }
            else {
                existingItem.Quantity += quantity;
            }
        }

        public void RemoveItem(int productid, int quantity)
        {
            if (quantity <= 0) 
            throw new ArgumentException("Product should be 1 or more", nameof(quantity));

            var item = FindItem(productid);
            if (item == null) return;

            item.Quantity -= quantity;
            if (item.Quantity <= 0) Items.Remove(item);
        }

        private BasketItem? FindItem(int productid)
        {
            return Items.FirstOrDefault(item => item.ProductId == productid) as BasketItem;
        }
    }
}