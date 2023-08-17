import { useRef, useState } from 'react'
import { VscTrash, VscEdit } from 'react-icons/vsc'
import './section.scss'

export default function Section({
  name,
  selected,
  setSelected,
  handleDelete,
  icon,
  color,
  editModal,
  setEditModal,
}) {
  const [inputText, setInputText] = useState(name)
  const [isShown, setIsShown] = useState(false)
  const sectionRef = useRef(null)
  const inputRef = useRef(null)
  const editIconRef = useRef(null)

  const handleSelect = (e) => {
    setSelected(e.target.closest('.section').getAttribute('value'))
  }

  const handleDeleteSection = () => {
    handleDelete(name)
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
        <input type='text' value={inputText} disabled={true} ref={inputRef} />
      </div>
      <div className='section-buttons'>
        {isShown && (
          <button
            className={inputText === selected ? 'selected' : ''}
            ref={editIconRef}
            onClick={() =>
              setEditModal({
                ...editModal,
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
                input: selected,
                ref: editIconRef.current,
              })
            }
          >
            <VscEdit />
          </button>
        )}

        {isShown && (
          <button
            className={inputText === selected ? 'selected' : ''}
            onClick={handleDeleteSection}
          >
            <VscTrash />
          </button>
        )}
      </div>
    </div>
  )
}
