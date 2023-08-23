import { useRef, useState } from 'react'
import useTheme from '../../hooks/useTheme'
// style
import './section.scss'
import { VscTrash, VscEdit } from 'react-icons/vsc'

export default function Section({
  name,
  selected,
  setSelected,
  icon,
  color,
  recipe,
  setModal,
}) {
  const { textPrimary } = useTheme()
  const [inputText, setInputText] = useState(name)
  const [isShown, setIsShown] = useState(false)
  const sectionRef = useRef(null)
  const inputRef = useRef(null)
  const editIconRef = useRef(null)
  const deleteIconRef = useRef(null)

  const handleSelect = (e) => {
    setSelected(e.target.closest('.section').getAttribute('value'))
  }

  const handleMouseOver = () => {
    setIsShown(true)
  }

  const handleMouseOut = () => {
    setIsShown(false)
  }

  return (
    <div
      className={inputText === selected ? 'section selected' : 'section'}
      ref={sectionRef}
      onClick={handleSelect}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      value={inputText}
    >
      {icon && (
        <div className='section-icon' style={{ color: color }}>
          {icon}
        </div>
      )}
      <div className='section-input'>
        <input
          type='text'
          value={inputText}
          disabled={true}
          ref={inputRef}
          style={{ color: textPrimary }}
        />
      </div>
      <div className='section-buttons'>
        {isShown && (
          <button
            className='edit'
            ref={editIconRef}
            onClick={() =>
              setModal({
                isOpen: true,
                name: editIconRef.current
                  .closest('.left-item')
                  .className.includes('categories')
                  ? 'edit-category'
                  : 'edit-recipe',
                title: editIconRef.current
                  .closest('.left-item')
                  .className.includes('categories')
                  ? 'Edit Category'
                  : 'Edit Recipe',
                input: inputText,
                time: recipe?.time,
                difficulty: recipe?.difficulty,
              })
            }
            style={{ color: textPrimary }}
          >
            <VscEdit />
          </button>
        )}

        {isShown && (
          <button
            className='delete'
            ref={deleteIconRef}
            onClick={() =>
              setModal({
                isOpen: true,
                name: deleteIconRef.current
                  .closest('.left-item')
                  .className.includes('categories')
                  ? 'delete-category'
                  : 'delete-recipe',
                title: deleteIconRef.current
                  .closest('.left-item')
                  .className.includes('categories')
                  ? 'Delete Category'
                  : 'Delete Recipe',
                input: inputText,
                ref: deleteIconRef.current,
              })
            }
            style={{ color: textPrimary }}
          >
            <VscTrash />
          </button>
        )}
      </div>
    </div>
  )
}
