import { useState } from "react";
import { useRecipe } from "../context/RecipeContext";

const Cart = () => {
  const {recipeItems, cartPrice, incrementRecipe,
    decrementRecipe,
    removeFromCart } = useRecipe();
  const [applyCoupon, setapplyCoupon] = useState(false);

  const totalDeliveryTime =recipeItems.reduce(
    (acc, curr) => (acc += curr.delivery_time),
    0
  );

  return (
    <>
    <div className="cart-page">
    <div className="menu-container">
      <h2 className="cart-heading">My Cart</h2>
      <div className="cart-text">
      <p>Total delivery time : {totalDeliveryTime}mins</p>
      <p>Total Price : 
        
        $ {applyCoupon ? cartPrice- 5: cartPrice}</p>
      <button className={applyCoupon ?"remove-coupon":"coupon-btn"}
      onClick={() => setapplyCoupon(!applyCoupon)}
      >
       {applyCoupon? "Remove Coupon" : "Apply Coupon"} 
      </button>
      </div>
    
      <div className="cart-recipe-container">
        {recipeItems.map((recipe) => (
          <div className="cart-recipe-card" key={recipe.id}>
            <div className="image-container" >
            <img
              src={recipe.image}
              alt="recipe-img"
              style={{ width: "200px", height: "100%" }}
            />
            </div>
            <div className="cart-recipe-text">
              <div className="recipe-text-container">
              <p>{recipe.name}</p>
            {/* <p>{recipe.description}</p> */}
            <p> ${recipe.price}</p>
            <p>Delivery Time : {recipe.delivery_time} mins</p>
              </div>
          
            <div className="cart-btns">
            <button class="plus-btn" onClick={()=>incrementRecipe(recipe)}>+</button>
            <span>{recipe.count}</span>
            <button class="minus-btn" onClick={()=>decrementRecipe(recipe)}>-</button>
            <i  onClick={()=>removeFromCart(recipe)}class=" fa fa-solid fa-trash"></i>
            </div>
            </div>
           
            
          
          </div>
        ))}
          </div>
      </div>
      </div>
    </>
  );
};
export default Cart;
