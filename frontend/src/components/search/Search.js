import { useEffect, useRef, useState } from 'react'
import './search.scss'
import { VscFolder, VscFile } from 'react-icons/vsc'

export default function Search({
  categories,
  setMenuItemSelected,
  setSelectedCategory,
  setSelectedRecipe,
}) {
  const [filtered, setFiltered] = useState([])
  const inputRef = useRef(null)
  const itemRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleSearch = (e) => {
    let input = e.target.value
    setFiltered([])

    if (input.length >= 3) {
      const filteredCategories = categories.filter((obj) =>
        obj.name.toLowerCase().includes(input.toLowerCase())
      )

      const recipes = []
      for (let i = 0; i < categories.length; i++) {
        const el = categories[i]
        const element = categories[i].recipes

        for (let i = 0; i < element?.length; i++) {
          const x = element[i]
          recipes.push({ name: x.name, category: el.name })
        }
      }

      const filteredRecipes = recipes.filter((obj) =>
        obj.name.toLowerCase().includes(input.toLowerCase())
      )

      const filtered = filteredCategories.concat(filteredRecipes)

      setFiltered(filtered)
    }
  }

  const handleClick = (e) => {
    let category = e.target.closest('.filtered-item').getAttribute('category')
    let value = e.target.closest('.filtered-item').getAttribute('value')

    if (category) {
      setMenuItemSelected('Library')
      setSelectedCategory(category)
      setTimeout(() => {
        setSelectedRecipe(value)
      }, 0)
    } else {
      setMenuItemSelected('Library')
      setSelectedCategory(value)
    }
  }

  return (
    <div className='search'>
      <div className='input-container'>
        <input type='text' ref={inputRef} onChange={handleSearch} />
      </div>
      <div className='filtered'>
        {filtered &&
          filtered.map((element) => (
            <div
              className='filtered-item'
              id={element.name}
              key={element.name}
              category={element.category}
              value={element.name}
              onClick={handleClick}
            >
              {!element.category && (
                <>
                  <div className='left'>
                    <VscFolder />
                  </div>
                  <div className='right'>
                    <div className='right-title'>{element.name}</div>
                    <div className='right-subtitle'>
                      Library &gt;&gt; {element.name}
                    </div>
                  </div>
                </>
              )}
              {element.category && (
                <>
                  <div className='left'>
                    <VscFile />
                  </div>
                  <div className='right'>
                    <div className='right-title'>{element.name}</div>
                    <div className='right-subtitle'>
                      {element.category} &gt;&gt; {element.name}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}