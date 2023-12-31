import { useEffect, useRef, useState } from 'react'
import useTheme from '../../hooks/useTheme'
// style
import './search.scss'
import { VscFile } from 'react-icons/vsc'
import { MdFolder } from 'react-icons/md'

export default function Search({
  categories,
  setMenuItemSelected,
  setSelectedCategory,
  setSelectedRecipe,
}) {
  const { textPrimary, bgQuaternary, inputBorder } = useTheme()
  const [input, setInput] = useState('')
  const [filtered, setFiltered] = useState([])
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleSearch = (e) => {
    let input = e.target.value
    setInput(input)
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
      {input.length < 3 ? (
        <div className='message'>
          Please enter at least 3 chars...
        </div>
      ) : (
        <div className='message'>Results for: {input}</div>
      )}
      <div className='input-container'>
        <input
          type='text'
          ref={inputRef}
          onChange={handleSearch}
          placeholder='🔍'
          style={{
            backgroundColor: bgQuaternary,
            border: inputBorder,
            color: textPrimary,
          }}
        />
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
                  <div
                    className='filtered-item-left'
                    style={{ color: element.color }}
                  >
                    <MdFolder />
                  </div>
                  <div className='filtered-item-right'>
                    <div className='right-title'>{element.name}</div>
                    <div className='right-subtitle'>
                      Library &gt;&gt; {element.name}
                    </div>
                  </div>
                </>
              )}
              {element.category && (
                <>
                  <div className='filtered-item-left'>
                    <VscFile />
                  </div>
                  <div className='filtered-item-right'>
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

      {input.length > 2 && filtered.length === 0 && (
        <div className='message'>No results found</div>
      )}
    </div>
  )
}
