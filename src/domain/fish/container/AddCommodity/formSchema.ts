interface AreaOption {
  label: string,
  value: string[]
}

interface SizeOption {
  label: string,
  value: string
}

const formSchema = (optionArea: AreaOption[], optionSize: SizeOption[]) => (
  {
    Komoditas: {
      type: 'text',
      required: true,
      placeholder: 'Nama komoditas',
    },
    Area: {
      type: 'select',
      required: true,
      placeholder: 'Pilih Area',
      options: optionArea,
    },
    Ukuran: {
      type: 'select',
      required: true,
      placeholder: 'Pilih Ukuran',
      options: optionSize,
    },
    Harga: {
      type: 'number',
      required: true,
      placeholder: 'Masukkan harga',
    },
    Tanggal: {
      type: 'date',
      required: true,
      placeholder: 'Pilih tanggal',
    },
    Tambah: {
      type: 'submit',
      disabled: false,
    },
  }
)

export default formSchema