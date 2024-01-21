import { useState } from 'react'
import '../styles/AddBookModal.css'
import SelectionIcon from '../assets/selection-icon.svg'
import MoreIcon from '../assets/more-icon.svg'
import XMarkWhite from '../assets/x-mark-white.svg'

const categorias = [
  'asdad',
  'asdasd',
  '657cg jkjnoi'
]

interface BookModalCategories {
  selectedCategories: string[]
  setSelectedCategories: (value:string[]) => void
}

const BookModalCategories = ({}:BookModalCategories) => {
  const [categories,setCategories] = useState<Array<string>>([]);
  const [newCategorie, setNewCategorie] = useState<string>('');

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

  return (
    <>
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
    </>
  )
}

export default BookModalCategories