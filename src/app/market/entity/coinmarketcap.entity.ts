interface PlatformDto {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  token_address: string;
}

export interface CryptocurrencyDto {
  id: number;
  rank: number;
  name: string;
  symbol: string;
  slug: string;
  is_active: number;
  first_historical_data: string;
  last_historical_data: string;
  platform: PlatformDto | null;
}

interface StatusDto {
  timestamp: string;
  error_code: number;
  error_message: string;
  elapsed: number;
  credit_count: number;
}

export interface CryptocurrencyResponseDto {
  data: CryptocurrencyDto[];
  status: StatusDto;
}

interface Platform {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  tokenAddress: string;
}

export interface Cryptocurrency {
  id: number;
  rank: number;
  name: string;
  symbol: string;
  slug: string;
  isActive: boolean;
  firstHistoricalData: Date;
  lastHistoricalData: Date;
  platform: Platform | null;
}

interface Status {
  timestamp: Date;
  errorCode: number;
  errorMessage: string;
  elapsed: number;
  creditCount: number;
}

export interface CryptocurrencyResponse {
  data: Cryptocurrency[];
  status: Status;
}

function convertPlatformDtoToDomain(platformDto: PlatformDto | null): Platform | null {
  if (!platformDto) return null;
  return {
    id: platformDto.id,
    name: platformDto.name,
    symbol: platformDto.symbol,
    slug: platformDto.slug,
    tokenAddress: platformDto.token_address,
  };
}

function convertCryptocurrencyDtoToDomain(cryptoDto: CryptocurrencyDto): Cryptocurrency {
  return {
    id: cryptoDto.id,
    rank: cryptoDto.rank,
    name: cryptoDto.name,
    symbol: cryptoDto.symbol,
    slug: cryptoDto.slug,
    isActive: cryptoDto.is_active === 1,
    firstHistoricalData: new Date(cryptoDto.first_historical_data),
    lastHistoricalData: new Date(cryptoDto.last_historical_data),
    platform: convertPlatformDtoToDomain(cryptoDto.platform),
  };
}

function convertStatusDtoToDomain(statusDto: StatusDto): Status {
  return {
    timestamp: new Date(statusDto.timestamp),
    errorCode: statusDto.error_code,
    errorMessage: statusDto.error_message,
    elapsed: statusDto.elapsed,
    creditCount: statusDto.credit_count,
  };
}

export function convertCryptocurrencyResponseDtoToDomain(responseDto: CryptocurrencyResponseDto): CryptocurrencyResponse {
  return {
    data: responseDto.data.map(convertCryptocurrencyDtoToDomain),
    status: convertStatusDtoToDomain(responseDto.status),
  };
}

export interface CurrencyLogo {
  id: number;
  name: string;
  symbol: string;
  logo: string;
}