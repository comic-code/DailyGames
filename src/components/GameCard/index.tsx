import { GameProps } from '@/utils/types/game';
import Image from 'next/image';
import Link from 'next/link';
import { BiRightArrowCircle } from 'react-icons/bi';

interface GameCardProps {
  game: GameProps
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/game/${game.id}`}>
      <section className='w-full bg-slate-200 rounded-lg p-4 mb-5'>
        <div className='relative w-full h-56'>
          <Image 
            className='rounded-lg object-cover h56 hover:scale-105 transition-all duration-300'
            src={game.image_url} alt={game.title} 
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 44vw' fill={true} quality={100}
          />
        </div>
        <div className='flex items-center mt-4 justify-between'>
          <p className='text-sm font-bold px-2 text-black text-ellipsis truncate whitespace-nowrap overflow-hidden'>{game.title}</p>
          <BiRightArrowCircle size={24} color='#000' />
        </div>
      </section>
    </Link>
  )
}