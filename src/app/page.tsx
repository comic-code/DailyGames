import { Container } from "@/components/container";
import { GameProps } from "@/utils/types/game";
import Image from "next/image";
import Link from "next/link";

async function getDailyGame() {
  try {
    const response = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`);
    return response.json();
  } catch (err) {
    throw new Error('Failed to get daily game!');
  }
}

export default async function Home() {
  const dailyGame: GameProps = await getDailyGame();
  // https://sujeitoprogramador.com/next-api/?api=game_day
  return (
    <main className="w-full">
      <Container>
        <h1 className="text-center font-bold text-xl mt-8 mb-5">Separamos um jogo exclusivo para você</h1>
        <Link href={`/game/${dailyGame.id}`}>
          <section className="w-full rounded-lg bg-black">
            <Image src={dailyGame.image_url} alt={dailyGame.title} quality={100} priority={true} width={100} height={100} />
          </section>
        </Link>
      </Container>
    </main>
  );
}
