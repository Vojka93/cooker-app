import { useEffect, useRef, useState } from 'react'
import { folderColors } from '../../data/data'
import useTheme from '../../hooks/useTheme'
// style
import './modal.scss'
import { MdFolder } from 'react-icons/md'
import { VscChromeClose } from 'react-icons/vsc'

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
  handleUpdateCategory,
  handleUpdateRecipe,
  selectedRecipe,
  handleDeleteCategory,
  handleDeleteRecipe,
}) {
  const [inputText, setInputText] = useState(
    modal.name === 'edit-category' ? selectedCategory : selectedRecipe
  )
  const [folderColor, setFolderColor] = useState('')
  const { bgQuaternary, textPrimary, inputBorder, bgTertiary, bgSecondary } =
    useTheme()
  const inputRef = useRef(null)

  useEffect(() => {
    setFolderColor(category?.color)

    if (inputRef.current) inputRef.current.focus()
  }, [category?.color])

  const handleChange = (e) => {
    setModal({ ...modal, input: e.target.value })
    setInputText(e.target.value)
  }

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

  const handleEdit = () => {
    if (modal.name === 'edit-category') {
      handleUpdateCategory(
        selectedCategory,
        inputText,
        category.color,
        folderColor
      )

      setTimeout(() => {
        setSelectedCategory(inputText)
        setSelectedRecipe(selectedRecipe)
      }, 0)
    }

    if (modal.name === 'edit-recipe') {
      handleUpdateRecipe(selectedRecipe, modal.input)

      setTimeout(() => {
        setSelectedRecipe(modal.input)
      }, 100)
    }

    setModal({ ...modal, isOpen: false })
  }

  const handleDelete = () => {
    if (modal.name === 'delete-category') {
      handleDeleteCategory(selectedCategory)
    }

    if (modal.name === 'delete-recipe') {
      handleDeleteRecipe(selectedRecipe)
    }

    setModal({ ...modal, isOpen: false })
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && modal.name.includes('add')) {
      handleAdd()
    }

    if (e.keyCode === 13 && modal.name.includes('edit')) {
      handleEdit()
    }
  }

  return (
    <div className='modal-wrapper'>
      <div className='modal' style={{ backgroundColor: bgTertiary }}>
        <div className='modal-header' style={{ color: textPrimary }}>
          <div className='modal-title'>
            <p>{modal.title}</p>
          </div>
          <button onClick={() => setModal({ ...modal, isOpen: false })}>
            <VscChromeClose style={{ color: textPrimary }} />
          </button>
        </div>

        <div className='modal-body'>
          {(modal.name.includes('add') || modal.name.includes('edit')) && (
            <input
              name={modal.name}
              type='text'
              ref={inputRef}
              value={modal.input}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              style={{
                backgroundColor: bgQuaternary,
                border: inputBorder,
                color: textPrimary,
              }}
            />
          )}

          {modal.name.includes('delete') && (
            <div
              className='message'
              style={{
                backgroundColor: bgQuaternary,
                border: inputBorder,
                color: textPrimary,
              }}
            >
              Delete "
              {modal.name === 'delete-category'
                ? selectedCategory
                : selectedRecipe}
              " {modal.name === 'delete-category' ? 'Category' : 'Recipe'} ?
            </div>
          )}

          {modal.name === 'edit-category' && (
            <div className='select-color'>
              <div className='icon' style={{ color: folderColor }}>
                <MdFolder />
              </div>
              <div className='colors'>
                {folderColors.map((color) => (
                  <div
                    key={color}
                    className='color'
                    style={{ backgroundColor: color }}
                    value={color}
                    onClick={(e) =>
                      setFolderColor(e.target.getAttribute('value'))
                    }
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className='modal-footer'>
          <button
            onClick={() => setModal({ ...modal, isOpen: false })}
            style={{
              backgroundColor: bgSecondary,
              color: textPrimary,
              border: inputBorder,
            }}
          >
            Close
          </button>
          {modal.name.includes('add') && (
            <button onClick={handleAdd} style={{ backgroundColor: '#22A699' }}>
              Add
            </button>
          )}

          {modal.name.includes('edit') && (
            <button onClick={handleEdit} style={{ backgroundColor: '#F2BE22' }}>
              Edit
            </button>
          )}

          {modal.name.includes('delete') && (
            <button
              onClick={handleDelete}
              style={{ backgroundColor: '#EB455F' }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
