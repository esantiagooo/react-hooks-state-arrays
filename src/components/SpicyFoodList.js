import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState('All')

  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    const newFoodArray = [...foods, newFood]
    setFoods(newFoodArray)
    // 1. what is the use of the spread operator? To make a copy of the foods array.
    // 2. Updating state requires a new object/array for setState  
    // 3. React will only re-render the component when we set state with a new value, rather than mutating the original array directly. 

    console.log(newFood);
  }

  function handleLiClick(id){
    const newFoodArray = foods.map((food) => {
      // map will iterate through the array and return a new array
      if (food.id === id){
        return {
          ...food,
          heatLevel: food.heatLevel + 1,
        }
        // if the id of the food were iterating matches the ID of the food were updating, return new food object with its update.
      }else {
        return food
        // otherwise return the original food object.
      }
    })
    setFoods(newFoodArray)
  }
  function handleFilterChange(event){
    setFilterBy(event.target.value)
  }
  const foodsToDisplay = foods.filter((food) => {
    if (filterBy === "All") {
      return true;
    } else {
      return food.cuisine === filterBy;
      // For all elements that return false, dont add them to the new array.
    }
  });

  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id} onClick={()=> handleLiClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  return (
    <div>
      <select name="filter" onChange={handleFilterChange}>
      <option value="All">All</option>
      <option value="American">American</option>
      <option value="Sichuan">Sichuan</option>
      <option value="Thai">Thai</option>
      <option value="Mexican">Mexican</option>
      </select>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;
