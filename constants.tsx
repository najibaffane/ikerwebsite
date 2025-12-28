
import { Product, Category } from './types';

export const WILAYAS = [
  "01 Adrar", "02 Chlef", "03 Laghouat", "04 Oum El Bouaghi", "05 Batna", "06 Béjaïa", "07 Biskra", "08 Béchar", "09 Blida", "10 Bouira",
  "11 Tamanrasset", "12 Tébessa", "13 Tlemcen", "14 Tiaret", "15 Tizi Ouzou", "16 Alger", "17 Djelfa", "18 Jijel", "19 Sétif", "20 Saïda",
  "21 Skikda", "22 Sidi Bel Abbès", "23 Annaba", "24 Guelma", "25 Constantine", "26 Médéa", "27 Mostaganem", "28 M'Sila", "29 Mascara", "30 Ouargla",
  "31 Oran", "32 El Bayadh", "33 Illizi", "34 Bordj Bou Arreridj", "35 Boumerdès", "36 El Tarf", "37 Tindouf", "38 Tissemsilt", "39 El Oued", "40 Khenchela",
  "41 Souk Ahras", "42 Tipaza", "43 Mila", "44 Aïn Defla", "45 Naâma", "46 Aïn Témouchent", "47 Ghardaïa", "48 Relizane", "49 El M'Ghair", "50 El Meniaa",
  "51 Ouled Djellal", "52 Bordj Baji Mokhtar", "53 Béni Abbès", "54 Timimoun", "55 Touggourt", "56 Djanet", "57 In Salah", "58 In Guezzam"
];

export const CATEGORIES: Category[] = [
  { id: 'processors', title: 'Neural Processors', image: 'https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&q=80&w=1200', url: '#processors' },
  { id: 'sensors', title: 'Quantum Sensors', image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=1200', url: '#sensors' },
  { id: 'logic', title: 'Logic Foundations', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200', url: '#logic' },
  { id: 'bridges', title: 'Data Bridges', image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=1200', url: '#bridges' }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'AX-CORE-X2',
    name: 'AXIS Core-X2 Neural Processor',
    category: 'processors',
    price: 58000,
    discount_percentage: 0,
    images: [
      'https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Pinnacle 7nm architecture optimized for real-time neural processing and autonomous logic.',
    details: 'Architecture: RISC-V 64-bit (Deca-Core)\nClock: 3.2GHz Boost\nNeural Engine: 12 TOPS\nPower: 15W TDP',
    features: ['7nm FinFET', 'Hardware Encryption', 'HBM2e Support'],
    stock: 15
  },
  {
    id: 'BS-IR-900',
    name: 'Bio-Sync Infrared Thermal Array',
    category: 'sensors',
    price: 32500,
    discount_percentage: 0,
    images: [
      'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'High-resolution thermal imaging sensor with integrated AI for precise person detection.',
    details: 'Resolution: 160x120 Thermal Pixels\nFOV: 57 Degrees\nInterface: SPI / I2C\nAccuracy: +/- 2.0°C',
    features: ['AI Tracking', 'No Calibration', 'Low Noise Floor'],
    stock: 24
  },
  {
    id: 'LM-PRO-V',
    name: 'Logic Master Pro-V Dev Board',
    category: 'logic',
    price: 94000,
    discount_percentage: 10,
    images: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Ultra-dense FPGA development platform for high-speed signal processing systems.',
    details: 'FPGA: Artix-7 Equivalent\nLogic Cells: 215,000\nRAM: 1GB DDR3\nTransceivers: 16x 6.6 Gbps',
    features: ['10G Ethernet', 'PCIe Gen2', '400 Pin I/O'],
    stock: 8
  },
  {
    id: 'OL-5G-NODE',
    name: 'Optic-Link 5G Industrial Node',
    category: 'bridges',
    price: 18900,
    discount_percentage: 0,
    images: [
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Sub-6GHz 5G module designed for low-latency machine-to-machine communication.',
    details: 'Network: 5G NR / LTE-A Cat 20\nSpeed: 2.4 Gbps Down\nLatency: < 10ms\nInterface: M.2',
    features: ['Global Bands', 'M.2 Interface', 'IP67 Rated'],
    stock: 40
  }
];
