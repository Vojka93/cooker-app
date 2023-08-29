import { IoRestaurantOutline, IoStopwatchOutline } from 'react-icons/io5'
import './recipe.scss'
import { useRef, useState } from 'react'
import { VscTrash } from 'react-icons/vsc'
import useTheme from '../../hooks/useTheme'

export default function Recipe({
  recipe,
  recipes,
  category,
  categories,
  setCategories,
}) {
  const { bgQuaternary, textPrimary, inputBorder } = useTheme()
  const [ingredient, setIngredient] = useState('')
  const [instructions, setInstructions] = useState('')
  const [notes, setNotes] = useState('')
  const ingredientInputRef = useRef(null)
  const [editNotes, setEditNotes] = useState(false)
  const [editInstructions, setEditInstructions] = useState(false)

  const handleAddIngredient = () => {
    if (recipe) {
      if (recipe?.ingredients?.length > 15) {
        alert('Maximum number of ingredients is 16')
        setIngredient('')
        ingredientInputRef.current.focus()
        return
      }
    }

    if (!recipe?.ingredients?.includes(ingredient)) {
      const newRecipeState = {
        ...recipe,
        ingredients: [...recipe.ingredients, ingredient],
      }

      const newRecipesState = recipes?.map((obj) => {
        if (obj.name === newRecipeState?.name) {
          return newRecipeState
        } else {
          return obj
        }
      })

      const newCategoryState = { ...category, recipes: newRecipesState }

      const newCategoriesState = categories.map((obj) => {
        if (obj.name === newCategoryState.name) {
          return newCategoryState
        } else {
          return obj
        }
      })

      setCategories(newCategoriesState)
      setIngredient('')
    } else {
      alert('Ingredient alredy present.')
      setIngredient('')
      ingredientInputRef.current.focus()
      return
    }
  }

  const handleDeleteIngredient = (e) => {
    const selected = e.target.closest('div').querySelector('span').innerHTML

    const newRecipeState = {
      ...recipe,
      ingredients: recipe.ingredients.filter((x) => x !== selected),
    }

    const newRecipesState = recipes?.map((obj) => {
      if (obj.name === newRecipeState?.name) {
        return newRecipeState
      } else {
        return obj
      }
    })

    const newCategoryState = { ...category, recipes: newRecipesState }

    const newCategoriesState = categories.map((obj) => {
      if (obj.name === newCategoryState.name) {
        return newCategoryState
      } else {
        return obj
      }
    })

    setCategories(newCategoriesState)
  }

  const handleSaveNotes = () => {
    const newRecipeState = {
      ...recipe,
      notes: notes,
    }

    const newRecipesState = recipes?.map((obj) => {
      if (obj.name === newRecipeState?.name) {
        return newRecipeState
      } else {
        return obj
      }
    })

    const newCategoryState = { ...category, recipes: newRecipesState }

    const newCategoriesState = categories.map((obj) => {
      if (obj.name === newCategoryState.name) {
        return newCategoryState
      } else {
        return obj
      }
    })

    setCategories(newCategoriesState)
    setEditNotes(false)
  }

  const handleEditNotes = () => {
    setNotes(recipe?.notes)
    setEditNotes(!editNotes)
  }

  const handleSaveInstructions = () => {
    const newRecipeState = {
      ...recipe,
      instructions: instructions,
    }

    const newRecipesState = recipes?.map((obj) => {
      if (obj.name === newRecipeState?.name) {
        return newRecipeState
      } else {
        return obj
      }
    })

    const newCategoryState = { ...category, recipes: newRecipesState }

    const newCategoriesState = categories.map((obj) => {
      if (obj.name === newCategoryState.name) {
        return newCategoryState
      } else {
        return obj
      }
    })

    setCategories(newCategoriesState)
    setEditInstructions(false)
  }

  const handleEditInstructions = () => {
    setInstructions(recipe?.instructions)
    setEditInstructions(!editInstructions)
  }

  return (
    <div className='recipe'>
      <div
        className='first-item'
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div className='recipe-name'>{recipe?.name}</div>
        <div className='recipe-body'>
          <div className='recipe-time'>
            <IoStopwatchOutline />
            {recipe?.time} (min)
          </div>
          <div className='recipe-difficulty'>
            <IoRestaurantOutline /> {recipe?.difficulty}
          </div>
        </div>
      </div>

      <div className='recipe-item'>
        <p className='title'>INSTRUCTIONS</p>
        {!editInstructions && <p className='body'>{recipe?.instructions}</p>}
        {editInstructions && (
          <>
            <textarea
              name='instructions'
              id='instructions'
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              style={{
                backgroundColor: bgQuaternary,
                border: inputBorder,
                color: textPrimary,
              }}
            ></textarea>
            <button className='save-btn' onClick={handleSaveInstructions}>
              Save Changes
            </button>
          </>
        )}
        {!editInstructions && (
          <button className='edit-btn' onClick={handleEditInstructions}>
            Edit Instructions
          </button>
        )}
      </div>
      <div className='recipe-item'>
        <p className='title'>INGREDIENTS</p>

        <div className='ingredients'>
          {recipe?.ingredients?.map((x, i) => (
            <div key={i} className='ingredient'>
              <span>{x}</span>
              <button
                style={{ color: textPrimary }}
                onClick={handleDeleteIngredient}
              >
                <VscTrash />
              </button>
            </div>
          ))}
        </div>

        <div className='add-item'>
          <input
            type='text'
            value={ingredient}
            ref={ingredientInputRef}
            onChange={(e) => setIngredient(e.target.value)}
            style={{
              backgroundColor: bgQuaternary,
              border: inputBorder,
              color: textPrimary,
            }}
          />
          <button className='add-btn' onClick={handleAddIngredient}>
            Add Ingredient
          </button>
        </div>
      </div>
      <div className='recipe-item'>
        <p className='title'>NOTES</p>
        {!editNotes && <p className='body'>{recipe?.notes}</p>}
        {editNotes && (
          <>
            <textarea
              name='notes'
              id='notes'
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{
                backgroundColor: bgQuaternary,
                border: inputBorder,
                color: textPrimary,
              }}
            ></textarea>
            <button className='save-btn' onClick={handleSaveNotes}>
              Save Changes
            </button>
          </>
        )}
        {!editNotes && (
          <button className='edit-btn' onClick={handleEditNotes}>
            Edit Notes
          </button>
        )}
      </div>
    </div>
  )
}
