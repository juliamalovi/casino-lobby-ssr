export interface ExternalGameCategory {
  id: string;
  title: string;
  type: string;
}

export interface ExternalGameTypes {
  realMode: number;
  funMode: number;
}

interface ExternalFeature {
  id: string;
  title: string;
  type: string;
}

interface ExternalTheme {
  id: string;
  title: string;
  type: string;
}

export interface ExternalGame {
  categories: string[];
  features: string[];
  themes: string[];
  icons: string[];
  backgrounds: string[];
  id: string;
  server_game_id: string;
  extearnal_game_id: string;
  front_game_id: string;
  name: string;
  title: string | null;
  ratio: string;
  status: string;
  provider: string;
  show_as_provider: string;
  provider_title: string;
  game_options: string | null;
  blocked_countries: string | null;
  has_age_restriction: number;
  icon_2: string;
  icon_3?: string;
  background: string;
  types: ExternalGameTypes;
  game_skin_id: string;
  cats: ExternalGameCategory[];
  feats: ExternalFeature[];
  thms: ExternalTheme[];
  active: string;
}