import { IoRestaurantOutline, IoStopwatchOutline } from 'react-icons/io5'
import './recipe.scss'
import { useEffect, useState } from 'react'

export default function Recipe({ recipe, setRecipe }) {
  const [listItem, setListItem] = useState('')

  const handleAddListItem = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, listItem] })
  }

  console.log(recipe?.ingredients)
  return (
    <div className='recipe'>
      <div className='first'>
        <div className='recipe-name'>{recipe?.name}</div>
        <div className='recipe-time'>
          <IoStopwatchOutline />
          {recipe?.time} (min)
        </div>
        <div className='recipe-difficulty'>
          <IoRestaurantOutline /> {recipe?.difficulty}
        </div>
      </div>

      <div>INSTRUCTIONS</div>
      <div>
        <p>INGREDIENTS</p>

        <ul>
          {recipe?.ingredients?.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>
        <br />
        <hr />
        <br />

        <input
          type='text'
          value={listItem}
          onChange={(e) => setListItem(e.target.value)}
        />
        <button onClick={handleAddListItem}>Add li</button>
      </div>
      <div>NOTES</div>
    </div>
  )
}
