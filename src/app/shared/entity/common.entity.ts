export interface Pair<T> {
  key: string;
  value: T;
}

export type Operator = '_eq' | '_neq' | '_gt' | '_gte' | '_lt' | '_lte';

export interface Filter<K,O,V> {
  key: keyof K;
  operator: O;
  value: V;
}

export interface LinkDto {
  href: string;
  hreflang?: string;
  title?: string;
  type?: string;
  deprecation?: string;
  profile?: string;
  name?: string;
  templated: boolean;
}

export interface LinksDto {
  [key: string]: LinkDto;
}

export interface Link {
  href: string;
  hreflang?: string;
  title?: string;
  type?: string;
  deprecation?: string;
  profile?: string;
  name?: string;
  templated: boolean;
}

export interface Links {
  [key: string]: Link;
}

export function convertLinkDtoToDomain(linkDto: LinkDto): Link {
  return { ...linkDto };
}

export function convertLinksDtoToDomain(linksDto: LinksDto): Links {
  const links: Links = {};
  for (const key in linksDto) {
    links[key] = convertLinkDtoToDomain(linksDto[key]);
  }
  return links;
}