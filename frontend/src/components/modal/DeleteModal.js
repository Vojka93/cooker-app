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
  const { bgQuaternary } = useTheme()

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
      <div className='modal'>
        <div className='modal-header'>
          <div className='modal-title'>
            <h5>{deleteModal.title}</h5>
          </div>
          <button
            onClick={() => setDeleteModal({ ...deleteModal, isOpen: false })}
          >
            <VscChromeClose />
          </button>
        </div>

        <div className='modal-body'>
          <div className='message' style={{ backgroundColor: bgQuaternary }}>
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
