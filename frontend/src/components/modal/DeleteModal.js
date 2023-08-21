// style
import useTheme from '../../hooks/useTheme'
import './modal.scss'
import { VscChromeClose } from 'react-icons/vsc'

export default function DeleteModal({
  deleteModal,
  setDeleteModal,
  selectedCategory,
  selectedRecipe,
  handleDeleteCategory,
  handleDeleteRecipe,
}) {
  const { bgQuaternary, bgSecondary, textPrimary, bgTertiary, inputBorder } =
    useTheme()

  const handleDelete = () => {
    if (deleteModal.name === 'delete-category') {
      handleDeleteCategory(selectedCategory)
    }

    if (deleteModal.name === 'delete-recipe') {
      handleDeleteRecipe(selectedRecipe)
    }

    setDeleteModal({ ...deleteModal, isOpen: false })
  }

  return (
    <div className='modal-wrapper'>
      <div className='modal' style={{ backgroundColor: bgTertiary }}>
        <div className='modal-header' style={{ color: textPrimary }}>
          <div className='modal-title'>
            <h5>{deleteModal.title}</h5>
          </div>
          <button
            onClick={() => setDeleteModal({ ...deleteModal, isOpen: false })}
          >
            <VscChromeClose style={{ color: textPrimary }} />
          </button>
        </div>

        <div className='modal-body'>
          <div
            className='message'
            style={{
              backgroundColor: bgQuaternary,
              border: inputBorder,
              color: textPrimary,
            }}
          >
            Delete "
            {deleteModal.name === 'delete-category'
              ? selectedCategory
              : selectedRecipe}
            " {deleteModal.name === 'delete-category' ? 'category' : 'recipe'} ?
          </div>
        </div>

        <div className='modal-footer'>
          <button
            onClick={() => setDeleteModal({ ...deleteModal, isOpen: false })}
            style={{
              backgroundColor: bgSecondary,
              color: textPrimary,
              border: inputBorder,
            }}
          >
            Close
          </button>
          <button
            className='text-danger'
            onClick={handleDelete}
            style={{ backgroundColor: '#EB455F' }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
