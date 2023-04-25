import {NavLink} from "react-router-dom"
import { useRecipe } from "../context/RecipeContext";

const Header =()=>{
const { recipeItems } = useRecipe();

return(
<div >
    <nav className="navbar-container" >
        <div> 
            <NavLink exact to="/"><img className="logo-image" src="https://img.freepik.com/premium-vector/hand-drawn-pizza_215696-131.jpg"/></NavLink>
         </div>
       <div>
        <ul className="nav-menu">
            <li className="nav-item">
            <NavLink className="nav-links" activeClassName="active" exact to="/">Home</NavLink>
            </li>
            <li className="nav-item"><NavLink className="nav-links" activeClassName="active" exact to="/menu">Menu</NavLink></li>
            <li className="nav-item"><NavLink className="nav-links" activeClassName="active" exact to="/cart"><i class="fa fa-shopping-cart" aria-hidden="true"><span className="cart-length">{recipeItems.length}</span></i>
          
            </NavLink></li>
        </ul>
        </div>       
    </nav>
</div>
)

}
export default Header;