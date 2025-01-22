"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FiSearch } from "react-icons/fi";

export function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  function handleSearch(event: FormEvent) {
    event.preventDefault();
    if(searchTerm) {
      router.push(`/game/search/${searchTerm}`);
    } 
  }

  return (
    <form onSubmit={handleSearch} className="w-full bg-slate-200 my-5 flex gap-2 items-center justify-between rounded-lg p-2">
      <input 
        type="text"
        className="bg-slate-200 outline-none w-11/12"
        placeholder="Procurando algum jogo?"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button type="submit">
        <FiSearch size={24} color="#ea580c"/>
      </button>
    </form>
  )
}