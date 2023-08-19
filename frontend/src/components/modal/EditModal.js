import { useEffect, useRef, useState } from 'react'
// style
import './modal.scss'
import { VscChromeClose, VscFolder } from 'react-icons/vsc'

import { folderColors } from '../../data/data'
import useTheme from '../../hooks/useTheme'

export default function EditModal({
  editModal,
  setEditModal,
  selectedCategory,
  handleUpdateCategory,
  selectedRecipe,
  handleUpdateRecipe,
  setSelectedCategory,
  setSelectedRecipe,
  category,
}) {
  const { bgQuaternary } = useTheme()

  const [inputText, setInputText] = useState(
    editModal.name === 'edit-category' ? selectedCategory : selectedRecipe
  )
  const [folderColor, setFolderColor] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
    setFolderColor(category?.color)
  }, [category?.color])

  const handleEdit = () => {
    if (editModal.name === 'edit-category') {
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

    if (editModal.name === 'edit-recipe') {
      handleUpdateRecipe(selectedRecipe, editModal.input)

      setTimeout(() => {
        setSelectedRecipe(editModal.input)
      }, 100)
    }

    setEditModal({ ...editModal, isOpen: false })
  }

  const handleChange = (e) => {
    setEditModal({ ...editModal, input: e.target.value })
    setInputText(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleEdit()
    }
  }

  return (
    <div className='modal-wrapper'>
      <div className='modal'>
        <div className='modal-header'>
          <div className='modal-title'>
            <h5>{editModal.title}</h5>
          </div>
          <button onClick={() => setEditModal({ ...editModal, isOpen: false })}>
            <VscChromeClose />
          </button>
        </div>

        <div className='modal-body'>
          <input
            type='text'
            ref={inputRef}
            value={inputText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            style={{ backgroundColor: bgQuaternary }}
          />

          {editModal.name === 'edit-category' && (
            <div className='select-color'>
              <div className='icon' style={{ color: folderColor }}>
                <VscFolder />
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
          <button onClick={() => setEditModal({ ...editModal, isOpen: false })}>
            Close
          </button>
          <button onClick={handleEdit}>Save</button>
        </div>
      </div>
    </div>
  )
}
