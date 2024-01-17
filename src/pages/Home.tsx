import React, { useState } from 'react'
import { Header } from '../components/Header'
import Books from '../components/Books'
import AddBookModal from '../components/AddBookModal';

export const Home = () => {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  return (
    <div>
      <Header 
        setIsModalActive={setIsModalActive}
      />
      <Books 
        isModalActive={isModalActive}
      />
      {isModalActive && <AddBookModal setIsModalActive={setIsModalActive} />}
    </div>
  )
}
