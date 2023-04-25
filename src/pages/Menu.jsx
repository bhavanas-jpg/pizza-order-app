import React from "react";
import { useRecipe } from "../context/RecipeContext";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const { recipeData, inputValues, setInputValues, addToCart, recipeItems } =
    useRecipe();

  const handleCheckbox = (type) => {
    const isTypeAlreadyPresent = inputValues.checkBox.find(
      (filter) => filter === type
    );
    setInputValues({
      ...inputValues,
      checkBox: isTypeAlreadyPresent
        ? inputValues.checkBox.filter((filter) => filter !== type)
        : [...inputValues.checkBox, type],
    });
  };

  const checkBoxData =
    inputValues.checkBox.length > 0
      ? recipeData.filter((item) =>
          inputValues.checkBox.some((filter) => item[filter])
        )
      : recipeData;

  const searchedData =
    inputValues.searchValue?.length > 0
      ? checkBoxData.filter(
          (item) =>
            item.name
              .toLowerCase()
              .includes(inputValues.searchValue.toLowerCase()) ||
            item.description
              .toLowerCase()
              .includes(inputValues.searchValue.toLowerCase())
        )
      : checkBoxData;

  const filteredData =
    inputValues.radioBoxValue === "lowToHigh"
      ? [...searchedData].sort((a, b) => a.price - b.price)
      : inputValues.radioBoxValue === "highToLow"
      ? [...searchedData].sort((a, b) => b.price - a.price)
      : searchedData;

  const isPresent = (recipe) => recipeItems.find(({ id }) => id === recipe.id);
  const navigate = useNavigate();
  const goToCart = () => navigate("/cart");

  return (
    <>
      <div class="menu-page">
        <div className="menu-container">
          <h3 className="filter-heading">Filters</h3>
          <div className="filter-inputs">
            {/* search-input */}
            <input
              className="search-input"
              type="text"
              placeholder="search recipes"
              onChange={(e) =>
                setInputValues({ ...inputValues, searchValue: e.target.value })
              }
            />
            {/* checkboxes */}
            <div className="category-inputs">
              <label>
                <input
                  type="checkbox"
                  value="is_vegetarian"
                  onChange={(e) => handleCheckbox(e.target.value)}
                />
                Veg
              </label>
              <label>
                <input
                  type="checkbox"
                  value="is_spicy"
                  onChange={(e) => handleCheckbox(e.target.value)}
                />
                Spicy
              </label>
            </div>
            {/* RadioBtns */}
            <div className="sort-inputs">
              <label for="lowToHigh">
                <input
                  type="radio"
                  name="sort"
                  id="lowToHigh"
                  value="lowToHigh"
                  onChange={(e) =>
                    setInputValues({
                      ...inputValues,
                      radioBoxValue: e.target.value,
                    })
                  }
                />
                Low to High
              </label>
              <label for="highToLow">
                <input
                  name="sort"
                  id="highToLow"
                  type="radio"
                  value="highToLow"
                  onChange={(e) =>
                    setInputValues({
                      ...inputValues,
                      radioBoxValue: e.target.value,
                    })
                  }
                />
                High to Low
              </label>
            </div>
          </div>

          <div className="card-container">
            {filteredData.map((recipe) => (
              <div
                className="recipe-card"
                key={recipe.id}
                style={{ position: "relative" }}
              >
                <img src={recipe.image} alt="" className="card-image" />
                <div className="card-text">
                  <h3 className="card-heading"> {recipe.name}</h3>
                  <p className="description"> {recipe.description}</p>
                  <span className="price-tag">$ {recipe.price} </span>
                  <p>Delivery Time : {recipe.delivery_time} mins</p>
                  <button
                    onClick={() =>
                      isPresent(recipe) ? goToCart() : addToCart(recipe)
                    }
                    className={
                      isPresent(recipe) ? "button-89 active" : "button-89"
                    }
                  >
                    {isPresent(recipe) ? "Go To Cart" : "Add To Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
