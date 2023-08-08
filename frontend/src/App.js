import CreateSection from './components/create_section/CreateSection'
import Modal from './components/modal/Modal'
import Section from './components/section/Section'
import { data } from './data/data'
import { useEffect, useState } from 'react'
import { VscNewFolder, VscNewFile } from 'react-icons/vsc'

const createHistoryArray = (arr) => {
  let history = []
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i]

    history[i] = {
      categoryName: element.name,
      recipeName: element.recipes[0].name,
    }
  }

  return history
}

function App() {
  const [categories, setCategories] = useState(data)
  const [category, setCategory] = useState({})
  const [recipes, setRecipes] = useState(categories[0]?.recipes)
  const [recipe, setRecipe] = useState({})

  // category name before edit
  const [previousCategoryName, setPreviousCategoryName] = useState('')
  const [previousRecipeName, setPreviousRecipeName] = useState('')

  // selected category state
  const [selectedCategory, setSelectedCategory] = useState('Meat')
  const [selectedRecipe, setSelectedRecipe] = useState('Steak')

  // remmember category last recipe selected
  const [historyArray, setHistoryArray] = useState(() =>
    createHistoryArray(data)
  )

  useEffect(() => {
    const newRecipeState = category?.recipes?.filter(
      (recipe) => recipe.name === selectedRecipe
    )

    setRecipe(newRecipeState)
  }, [recipes])

  useEffect(() => {
    setRecipes(category?.recipes)
  }, [category])

  useEffect(() => {
    const newCategoryState = categories.filter(
      (category) => category.name === selectedCategory
    )[0]

    const lastRecipeName = historyArray?.filter(
      (obj) => obj.categoryName === selectedCategory
    )[0]?.recipeName

    setCategory(newCategoryState)

    setSelectedRecipe(lastRecipeName)
  }, [selectedCategory])

  useEffect(() => {
    const newRecipeState = recipes?.filter(
      (recipe) => recipe.name === selectedRecipe
    )

    const newHistoryState = historyArray.map((obj) => {
      if (obj.categoryName === selectedCategory) {
        return { ...obj, recipeName: selectedRecipe }
      }

      return obj
    })

    setRecipe(newRecipeState)
    setHistoryArray(newHistoryState)
  }, [selectedRecipe])

  const handleUpdateCategory = (currentName, newName) => {
    const newCategoriesState = categories.map((obj) => {
      if (obj.name === currentName) {
        return { ...obj, name: newName }
      }

      return obj
    })

    const newHistoryState = historyArray.map((obj) => {
      if (obj.categoryName === previousCategoryName) {
        return { ...obj, categoryName: selectedCategory }
      }

      return obj
    })

    setCategories(newCategoriesState)
    setHistoryArray(newHistoryState)
  }

  const handleUpdateRecipe = (currentName, newName) => {
    const newRecipesState = category.recipes.map((obj) => {
      if (obj.name === currentName) {
        return { ...obj, name: newName }
      }

      return obj
    })

    const newCategoriesState = categories.map((obj) => {
      if (obj.name === selectedCategory) {
        return { ...obj, recipes: newRecipesState }
      }

      return obj
    })

    setRecipes(newRecipesState)
    setCategories(newCategoriesState)
  }

  const handleDeleteCategory = (name) => {
    const newCategoriesState = categories.filter((obj) => obj.name !== name)
    const newLastSelectedState = historyArray.filter(
      (obj) => obj.categoryName !== selectedCategory
    )

    setCategories(newCategoriesState)
    setHistoryArray(newLastSelectedState)
  }

  const handleDeleteRecipe = (name) => {
    const newCategoriesState = categories.map((obj) => {
      if (obj.name === selectedCategory) {
        return { ...obj, recipes: recipes.filter((obj) => obj.name !== name) }
      }

      return obj
    })

    const newRecipesState = recipes.filter((obj) => obj.name !== name)

    setCategories(newCategoriesState)
    setRecipes(newRecipesState)
  }

  return (
    <div className='app'>
      <div className='wrapper'>
        <div className='left'>
          <div className='left-item menu'>menu</div>
          <div className='left-item categories'>
            {categories.map((category) => (
              <Section
                key={category.name}
                name={category.name}
                selected={selectedCategory}
                setSelected={setSelectedCategory}
                handleUpdate={handleUpdateCategory}
                handleDelete={handleDeleteCategory}
                setPreviousName={setPreviousCategoryName}
              />
            ))}

            <CreateSection icon={<VscNewFolder />} />
          </div>
          <div className='left-item recipes'>
            {recipes?.map((recipe) => (
              <Section
                key={recipe.name}
                name={recipe.name}
                selected={selectedRecipe}
                setSelected={setSelectedRecipe}
                handleUpdate={handleUpdateRecipe}
                handleDelete={handleDeleteRecipe}
                setPreviousName={setPreviousRecipeName}
              />
            ))}

            <CreateSection icon={<VscNewFile />} />
          </div>
        </div>
        <div className='right' style={{ display: 'flex' }}>
          <div>
            <strong>categories</strong>
            <pre>{JSON.stringify(categories, null, 2)}</pre>
          </div>
          <div>
            <strong>category</strong>
            <pre>{JSON.stringify(category, null, 2)}</pre>
          </div>
          <div>
            <strong>recipes</strong>
            <pre>{JSON.stringify(recipes, null, 2)}</pre>
          </div>
          <div>
            <strong>recipe</strong>
            <pre>{JSON.stringify(recipe, null, 2)}</pre>
          </div>
        </div>
        <Modal />
      </div>
    </div>
  )
}

export default App
