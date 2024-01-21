import { useEffect, useState } from 'react'
import '../styles/AddBookModal.css'
import SelectionIcon from '../assets/selection-icon.svg'
import MoreIcon from '../assets/more-icon.svg'
import XMarkWhite from '../assets/x-mark-white.svg'
import { BaseDirectory, writeFile } from '@tauri-apps/api/fs'
import readingCategoriesData, { categorieDataPath } from '../helper/readCategoryData'
interface BookModalCategories {
  selectedCategories: string[]
  setSelectedCategories: (value:string[]) => void
}

const BookModalCategories = ({selectedCategories,setSelectedCategories}:BookModalCategories) => {
  const [categories,setCategories] = useState<Array<string>>([]);
  const [newCategorie, setNewCategorie] = useState<string>('');

  async function createCategorie() {
    if(newCategorie ===  '') return;
    const data = await readingCategoriesData();
    if(data) {
      const parsedData = JSON.parse(data);
      parsedData.push(newCategorie);
      await writeFile(categorieDataPath,JSON.stringify(parsedData),{dir:BaseDirectory.AppData})
      setCategories(parsedData);
      setNewCategorie('');
    } else {
      const newListCategs = [];
      newListCategs.push(newCategorie);
      await writeFile(categorieDataPath,JSON.stringify(newListCategs),{dir:BaseDirectory.AppData})
      setNewCategorie('');
    }
  }

  async function deleteCategorie({target}:any) {
    if(target.value === '') return;
    const data = await readingCategoriesData();
    if(!data) return;
    const parsetData = JSON.parse(data);
    const deletedItemList = parsetData.filter((item:string) => item !== target.value);
    await writeFile(categorieDataPath,JSON.stringify(deletedItemList),{dir:BaseDirectory.AppData})
    setNewCategorie('');
    setCategories(deletedItemList);
  }

  function handleNewCategorie({target}:any){
    setNewCategorie(target.value);
  }

  function selectCategorie({target}:any) {
    if(target.value === '') return;
    setSelectedCategories([...selectedCategories, target.value]);
  }

  function removeCategorie(index:number) {
    const newCategorie = selectedCategories.filter((i,oldIndex) =>  oldIndex !== index);
    setSelectedCategories(newCategorie);
  }

  useEffect(() => {
    readingCategoriesData()
    .then((data) => {
      if(!data) return;
      setCategories(JSON.parse(data));
    })
  }, [])


  return (
    <>
      <h2>Categorias:</h2>
        <div className='modal-categ-container'>
          <ul>
            {
              selectedCategories.map((categ, index) => (
                <li key={index} className='modal-categ'>{categ}<button onClick={() => removeCategorie(index)}><img src={XMarkWhite} alt="" /></button></li>
              ))
            }
          </ul>
          <div className='categ-buttons-container'>
            <select className='modal-button' onChange={selectCategorie} name="select-categ" id="select-categ">
              <option value="" >Selecionar categoria<img src={SelectionIcon} alt="" /></option>
              {
                categories.map((categ,index) => {
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
                categories.map((categ,index) => {
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