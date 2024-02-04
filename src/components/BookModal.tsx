import XMarkBlack from '../assets/x-mark-black.svg'
import ConfirmIcon from '../assets/confirm-icon.svg'
import TrashIcon from '../assets/trash-icon.svg'
import PasteIcon from '../assets/paste-icon.svg'
import '../styles/BookModal.css'
import { ChangeEvent, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { open } from '@tauri-apps/api/dialog'
import BookModalCategories from './BookModalCategories'
import readingBookData, { bookDataPath } from '../helper/readBookData'
import {createArquiveByBinary, createArquives} from '../helper/createArquives'
import { BaseDirectory, writeFile } from '@tauri-apps/api/fs'
import { AppDataContext, BookData } from '../pages/Home'
import loadingImage from '../helper/loadingImage'
import { readImageBinary } from 'tauri-plugin-clipboard-api'
interface AddBookModal {
  setIsModalActive: (value:boolean) => void
  bookDataForEdit?: BookData
}

const AddBookModal = ({setIsModalActive, bookDataForEdit}:AddBookModal) => {
  const {setBooks, setOriginalBooksData} = useContext(AppDataContext);
  const [name,setName] = useState<string>('');
  const [selectedCategories,setSelectedCategories] = useState<Array<string>>([]);
  const [bookPath, setBookPath] = useState<string | null | string[]>('');
  const [imageBinaryData, setImageBinaryData] = useState<FileReader | null>(null);
  const thumbImageRef = useRef<HTMLImageElement>(null);
  const aliasBookPath = useMemo(() => {
    if(typeof bookPath !== 'string') return null;
    const separatedPath = bookPath?.split(`\\`);
    return separatedPath[separatedPath.length - 1];
  }, [bookPath]); 
  function handleName({target}:any) {
    if(bookDataForEdit) return;
    setName(target.value);
  }

  useEffect(() => {
    if(bookDataForEdit) {
      setName(bookDataForEdit.name);
      setSelectedCategories(bookDataForEdit.categories);
      setBookPath(bookDataForEdit.source);
      loadingImage(bookDataForEdit).then(({imageUrl,imageBlob}) => {
        if(!thumbImageRef.current) return;
        thumbImageRef.current.src = imageUrl;
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(imageBlob);
        setImageBinaryData(fileReader);
      });
    }

  },[])

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
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(files[0])
    setImageBinaryData(fileReader);
    thumbImageRef.current ? thumbImageRef.current.src = fileUrl : null;
  }

  async function createBook() {
    if(name ==  '') return;
    if(typeof bookPath !== 'string' || bookPath === '') return;
    if(!thumbImageRef.current) return;
    if(!imageBinaryData) return;
    const data = await readingBookData();
    if(bookDataForEdit && data) {
      const parsedData = JSON.parse(data)
      const newData = parsedData.map((book:BookData) => {
        if(book.id !== bookDataForEdit.id) return book;
        book.categories = selectedCategories;
        return book;
      })
      await writeFile(bookDataPath, JSON.stringify(newData),{dir:BaseDirectory.AppData});
      setBooks(newData);
      setOriginalBooksData(newData);
      setIsModalActive(false);
      return null;
    };
    const source = await createArquives(name, bookPath);
    const thumb = await createArquiveByBinary(name, imageBinaryData, 'jpg')
    const book:BookData = {
      id: Math.round(Math.random() * 10000),
      name,
      categories: selectedCategories,
      source,
      thumb,
      fixed: false,
    } 
    if(data) {
      const newData = JSON.parse(data);
      newData.push(book);
      await writeFile(bookDataPath, JSON.stringify(newData),{dir:BaseDirectory.AppData});
      setBooks(newData);
      setOriginalBooksData(newData);
    } else {
      await writeFile(bookDataPath, JSON.stringify([book]),{dir:BaseDirectory.AppData});
      setBooks([book]);
      setOriginalBooksData([book]);
    }
    setIsModalActive(false);
  }
  
  async function deleteBook() {
    const data = await readingBookData();
    if(!bookDataForEdit || !data) return;
    const parsedData = JSON.parse(data)
    const newData = parsedData.filter((book:BookData) => {
      if(book.id === bookDataForEdit.id) return false;
      return true;
    })
    await writeFile(bookDataPath, JSON.stringify(newData),{dir:BaseDirectory.AppData});
    setBooks(newData);
    setOriginalBooksData(newData);
    setIsModalActive(false);
  };  

  async function pasteBookImage() {
    try{
      const imageBlob = await readImageBinary('Blob');
      if(!(imageBlob instanceof Blob)) return;
      const imageUrl = URL.createObjectURL(imageBlob);
      if(!thumbImageRef.current) return;
      thumbImageRef.current.src = imageUrl;
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(imageBlob);
      setImageBinaryData(fileReader);
    } catch(err) {
      console.log(err)
    }
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
          {!bookDataForEdit && <button onClick={loadBookPath} className='modal-button'>Carregar</button>}
        </div>
        <BookModalCategories 
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      </div>
      <div>
        <img ref={thumbImageRef} className='modal-image' src="" />
        {!bookDataForEdit && <label className='modal-button center' htmlFor="thumb-image">Adicionar thumb</label>}
        <input onChange={handleThumbImage} type="file" name="" id="thumb-image" accept="image/*" />
      </div>
      <ul className='modal-menu'>
        <li onClick={() => setIsModalActive(false)} ><img src={XMarkBlack} alt="" /></li>
        <li onClick={() => createBook()}><img src={ConfirmIcon} alt="" /></li>
        {!bookDataForEdit && <li onClick={() => pasteBookImage()}><img src={PasteIcon} alt="" /></li>}
        {bookDataForEdit && <li onClick={() => deleteBook()}><img src={TrashIcon} alt="" /></li>}
      </ul>
    </div>
  )
}


export default AddBookModal