export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
}

interface PokemonTypes {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

interface PokemonAbilities {
    is_hidden: boolean;
    slot: number;
    ability: {
        name: string;
        url: string;
    };
}

interface PokemonSprite {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
}

interface PokemonStats {
    base_stat: number;
    stat: { 
        name: string; 
        url: string; 
    };
}

export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: PokemonTypes[];
    abilities: PokemonAbilities[];
    cries: {
        latest: string;
        legacy: string;
    };
    sprites: PokemonSprite;
    stats: PokemonStats[];
}

