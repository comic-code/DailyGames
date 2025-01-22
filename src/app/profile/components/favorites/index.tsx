"use client";
import { useState } from "react";
import { FiEdit, FiX } from "react-icons/fi";

export function FavoriteCard() {
  const [input, setInput] = useState('');
  const [gameName, setGameName] = useState('');
  const [showInput, setShowInput] = useState(false);

  function handleButton() {
    setShowInput(!showInput);

    if(input) {
      setGameName(input);
    }

    setInput('');
  }

  return (
    <div className="w-full bg-gray-900 p-4 h-44 text-white rounded-lg flex justify-between flex-col">
      {showInput 
        ? <div className="flex items-center justify-center gap-3">
            <input 
              type="text" 
              className="bg-gray-800 outline-none rounded-lg p-2" 
              placeholder="Digite o nome do jogo"
              onChange={e => setInput(e.target.value)}
            /> 
            <button onClick={handleButton}>
              <FiX size={24} color="#fff" />
            </button>
          </div>
        : <button className="self-start hover:scale-110 duration-200 transition-all" onClick={handleButton}>
            <FiEdit size={24} color="#fff" />
          </button>
      }

      {gameName 
        ? <div>
            <span className="text-white">Jogo Favorito:</span>
            <p className="font-bold text-white">{gameName}</p>
          </div>
        : <p className="font-bold text-white">Adicionar Jogo</p>
        } 
    </div>
  )
}