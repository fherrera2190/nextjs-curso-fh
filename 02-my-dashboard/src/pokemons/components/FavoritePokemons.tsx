"use client";

import { useAppSelector } from "@/store";
import { PokemonGrid } from "./PokemonGrid";
import { useEffect, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";

export const FavoritePokemons = () => {
  const favoritesPokemons = useAppSelector((state) => state.pokemons.favorites);

  const [pokemons, setPokemons] = useState(favoritesPokemons);

  useEffect(() => {
    setPokemons(favoritesPokemons);
  }, [favoritesPokemons]);

  return pokemons.length ? (
    <NoFavorites />
  ) : (
    <PokemonGrid pokemons={Object.values(pokemons)} />
  );
};

export const NoFavorites = () => {
  return (
    <div className="flex flex-col h-[50vh] items-center justify-center">
      <IoMdHeartEmpty size={100} className="text-red-500" />
      <span>No hay favoritos</span>
    </div>
  );
};
