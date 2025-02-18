import { Pokemon } from "@/pokemons";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ q: string; b: string }>;
}

const getPokemonById = async (id: string):Promise<Pokemon> => {
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    cache: "force-cache", //cambiar
  }).then((res) => res.json());
  console.log(pokemon);
  return pokemon;
};

export default async function PokemonPage({ params, searchParams }: Props) {
  const { id } = await params;
  const slug2 = await searchParams;
  // console.log(slug);
  console.log(slug2);

  const pokemon =await getPokemonById(id);

  return (
    <div>
      <h1>Hello Page Pokemons </h1>
    </div>
  );
}
