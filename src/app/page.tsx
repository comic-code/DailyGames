import { Container } from "@/components/container";
import { GameCard } from "@/components/GameCard";
import { SearchInput } from "@/components/SearchInput";
import { GameProps } from "@/utils/types/game";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRightSquare } from "react-icons/bs";

async function getDailyGame() {
  try {
    const response = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`, { next: { revalidate: 320 }});
    return response.json();
  } catch (err) {
    throw new Error('Failed to get daily game!');
  }
}

async function getGamesData() {
  try {
    const response = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=games`, { next: { revalidate: 320 }});
    return response.json();
  } catch (err) {
    throw new Error('Failed to get daily game!');
  }
}

export default async function Home() {
  const dailyGame: GameProps = await getDailyGame();
  const gamesData: GameProps[] = await getGamesData();
  // https://sujeitoprogramador.com/next-api/?api=game_day
  return (
    <main className="w-full">
      <Container>
        <h1 className="text-center font-bold text-xl mt-8 mb-5">Separamos um jogo exclusivo para você</h1>
        <Link href={`/game/${dailyGame.id}`}>
          <section className="w-full rounded-lg bg-black">
            <div className="w-full max-h-96 h-96 relative rounded-lg">
              <div className="absolute z-20 flex bottom-0 p-3 justify-center items-center gap-2">
                <p className="font-bold text-xl text-white">{dailyGame.title}</p>
                <BsArrowRightSquare size={24} color="#fff"/>
              </div>
              <Image
                src={dailyGame.image_url} alt={dailyGame.title} 
                quality={100} priority={true} fill 
                className="max-h-96 object-cover rounded-lg opacity-50 hover:opacity-100 transition-all duration-300"
                sizes="(max-width: 768px) 100vw, (max-height: 1200px) 33vw"
              />
            </div>
          </section>
        </Link>

        <SearchInput />

        <h2 className="text-lg font-bold mt-8 mb-5">Jogos para conhecer</h2>

        <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {gamesData.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </section>
      </Container>
    </main>
  );
}
