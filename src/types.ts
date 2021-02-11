export type Movie = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

type Genre = {
  id: number
  name: string
}

type Collection = {
  id: number
  name: string
  poster_path: string
  backdrop_path: string
}

type ProductionCompany = {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

type ProductionCountry = {
  iso_3166_1: string
  name: string
}

type Language = {
  english_name: string
  iso_639_1: string
  name: string
}

export type MovieDetails = {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: Collection
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: Language[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type List = {
  description: string
  favorite_count: number
  id: number
  iso_639_1: string
  item_count: number
  list_type: string
  name: string
  poster_path: null | string
}

type ListItem = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  media_type: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type ListDetails = {
  created_by: string
  description: string
  favorite_count: number
  id: number
  items: ListItem[]
  item_count: number
  iso_639_1: string
  name: string
  poster_path: null | string
}