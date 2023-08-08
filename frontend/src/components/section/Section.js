import { useEffect, useRef, useState } from 'react'
import { VscTrash } from 'react-icons/vsc'
import './Section.scss'

export default function Section({
  name,
  selected,
  setSelected,
  handleUpdate,
  handleDelete,
}) {
  const [inputText, setInputText] = useState(name)
  const [disabled, setDisabled] = useState(true)
  const sectionRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const id = document.addEventListener('click', handleClickOutside, true)

    return () => document.removeEventListener('click', id)
  })

  const handleSelect = (e) => {
    setSelected(e.target.value)
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

    setTimeout(() => {
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

  return (
    <div className='section' ref={sectionRef} onClick={handleSelect}>
      <div className='section-input'>
        <input
          className={inputText === selected ? 'selected' : ''}
          type='text'
          value={inputText}
          onChange={handleInputTextChange}
          disabled={disabled}
          ref={inputRef}
        />
      </div>
      {disabled && <button onClick={handleEdit}>edit</button>}
      {!disabled && <button onClick={handleSave}>save</button>}
      <button onClick={handleDeleteSection}>
        <VscTrash />
      </button>
    </div>
  )
}
