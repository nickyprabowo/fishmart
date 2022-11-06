export interface FilterDto {
  komoditas: string,
  area_kota: string,
  size: string,
  price: string
}

export interface PaginationDto {
  limit: string,
  offset: string
}