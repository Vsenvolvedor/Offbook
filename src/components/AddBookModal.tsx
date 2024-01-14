import React from 'react'

const AddBookModal = () => {
  return (
    <div>
      <div>
        <div>
          <label htmlFor="">Nome:</label>
          <input type="text" name="" id="" />
        </div>
        <div>
          <h2>Arquivo:</h2>
          <span>adfaffa.pdf</span>
          <button>Carregar</button>
        </div>
        <h2>Categorias:</h2>
        <div>
          <ul>
            <li>Categoria <button></button></li>
          </ul>
          <button>Selecionar categoria</button>
          <div>
            <input type="text" name="" id="" placeholder='Criar categoria' />
            <button>+</button>
          </div>
          <button>Remover categoria</button>
        </div>
      </div>
      <div>
        <img src="" alt="" />
        <button>Adicionar thumb</button>
      </div>
      <ul>
        <li></li>
      </ul>
    </div>
  )
}

export default AddBookModal