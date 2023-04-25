import { createContext, useContext, useState, useEffect } from "react";
import { fetchRecipes } from "../data/fetchRecipes";

export const RecipeContext = createContext(null);

export const RecipeProvider = ({ children }) => {
  const [recipeData, setRecipeData] = useState([]);
  const [recipeItems, setRecipeItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputValues, setInputValues] = useState({
    searchValue: "",
    checkBox:[],
    radioBoxValue: ""
  });

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const {
          status,
          data: { menu }
        } = await fetchRecipes("https://example.com/api/menu");
        if (status === 200) {
          setRecipeData(menu);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    getRecipes();
  }, []);

  const addToCart =(recipeItem)=>{
    const isItemPresent = recipeItems.find((recipe) => recipe.id === recipeItem.id );
    if(!isItemPresent){
      setRecipeItems([...recipeItems, {...recipeItem, count: 1}]);
    }else{
      setRecipeItems(
        recipeItems.map((item)=> item.id === recipeItem.id ? {...item,count: item.count + 1}: item)
      )
    }
  }

  const incrementRecipe = (recipeItem)=>{
    setRecipeItems(recipeItems.map((item)=> item.id === recipeItem.id ? {...item, count: item.count + 1}: item))
  }
  const decrementRecipe = (recipeItem)=>{
    const isPresent = recipeItems.find(item => item.id == recipeItem.id);
    if(isPresent.count > 1){
      setRecipeItems(recipeItems.map(item => item.id === recipeItem.id ? {...item, count: item.count -1}: item
         ))
    }else{
      setRecipeItems(recipeItems.filter(item => item.id !== recipeItem.id))
    }
  }

  const removeFromCart = recipeItem =>{
    setRecipeItems(recipeItems.filter((item)=> item.id !== recipeItem.id))
  }

  const cartRecipes = recipeData.filter((recipe)=>recipe.inCart);
  const cartPrice = recipeItems.reduce((acc,curr)=> acc +=curr.price*curr.count, 0);

  return (
    <RecipeContext.Provider
      value={{
        recipeData,
        recipeItems,
        inputValues,
        setInputValues,
        loading,
        addToCart,
        incrementRecipe,
        decrementRecipe,
        removeFromCart,
        cartRecipes,
        cartPrice
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipe = () => useContext(RecipeContext);
