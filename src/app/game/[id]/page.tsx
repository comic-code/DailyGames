import { Container } from "@/components/container";
import { GameProps } from "@/utils/types/game";
import Image from "next/image";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Label from "./components/Label";
import { GameCard } from "@/components/GameCard";

interface PropsParams {
  params: {
    id: string
  }
}

export async function generateMetaData({ params } : PropsParams) : Promise<Metadata> {
  try {
    const response : GameProps = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${params.id}`, { next: { revalidate: 6000 } })
      .then(res => res.json())
      .catch(err => {
        return {
          title: 'DailyGames'
        }
      });
      console.log('teste')
    return {
      title: response.title,
      description: `${response.description.slice(0, 100)}...`,
      openGraph: {
        title: response.title,
        images: [response.image_url],
      }
    }

  } catch (e) {
    return {
      title: 'DailyGames'
    }
  }
}

async function getData(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`, { next: { revalidate: 6000 } });
    return res.json();
  } catch (e) {
    throw new Error('Failed to get game details!');
  }
}

async function getGameSorted() {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`, { cache: 'no-store' });
    return res.json();
  } catch (e) {
    throw new Error('Failed to get games sorted by release date!');
  }
}
export default async function GameDetail({ params: { id } } : {params: { id: string}}) {
  const gameData: GameProps = await getData(id);
  const sortedGame: GameProps = await getGameSorted();

  if(!gameData) {
    redirect('/');
  }

  return (
    <main className="w-full text-black">
      <div className="bg-black h-80 sm:h-96 w-full relative">
        <Image 
          className="object-cover w-full h-80 sm:h-96 opacity-80"
          src={gameData.image_url} alt={gameData.title} priority={true} fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
        />
      </div>
      <Container>
        <h1 className="font-bold text-xl my-4">{gameData.title}</h1>
        <p>{gameData.description}</p>

        <h2 className="font-bold text-lg mt-7 mb-2">Categorias:</h2>
        <div className="flex gap-2 flex-wrap">
          {gameData.categories.map(item => (
            <Label key={item} name={item} />
          ))}
        </div>

        <h2 className="font-bold text-lg mt-7 mb-2">Plataformas:</h2>
        <div className="flex gap-2 flex-wrap">
          {gameData.platforms.map(item => (
            <Label key={item} name={item} />
          ))}
        </div>

        <p className="mt-7 mb-2"><strong>Data de lançamento:</strong> {gameData.release}</p>

        <h2 className="font-bold text-lg mt-7 mb-2">Jogo recomendado:</h2>
        <div>
          <div>
             <GameCard game={sortedGame} />
          </div>
        </div>
      </Container>
    </main>
  )
}