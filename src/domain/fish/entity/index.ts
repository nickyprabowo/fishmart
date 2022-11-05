export interface Fish {
  uuid: string,
  komoditas: string,
  area_provinsi: string,
  area_kota: string,
  size: number,
  price: number,
  tgl_parsed: string,
  timestamp: string
}

export interface Area {
  province: string,
  city: string
}

export interface Size {
  size: number
}

export type OptionArea = Area[]

export type OptionSize = Size[]

export type Fishes = Fish[]