import { Container } from "@/components/container";
import { GameCard } from "@/components/GameCard";
import { SearchInput } from "@/components/SearchInput";
import { GameProps } from "@/utils/types/game";

async function getData(title: string) {
  try {
    const decodeTitle = decodeURI(title); 
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&title=${title}` );
    return res.json();
  } catch (err) {
    return null;
  }
}
export default async function Search({ params: { title }}: {  params: {title: string}}) {
  const games: GameProps[] = await getData(title);
  return (
    <main className="w-full text-black">
      <Container>
        <SearchInput />
        <h1 className="font-bold text-xl mb-5 mt-8">Veja o que encontramos na nossa base:</h1>
        {!games 
          ? <p>Esse jogo não foi encontrado!</p>
          : <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {games.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </section>
        }
      </Container>
    </main>
  )
}