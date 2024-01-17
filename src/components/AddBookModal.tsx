import XMarkWhite from '../assets/x-mark-white.svg'
import XMarkBlack from '../assets/x-mark-black.svg'
import SelectionIcon from '../assets/selection-icon.svg'
import MoreIcon from '../assets/more-icon.svg'
import ConfirmIcon from '../assets/confirm-icon.svg'
import TrashIcon from '../assets/trash-icon.svg'
import '../styles/AddBookModal.css'
import { useState } from 'react'

const categorias = [
  'asdad',
  'asdasd',
  '657cg jkjnoi'
]

interface AddBookModal {
  setIsModalActive: (value:boolean) => void
}

const AddBookModal = ({setIsModalActive}:AddBookModal) => {
  const [name,setName] = useState<string>('');
  const [categories,setCategories] = useState<Array<string>>(categorias);
  const [newCategorie, setNewCategorie] = useState<string>('');

  function handleName({target}:any) {
    setName(target.value);
  }
  
  function handleNewCategorie({target}:any){
    setNewCategorie(target.value);
  }

  function createCategorie() {
    setCategories(curr => [...curr,newCategorie])
  }

  function selectCategorie({target}:any) {
    if(target.value === '') return;
    setCategories(curr => [...curr, target.value]);
  }

  function removeCategorie(index:number) {
    const newCategorie = categories.filter((i,oldIndex) =>  oldIndex !== index);
    setCategories(newCategorie);
  }

  function deleteCategorie({target}:any) {
    if(target.value === '') return;
    setCategories(categories.filter(categ => categ !== target.value));
  }
  console.log('relaod')
  return (
    <div className='modal-container'>
      <div>
        <div className='modal-inputs-container'>
          <label htmlFor="name-input">Nome:</label>
          <input onChange={handleName} type="text" name="name-input" id="name-input" value={name} />
        </div>
        <div className='modal-inputs-container'>
          <h2>Arquivo:</h2>
          <span></span>
          <button className='modal-button'>Carregar</button>
        </div>
        <h2>Categorias:</h2>
        <div className='modal-categ-container'>
          <ul>
            {
              categories.map((categ, index) => (
                <li key={index} className='modal-categ'>{categ}<button onClick={() => removeCategorie(index)}><img src={XMarkWhite} alt="" /></button></li>
              ))
            }
          </ul>
          <div className='categ-buttons-container'>
            <select className='modal-button' onChange={selectCategorie} name="select-categ" id="select-categ">
              <option value="">Selecionar categoria<img src={SelectionIcon} alt="" /></option>
              {
                categorias.map((categ,index) => {
                  return (
                    <option key={index} value={categ}>{categ}</option>
                  )
                })
              }              
            </select>

            <div className='modal-button create-categ'>
              <input onChange={handleNewCategorie} type="text" name="" id="" placeholder='Criar categoria' value={newCategorie} />
              <button onClick={() => createCategorie()}><img src={MoreIcon} alt="" /></button>
            </div>
            <select onChange={deleteCategorie} className='modal-button' name="" id="">
              <option value="">Remover categoria <img src={SelectionIcon} alt="" /></option>
              {
                categorias.map((categ,index) => {
                  return (
                    <option key={index} value={categ}>{categ}</option>
                  )
                })
              }  
            </select>
            </div>
          </div>
      </div>
      <div>
        <img className='modal-image' src="" />
        <button className='modal-button center'>Adicionar thumb</button>
      </div>
      <ul className='modal-menu'>
        <li onClick={() => setIsModalActive(false)} ><img src={XMarkBlack} alt="" /></li>
        <li><img src={ConfirmIcon} alt="" /></li>
        <li><img src={TrashIcon} alt="" /></li>
      </ul>
    </div>
  )
}

export default AddBookModal