import { useEffect, useRef } from 'react'
// style
import './modal.scss'
import { VscChromeClose } from 'react-icons/vsc'
import { folderColors } from '../../data/data'

const capitalizeFirstLetter = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

const randomizeColor = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

export default function Modal({
  modal,
  setModal,
  categories,
  setCategories,
  selectedCategory,
  recipes,
  setRecipes,
  setSelectedCategory,
  setSelectedRecipe,
  historyArray,
  setHistoryArray,
  category,
  setCategory,
}) {
  const inputRef = useRef(null)

  useEffect(() => {
    setModal({ ...modal, input: '' })
    inputRef.current.focus()
  }, [])

  const handleAdd = () => {
    const capitalizedInput = capitalizeFirstLetter(modal.input)

    if (modal.input.length === 0) {
      alert("Input field can't be empty")
      inputRef.current.focus()
      return
    }

    if (inputRef.current.name === 'add-category') {
      const doesCategoryExist = categories.find(
        (category) => category.name === capitalizedInput
      )

      if (doesCategoryExist !== undefined) {
        alert('Category alredy exists')
        inputRef.current.focus()
        return
      } else {
        setCategories([
          ...categories,
          {
            name: capitalizedInput,
            color: randomizeColor(folderColors),
            recipes: [],
          },
        ])
        setSelectedCategory(capitalizedInput)
        setHistoryArray([
          ...historyArray,
          { categoryName: capitalizedInput, recipeName: '' },
        ])
        setModal({ ...modal, isOpen: false })
      }
    }

    if (inputRef.current.name === 'add-recipe') {
      const doesRecipeExist = recipes.find(
        (recipe) => recipe.name === capitalizedInput
      )

      if (doesRecipeExist !== undefined) {
        alert('Recipe alredy exists')
        inputRef.current.focus()
        return
      } else {
        const newCategoriesState = categories.map((obj) => {
          if (obj.name === selectedCategory) {
            return {
              ...obj,
              recipes: [
                ...obj.recipes,
                {
                  name: capitalizedInput,
                  cookingTime: null,
                  difficulty: '',
                },
              ],
            }
          }
          return obj
        })

        const newRecipesState = newCategoriesState.filter(
          (obj) => obj.name === selectedCategory
        )[0].recipes

        const newHistoryArray = historyArray.map((obj) => {
          if (obj.categoryName === selectedCategory) {
            return { ...obj, recipeName: capitalizedInput }
          }

          return obj
        })

        setRecipes(newRecipesState)
        setCategories(newCategoriesState)

        setCategory({
          ...category,
          recipes: newRecipesState,
        })

        setSelectedRecipe(capitalizedInput)
        setHistoryArray(newHistoryArray)
        setModal({ ...modal, isOpen: false })
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleAdd()
    }

    if (e.keyCode === 27) {
      setModal({ ...modal, isOpen: false })
    }
  }

  return (
    <div className='modal-wrapper'>
      <div className='modal'>
        <div className='modal-header'>
          <div className='modal-title'>
            <h5>{modal.title}</h5>
          </div>
          <button onClick={() => setModal({ ...modal, isOpen: false })}>
            <VscChromeClose />
          </button>
        </div>

        <div className='modal-body'>
          <input
            name={modal.name}
            type='text'
            ref={inputRef}
            value={modal.input}
            onChange={(e) => setModal({ ...modal, input: e.target.value })}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className='modal-footer'>
          <button onClick={() => setModal({ ...modal, isOpen: false })}>
            Close
          </button>
          <button onClick={handleAdd}>Add</button>
        </div>
      </div>
    </div>
  )
}
