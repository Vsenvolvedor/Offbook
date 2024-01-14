import XMarkWhite from '../assets/x-mark-white.svg'
import XMarkBlack from '../assets/x-mark-black.svg'
import SelectionIcon from '../assets/selection-icon.svg'
import MoreIcon from '../assets/more-icon.svg'
import ConfirmIcon from '../assets/confirm-icon.svg'
import TrashIcon from '../assets/trash-icon.svg'
import '../styles/AddBookModal.css'

const AddBookModal = () => {
  return (
    <div className='modal-container'>
      <div>
        <div className='modal-inputs-container'>
          <label htmlFor="name-input">Nome:</label>
          <input type="text" name="name-input" id="name-input" />
        </div>
        <div className='modal-inputs-container'>
          <h2>Arquivo:</h2>
          <span>adfaffasaaaaaaaaa.pdf</span>
          <button className='modal-button'>Carregar</button>
        </div>
        <h2>Categorias:</h2>
        <div className='modal-categ-container'>
          <ul>
            <li className='modal-categ'>Categoria <button><img src={XMarkWhite} alt="" /></button></li>

          </ul>
          <div className='categ-buttons-container'>
            <button className='modal-button' >Selecionar categoria <img src={SelectionIcon} alt="" /></button>
            <div className='modal-button create-categ'>
              <input type="text" name="" id="" placeholder='Criar categoria' />
              <button><img src={MoreIcon} alt="" /></button>
            </div>
            <button className='modal-button'>Remover categoria <img src={SelectionIcon} alt="" /></button>
            </div>
          </div>
      </div>
      <div>
        <img className='modal-image' src="" />
        <button className='modal-button center'>Adicionar thumb</button>
      </div>
      <ul className='modal-menu'>
        <li><img src={XMarkBlack} alt="" /></li>
        <li><img src={ConfirmIcon} alt="" /></li>
        <li><img src={TrashIcon} alt="" /></li>
      </ul>
    </div>
  )
}

export default AddBookModal