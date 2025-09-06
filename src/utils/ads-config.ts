export type AdPosition =
  | "in-article-1"
  | "in-article-2"
  | "sidebar-top"
  | "sidebar-bottom"
  | "below-title";

export type AdMapping = {
  /** Grupo padrão (slug ou ID) caso não haja match por categoria/tag */
  fallbackGroup: string | number;
  /** Mapear categoria->grupo (por slug da categoria do WP) */
  byCategorySlug?: Record<string, string | number>;
  /** Mapear tag->grupo (por slug da tag do WP) */
  byTagSlug?: Record<string, string | number>;
};

export const ADS_CONFIG: Record<AdPosition, AdMapping> = {
  "in-article-1": {
    fallbackGroup: "generic-in-article",
    byCategorySlug: {
      "financas-pessoais": "grupo-financas",
      investimentos: "grupo-invest",
      "cartao-de-credito": "grupo-cartoes",
    },
  },
  "in-article-2": {
    fallbackGroup: "generic-in-article-2",
    byTagSlug: {
      renda_fixa: "grupo-rf",
      renda_variavel: "grupo-rv",
    },
  },
  "sidebar-top": {
    fallbackGroup: "sidebar-geral",
  },
  "sidebar-bottom": {
    fallbackGroup: "sidebar-geral",
  },
  "below-title": {
    fallbackGroup: "header-in-post",
  },
};
