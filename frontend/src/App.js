import Section from './components/section/Section'
import { data } from './data/data'
import { useEffect, useState } from 'react'

function App() {
  const [categories, setCategories] = useState(data)
  const [category, setCategory] = useState({})
  const [recipes, setRecipes] = useState(categories[0]?.recipes)
  const [recipe, setRecipe] = useState({})
  // selected category state
  const [selectedCategory, setSelectedCategory] = useState('Meat')
  const [selectedRecipe, setSelectedRecipe] = useState('Steak')

  useEffect(() => {
    setSelectedCategory((prev) => prev)
    setSelectedRecipe(categories[0].recipes[0].name)
  }, [categories])

  useEffect(() => {
    setRecipes(category?.recipes)
  }, [category])

  useEffect(() => {
    const category = categories.filter(
      (category) => category.name === selectedCategory
    )

    setCategory(category[0])
    setSelectedRecipe(category[0]?.recipes[0].name)
  }, [selectedCategory])

  useEffect(() => {
    const newRecipe = recipes?.filter(
      (recipe) => recipe.name === selectedRecipe
    )

    setRecipe(newRecipe)
  }, [selectedRecipe])

  useEffect(() => {
    if (recipes) {
      setRecipe(recipes[0])
    }
  }, [recipes])

  const handleUpdateCategory = (currentName, newName) => {
    const newState = categories.map((obj) => {
      if (obj.name === currentName) {
        return { ...obj, name: newName }
      }

      return obj
    })

    setCategories(newState)
  }

  const handleUpdateRecipe = (currentName, newName) => {
    const newRecipes = category.recipes.map((obj) => {
      if (obj.name === currentName) {
        return { ...obj, name: newName }
      }

      return obj
    })

    const newState = categories.map((obj) => {
      if (obj.name === selectedCategory) {
        return { ...obj, recipes: newRecipes }
      }

      return obj
    })

    setCategories(newState)
  }

  const handleDeleteCategory = (name) => {
    const newState = categories.filter((obj) => obj.name !== name)

    setCategories(newState)
  }

  const handleDeleteRecipe = (name) => {
    const newState = categories.map((obj) => {
      if (obj.name === selectedCategory) {
        return { ...obj, recipes: recipes.filter((obj) => obj.name !== name) }
      }

      return obj
    })

    setCategories(newState)
    setRecipes(recipes.filter((obj) => obj.name !== name))
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
              />
            ))}
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
              />
            ))}
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
      </div>
    </div>
  )
}

export default App
