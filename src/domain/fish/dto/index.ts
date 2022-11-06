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

export interface CreateCommodityRequest {
  uuid: string
  komoditas: string
  area_provinsi: string
  area_kota: string
  size: string
  price: string
  tgl_parsed: string
}

export interface CreateCommodityResponse {
  updatedRange: string
}