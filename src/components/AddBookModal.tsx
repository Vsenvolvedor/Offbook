import XMarkBlack from '../assets/x-mark-black.svg'
import ConfirmIcon from '../assets/confirm-icon.svg'
import TrashIcon from '../assets/trash-icon.svg'
import '../styles/AddBookModal.css'
import { ChangeEvent, useMemo, useRef, useState } from 'react'
import { open } from '@tauri-apps/api/dialog'
import BookModalCategories from './BookModalCategories'

type BookData = {
  id: number
  name: string
  source: string
  thumb: string
  categories: string[] 
  fixed: boolean
}

interface AddBookModal {
  setIsModalActive: (value:boolean) => void
}

const AddBookModal = ({setIsModalActive}:AddBookModal) => {
  const [name,setName] = useState<string>('');
  const [selectedCategories,setSelectedCategories] = useState<Array<string>>([]);
  const [bookPath, setBookPath] = useState<string | null | string[]>('');
  const thumbImageRef = useRef<HTMLImageElement>(null);
  const aliasBookPath = useMemo(() => {
    if(typeof bookPath !== 'string') return null;
    const separatedPath = bookPath?.split(`\\`);
    return separatedPath[separatedPath.length - 1];
  }, [bookPath]); 
  function handleName({target}:any) {
    setName(target.value);
  }

  async function loadBookPath() {
    const filePath= await open({
      multiple: false,
      filters: [{
        name: 'Pdf',
        extensions: ['pdf']
      }]
    })

    setBookPath(filePath);
  }
  
  function handleThumbImage(e:ChangeEvent) {
    const { files } = e.target as HTMLInputElement;
    if(!files) return;
    const fileUrl = URL.createObjectURL(files[0]);
    thumbImageRef.current ? thumbImageRef.current.src = fileUrl : null;
  }

  return (
    <div className='modal-container'>
      <div>
        <div className='modal-inputs-container'>
          <label htmlFor="name-input">Nome:</label>
          <input onChange={handleName} type="text" name="name-input" id="name-input" value={name} />
        </div>
        <div className='modal-inputs-container'>
          <h2>Arquivo:</h2>
          <span>{aliasBookPath}</span>
          <button onClick={loadBookPath} className='modal-button'>Carregar</button>
        </div>
        <BookModalCategories 
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      </div>
      <div>
        <img ref={thumbImageRef} className='modal-image' src="" />
        <label className='modal-button center' htmlFor="thumb-image">Adicionar thumb</label>
        <input onChange={handleThumbImage} type="file" name="" id="thumb-image" accept="image/*" />
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