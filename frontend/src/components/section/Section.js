import { useEffect, useRef, useState } from 'react'
import { VscTrash, VscEdit, VscSave } from 'react-icons/vsc'
import './section.scss'

export default function Section({
  name,
  selected,
  setSelected,
  handleUpdate,
  handleDelete,
  setPreviousName,
  icon,
  color,
}) {
  const [inputText, setInputText] = useState(name)
  const [disabled, setDisabled] = useState(true)
  const [isShown, setIsShown] = useState(false)
  const sectionRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const id = document.addEventListener('click', handleClickOutside, true)

    return () => document.removeEventListener('click', id)
  })

  const handleSelect = (e) => {
    setSelected(e.target.closest('.section').getAttribute('value'))
  }

  const handleClickOutside = (e) => {
    if (!sectionRef.current?.contains(e.target)) {
      setDisabled(true)
    }
  }

  const handleInputTextChange = (e) => {
    setInputText(e.target.value)
    setSelected(e.target.value)
  }

  const handleEdit = () => {
    setDisabled(false)

    setPreviousName(name)
    setTimeout(() => {
      const end = inputRef.current.value.length
      inputRef.current.setSelectionRange(end, end)
      inputRef.current.focus()
      setSelected(inputText)
    }, 0)
  }

  const handleSave = () => {
    setDisabled(true)
    handleUpdate(name, inputText)
    setTimeout(() => {
      setSelected(inputText)
    }, 0)
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

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSave()
    }
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
          onChange={handleInputTextChange}
          disabled={disabled}
          ref={inputRef}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className='section-buttons'>
        {disabled && isShown && (
          <button
            className={inputText === selected ? 'selected' : ''}
            onClick={handleEdit}
          >
            <VscEdit />
          </button>
        )}
        {!disabled && isShown && (
          <button
            className={inputText === selected ? 'selected' : ''}
            onClick={handleSave}
          >
            <VscSave />
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
