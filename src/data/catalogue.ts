import heroShowroomImg from '../assets/images/hero_agri_showroom_1794514451325.jpg';
import powerTillerImg from '../assets/images/product_power_tiller_1794514452743.jpg';
import submersiblePumpImg from '../assets/images/product_submersible_pump_1794514453270.jpg';
import dieselGeneratorImg from '../assets/images/product_diesel_generator_1794514454964.jpg';
import agriPipesImg from '../assets/images/product_agri_pipes_1794514453389.jpg';
import agriToolsImg from '../assets/images/product_agri_tools_1794514458538.jpg';
import hardwarePartsImg from '../assets/images/product_nut_bolts_hardware_1794621120813.jpg';
import monoblockSprayerImg from '../assets/images/product_monoblock_sprayer_1794621122035.jpg';

export type CatalogueSectionId =
  | 'kirloskar'
  | 'taro'
  | 'comet'
  | 'agri-machines'
  | 'pipes-parts';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  section: CatalogueSectionId;
  categoryLabel: string;
  brand: string;
  shortSpec: string;
  priceINR: number;
  unit: string;
  availability: 'In Stock' | 'Ready to Dispatch';
  image: string;
  description: string;
  specs: ProductSpec[];
}

export interface CatalogueSectionMeta {
  id: CatalogueSectionId;
  title: string;
  shortName: string;
  eyebrow: string;
  description: string;
  surfaceClass: string;
  accentHex: string;
  borderClass: string;
}

export interface ShowcaseSlide {
  id: string;
  sectionId: CatalogueSectionId;
  headline: string;
  modelTag: string;
  summary: string;
  featuredProductId: string;
  image: string;
}

export const SHOP_INFO = {
  name: 'Shree Balaji Enterprises',
  tagline: 'Kirloskar · Taro · Comet · Farm Machines · Pipes & Hardware',
  phoneDisplay: '+91 98260 44120',
  phoneHref: 'tel:+919826044120',
  whatsappNumber: '919826044120',
  email: 'sales@shreebalajienterprises.in',
  addressLine1: 'Plot 14, Krishi Upaj Mandi Road',
  addressLine2: 'Near New Bus Stand, Dewas, Madhya Pradesh 455001',
  landmark: 'Opposite Government Grain Godown Gate No. 2',
  hoursWeekday: 'Monday – Saturday: 9:00 AM – 8:00 PM',
  hoursSunday: 'Sunday: 10:00 AM – 2:00 PM',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Krishi+Upaj+Mandi+Road+Dewas+Madhya+Pradesh+455001',
};

export const HERO_IMAGE = heroShowroomImg;
export const SHOWCASE_PAIR_IMAGE = monoblockSprayerImg;

export const CATALOGUE_SECTIONS: CatalogueSectionMeta[] = [
  {
    id: 'kirloskar',
    title: 'Kirloskar Pumps & Engines',
    shortName: 'Kirloskar',
    eyebrow: 'Authorised Brand Section · Kirloskar Brothers',
    description:
      'Complete range of Kirloskar V4/V6 borewell submersibles, KDS agricultural monoblocks, openwell pumps, and air-cooled diesel pumpsets.',
    surfaceClass: 'bg-white',
    accentHex: '#16613C',
    borderClass: 'border-[#D5E3DA]',
  },
  {
    id: 'taro',
    title: 'Taro Pumps & Submersibles',
    shortName: 'Taro',
    eyebrow: 'Authorised Brand Section · Taro Pumps',
    description:
      'High-efficiency Taro stainless steel borewell submersible sets, openwell pumps, and centrifugal monoblocks built for long-hour farm duty.',
    surfaceClass: 'bg-[#EEF5F0]',
    accentHex: '#23804D',
    borderClass: 'border-[#C9DED0]',
  },
  {
    id: 'comet',
    title: 'Comet Diesel Engines & Sprayer Pumps',
    shortName: 'Comet',
    eyebrow: 'Authorised Brand Section · Comet',
    description:
      'Heavy-duty Comet single-cylinder diesel engines, HTP brass power sprayer pumps, and direct-coupled farm water lifting units.',
    surfaceClass: 'bg-white',
    accentHex: '#2F5E38',
    borderClass: 'border-[#D5E3DA]',
  },
  {
    id: 'agri-machines',
    title: 'Agricultural Machines, Generators & Sprayers',
    shortName: 'Machines & Sprayers',
    eyebrow: 'Complete Farm Equipment & Power',
    description:
      'Diesel power tillers, fodder chaff cutters, cordless electric battery sprayers, petrol brush cutters, chainsaws, and silent generators.',
    surfaceClass: 'bg-[#E5F0E8]',
    accentHex: '#135232',
    borderClass: 'border-[#C1D8C8]',
  },
  {
    id: 'pipes-parts',
    title: 'Pipes, Nut-Bolts & Genuine Spare Parts',
    shortName: 'Pipes, Parts & Nut-Bolts',
    eyebrow: 'Irrigation Piping, Fasteners & Repairs',
    description:
      'HDPE pipe coils, uPVC borewell column pipes, forged brass valves, galvanized nut-bolt & flange kits, cables, starters, and pump spares.',
    surfaceClass: 'bg-white',
    accentHex: '#3A6340',
    borderClass: 'border-[#D5E3DA]',
  },
];

export const SHOWCASE_SLIDES: ShowcaseSlide[] = [
  {
    id: 'slide-kirloskar',
    sectionId: 'kirloskar',
    headline: 'Kirloskar Submersibles & Monoblocks',
    modelTag: 'KDS Monoblocks · V4 & V6 Borewell Submersibles',
    summary:
      'Original Kirloskar agricultural pumpsets with 100% copper winding, high suction lift, and low-voltage protection for uninterrupted irrigation.',
    featuredProductId: 'kir-sub-5hp-v6',
    image: submersiblePumpImg,
  },
  {
    id: 'slide-taro',
    sectionId: 'taro',
    headline: 'Taro Pumps Heavy-Duty Range',
    modelTag: 'Taro V4 / V6 SS Submersibles · Openwell Sets',
    summary:
      'Corrosion-proof Taro stainless steel borewell and openwell pumps engineered to handle sandy borewells and fluctuating rural voltage.',
    featuredProductId: 'taro-sub-5hp',
    image: submersiblePumpImg,
  },
  {
    id: 'slide-comet',
    sectionId: 'comet',
    headline: 'Comet Engines & HTP Sprayers',
    modelTag: '5 HP & 8 HP Diesel Engines · HTP Brass Pumps',
    summary:
      'Rugged Comet diesel prime movers for threshers, chaff cutters, and water pumpsets alongside high-pressure HTP orchard sprayer pumps.',
    featuredProductId: 'comet-engine-8hp',
    image: dieselGeneratorImg,
  },
  {
    id: 'slide-machines',
    sectionId: 'agri-machines',
    headline: 'Farm Machines & Electric Sprayers',
    modelTag: 'Power Tillers · 16L Battery Sprayers · Generators',
    summary:
      'Everything for cultivation, spraying, harvesting, and farm backup power—from 9 HP power tillers to dual-motor cordless electric sprayers.',
    featuredProductId: 'agri-sprayer-16l',
    image: monoblockSprayerImg,
  },
  {
    id: 'slide-parts',
    sectionId: 'pipes-parts',
    headline: 'Pipes, Nut-Bolts & Spare Parts',
    modelTag: 'HDPE Coils · Column Pipes · Brass Valves · Fasteners',
    summary:
      'Stock up on ISI HDPE coils, square-thread column pipes, galvanized hex nut-bolts, cast-iron flanges, impellers, oil seals, and submersible cable.',
    featuredProductId: 'part-nutbolt-flange',
    image: hardwarePartsImg,
  },
];

export const PRODUCTS: Product[] = [
  // 1. KIRLOSKAR SECTION
  {
    id: 'kir-sub-5hp-v6',
    name: 'Kirloskar 5 HP V6 Borewell Submersible',
    section: 'kirloskar',
    categoryLabel: 'Borewell Submersible',
    brand: 'Kirloskar',
    shortSpec: '5 HP 3-Phase · 12-Stage SS · 450 ft Max Head',
    priceINR: 35800,
    unit: 'per set',
    availability: 'In Stock',
    image: submersiblePumpImg,
    description:
      'Original Kirloskar 6-inch borewell submersible pump with dynamically balanced stainless steel impellers and water-lubricated thrust bearings.',
    specs: [
      { label: 'Brand & Series', value: 'Kirloskar KS6 Series' },
      { label: 'Power Rating', value: '5 HP / 3.7 kW (415V 3-Phase)' },
      { label: 'Borewell Diameter', value: '150 mm (6 Inch)' },
      { label: 'Outlet Flange', value: '50 mm (2 Inch)' },
    ],
  },
  {
    id: 'kir-mono-3hp',
    name: 'Kirloskar KDS-335 3 HP Monoblock',
    section: 'kirloskar',
    categoryLabel: 'Monoblock Pumpset',
    brand: 'Kirloskar',
    shortSpec: '3 HP Copper Winding · 65x50 mm · High Discharge',
    priceINR: 18900,
    unit: 'per unit',
    availability: 'In Stock',
    image: monoblockSprayerImg,
    description:
      'Popular Kirloskar KDS agricultural centrifugal monoblock built for sprinkler lines, canal lifting, and open-channel field watering.',
    specs: [
      { label: 'Model', value: 'Kirloskar KDS-335+' },
      { label: 'Motor Power', value: '3 HP (2.2 kW) Three Phase' },
      { label: 'Suction x Delivery', value: '65 mm x 50 mm' },
      { label: 'Winding', value: '100% Copper Class-F' },
    ],
  },
  {
    id: 'kir-openwell-2hp',
    name: 'Kirloskar KOS-220 Openwell Submersible',
    section: 'kirloskar',
    categoryLabel: 'Openwell Pump',
    brand: 'Kirloskar',
    shortSpec: '2 HP Single Phase · Cast Iron Body · Thermal Guard',
    priceINR: 14600,
    unit: 'per unit',
    availability: 'In Stock',
    image: submersiblePumpImg,
    description:
      'Submerged Kirloskar openwell pump designed for farm dug-wells and storage tanks with zero priming trouble.',
    specs: [
      { label: 'Model', value: 'Kirloskar KOS-220' },
      { label: 'Power Rating', value: '2 HP (180V – 240V)' },
      { label: 'Head Range', value: '38 – 92 ft' },
      { label: 'Warranty', value: '1 Year Kirloskar Warranty' },
    ],
  },
  {
    id: 'kir-diesel-5hp',
    name: 'Kirloskar 5 HP Air-Cooled Diesel Pumpset',
    section: 'kirloskar',
    categoryLabel: 'Diesel Pumpset',
    brand: 'Kirloskar',
    shortSpec: '5 HP Diesel · 80x80 mm Discharge · Trolley Mounted',
    priceINR: 38500,
    unit: 'per set',
    availability: 'Ready to Dispatch',
    image: dieselGeneratorImg,
    description:
      'Heavy-duty Kirloskar diesel engine coupled with a 3-inch centrifugal water pump on a wheeled steel trolley for remote fields.',
    specs: [
      { label: 'Engine', value: 'Kirloskar 5 HP Single Cylinder' },
      { label: 'Pipe Size', value: '80 mm x 80 mm (3" x 3")' },
      { label: 'Max Discharge', value: '50,000 Litres / Hour' },
      { label: 'Frame', value: 'Heavy Steel Wheel Trolley' },
    ],
  },

  // 2. TARO SECTION
  {
    id: 'taro-sub-5hp',
    name: 'Taro 5 HP V6 Stainless Borewell Pump',
    section: 'taro',
    categoryLabel: 'Borewell Submersible',
    brand: 'Taro Pumps',
    shortSpec: '5 HP 3-Phase · Sand-Resistant Impeller · High Head',
    priceINR: 33900,
    unit: 'per set',
    availability: 'In Stock',
    image: submersiblePumpImg,
    description:
      'Taro V6 submersible pumpset built with precision-molded impellers and corrosion-resistant stainless steel sleeve for deep borewells.',
    specs: [
      { label: 'Brand & Series', value: 'Taro Texmo 6-Inch V6' },
      { label: 'Power Rating', value: '5 HP (415V 3-Phase)' },
      { label: 'Head Range', value: '240 – 440 ft' },
      { label: 'Warranty', value: '2 Years Taro Service Warranty' },
    ],
  },
  {
    id: 'taro-sub-3hp-v4',
    name: 'Taro 3 HP V4 Borewell Submersible Set',
    section: 'taro',
    categoryLabel: 'Borewell Submersible',
    brand: 'Taro Pumps',
    shortSpec: '3 HP Single Phase · 100mm Bore · Starter Included',
    priceINR: 22400,
    unit: 'per set',
    availability: 'In Stock',
    image: submersiblePumpImg,
    description:
      'Complete 4-inch Taro borewell pump kit supplied with heavy-duty capacitor control panel and thermal overload relay.',
    specs: [
      { label: 'Borewell Size', value: '100 mm (4 Inch)' },
      { label: 'Motor Rating', value: '3 HP Single Phase' },
      { label: 'Voltage Band', value: '170V – 240V Wide Band' },
      { label: 'Control Panel', value: 'Digital Volt/Amp Starter Box' },
    ],
  },
  {
    id: 'taro-openwell-3hp',
    name: 'Taro 3 HP Vertical Openwell Submersible',
    section: 'taro',
    categoryLabel: 'Openwell Pump',
    brand: 'Taro Pumps',
    shortSpec: '3 HP 3-Phase · Cedar-Grade Insulation · 65x50 mm',
    priceINR: 17900,
    unit: 'per unit',
    availability: 'In Stock',
    image: submersiblePumpImg,
    description:
      'High-discharge Taro openwell submersible built to run submerged in farm wells, sumps, and river intakes with steady output.',
    specs: [
      { label: 'Power Rating', value: '3 HP Three Phase' },
      { label: 'Outlet Size', value: '50 mm (2 Inch)' },
      { label: 'Cooling', value: 'Water-Filled Submersible Motor' },
      { label: 'Body', value: 'Anti-Corrosion Coated Cast Iron' },
    ],
  },
  {
    id: 'taro-mono-2hp',
    name: 'Taro 2 HP Agricultural Monoblock Pump',
    section: 'taro',
    categoryLabel: 'Monoblock Pumpset',
    brand: 'Taro Pumps',
    shortSpec: '2 HP Single Phase · Brass Impeller · Low Power Draw',
    priceINR: 12800,
    unit: 'per unit',
    availability: 'In Stock',
    image: monoblockSprayerImg,
    description:
      'Compact Taro centrifugal monoblock ideal for drip irrigation tanks, orchard watering, and livestock water supply.',
    specs: [
      { label: 'Power Rating', value: '2 HP (1.5 kW)' },
      { label: 'Impeller', value: 'Forged Brass' },
      { label: 'Pipe Size', value: '50 mm x 50 mm' },
      { label: 'Max Suction', value: '25 Feet' },
    ],
  },

  // 3. COMET SECTION
  {
    id: 'comet-engine-8hp',
    name: 'Comet 8 HP Water-Cooled Diesel Engine',
    section: 'comet',
    categoryLabel: 'Diesel Engine',
    brand: 'Comet',
    shortSpec: '8 HP 1500 RPM · Heavy Flywheel · Crank Handle Start',
    priceINR: 29500,
    unit: 'per unit',
    availability: 'In Stock',
    image: dieselGeneratorImg,
    description:
      'Dependable Comet single-cylinder diesel prime mover designed for running chaff cutters, grain flour mills, threshers, and water pumps.',
    specs: [
      { label: 'Rated Output', value: '8 HP @ 1500 RPM' },
      { label: 'Cooling Type', value: 'Water-Cooled Hopper / Radiator' },
      { label: 'Fuel Efficiency', value: 'Low Diesel Consumption' },
      { label: 'Application', value: 'Pumpsets, Chaff Cutters, Mills' },
    ],
  },
  {
    id: 'comet-pumpset-5hp',
    name: 'Comet 5 HP Direct-Coupled Pumpset',
    section: 'comet',
    categoryLabel: 'Diesel Pumpset',
    brand: 'Comet',
    shortSpec: '5 HP Comet Engine · 3x3 Inch Pump · Skid Base',
    priceINR: 26400,
    unit: 'per set',
    availability: 'In Stock',
    image: dieselGeneratorImg,
    description:
      'Economical Comet 5 HP diesel pumpset offering quick cold starts and strong water discharge from ponds, canals, and bore sumps.',
    specs: [
      { label: 'Engine Power', value: '5 HP Single Cylinder Diesel' },
      { label: 'Pump Size', value: '80 mm x 80 mm (3" x 3")' },
      { label: 'Flow Capacity', value: '45,000 Litres / Hour' },
      { label: 'Mounting', value: 'Heavy Channel Iron Base' },
    ],
  },
  {
    id: 'comet-htp-sprayer',
    name: 'Comet 3-Piston HTP Brass Power Sprayer Pump',
    section: 'comet',
    categoryLabel: 'HTP Sprayer Pump',
    brand: 'Comet',
    shortSpec: '22–36 LPM Output · Brass Head · 40 kg/cm² Pressure',
    priceINR: 8900,
    unit: 'per pump',
    availability: 'In Stock',
    image: agriToolsImg,
    description:
      'Heavy-duty Comet triplex piston HTP sprayer pump with forged brass manifold and pressure gauge for long-hose orchard and field spraying.',
    specs: [
      { label: 'Pump Type', value: 'Triplex Stainless Plunger HTP' },
      { label: 'Pressure', value: '20 – 45 kg/cm² Adjustable' },
      { label: 'Drive Required', value: '2 HP Motor or 3 HP Engine' },
      { label: 'Included', value: 'Pulley, Suction Hose & Strainer' },
    ],
  },

  // 4. AGRICULTURAL MACHINES, GENERATORS & SPRAYERS SECTION
  {
    id: 'agri-sprayer-16l',
    name: '16L Dual-Motor Electric Battery Sprayer',
    section: 'agri-machines',
    categoryLabel: 'Electric Sprayer',
    brand: 'Neptune / Kisan',
    shortSpec: '12V 12Ah Battery · Dual Pump · 110 PSI · 4 Nozzles',
    priceINR: 3650,
    unit: 'per unit',
    availability: 'In Stock',
    image: monoblockSprayerImg,
    description:
      'High-pressure cordless electric knapsack sprayer delivering up to 25 tanks per charge with adjustable regulator and brass spray lance.',
    specs: [
      { label: 'Tank Capacity', value: '16 Litres Virgin HDPE' },
      { label: 'Battery & Pump', value: '12V 12Ah · Dual High-Flow Diaphragm' },
      { label: 'Working Pressure', value: '110 PSI Adjustable' },
      { label: 'Included', value: 'Fast Charger, Brass Lance, 4 Nozzles' },
    ],
  },
  {
    id: 'agri-sprayer-4stroke',
    name: '20L 4-Stroke Petrol Power Sprayer',
    section: 'agri-machines',
    categoryLabel: 'Power Sprayer',
    brand: 'KisanKraft',
    shortSpec: '35cc Petrol Engine · 20L Tank · Brass Pressure Pump',
    priceINR: 9800,
    unit: 'per unit',
    availability: 'In Stock',
    image: agriToolsImg,
    description:
      'High-pressure motorized knapsack crop sprayer with twin brass nozzles for tall orchards, cotton, and large grain fields.',
    specs: [
      { label: 'Engine', value: '35cc 4-Stroke Air-Cooled Petrol' },
      { label: 'Tank Capacity', value: '20 Litres HDPE' },
      { label: 'Working Pressure', value: '15 – 25 Bar' },
      { label: 'Included', value: '2 Lances & High-Pressure Hose' },
    ],
  },
  {
    id: 'agri-tiller-9hp',
    name: '9 HP Diesel Power Tiller',
    section: 'agri-machines',
    categoryLabel: 'Farm Machine',
    brand: 'VST / Titan Series',
    shortSpec: '9 HP 4-Stroke Diesel · 24 Blades · Recoil & Self Start',
    priceINR: 118500,
    unit: 'per unit',
    availability: 'In Stock',
    image: powerTillerImg,
    description:
      'Heavy-duty diesel rotary tiller built for deep ploughing, inter-cultivation, and puddling across wet and dry farmland.',
    specs: [
      { label: 'Engine Power', value: '9 HP Diesel, Single Cylinder' },
      { label: 'Tilling Width', value: '900 mm (Adjustable)' },
      { label: 'Gearbox', value: '2 Forward + 1 Reverse' },
      { label: 'Warranty', value: '1 Year Manufacturer Warranty' },
    ],
  },
  {
    id: 'agri-chaff-2hp',
    name: '2 HP Electric Fodder Chaff Cutter',
    section: 'agri-machines',
    categoryLabel: 'Farm Machine',
    brand: 'Shree Balaji Agro',
    shortSpec: '2 HP Copper Motor · 800 kg/hr Output · 3 Alloy Blades',
    priceINR: 18400,
    unit: 'per unit',
    availability: 'In Stock',
    image: powerTillerImg,
    description:
      'Sturdy steel-body fodder cutter with hardened high-carbon blades and reverse-forward gear lever for dairy and livestock farms.',
    specs: [
      { label: 'Motor Rating', value: '2 HP Single Phase Copper' },
      { label: 'Cutting Capacity', value: '750 – 900 kg/hour' },
      { label: 'Blade Count', value: '3 Reversible High-Carbon Blades' },
      { label: 'Warranty', value: '1 Year on Motor' },
    ],
  },
  {
    id: 'agri-gen-5kva',
    name: '5 kVA Silent Diesel Generator',
    section: 'agri-machines',
    categoryLabel: 'Generator',
    brand: 'Powerol / Fieldking',
    shortSpec: '5 kVA Single Phase · Electric Key Start · 15L Tank',
    priceINR: 68000,
    unit: 'per unit',
    availability: 'In Stock',
    image: dieselGeneratorImg,
    description:
      'Air-cooled silent diesel generator built to power borewell pumps, farm lighting, and workshop welding sets during outages.',
    specs: [
      { label: 'Rated Output', value: '5.0 kVA / 230V 50Hz' },
      { label: 'Starting System', value: '12V Electric Key Start + Recoil' },
      { label: 'Fuel Consumption', value: '1.1 Litres / Hour (75% Load)' },
      { label: 'Noise Level', value: '72 dBA Acoustic Canopy' },
    ],
  },
  {
    id: 'agri-brush-cutter',
    name: '52cc Petrol Brush Cutter & Crop Harvester',
    section: 'agri-machines',
    categoryLabel: 'Small Machine',
    brand: 'Stihl / Neptune',
    shortSpec: '52cc 2-Stroke · 3T Blade + 80T Harvester + Paddy Guard',
    priceINR: 11400,
    unit: 'per unit',
    availability: 'In Stock',
    image: agriToolsImg,
    description:
      'Multi-purpose side-pack brush cutter for harvesting wheat, soybean, paddy, and clearing farm bunds.',
    specs: [
      { label: 'Displacement', value: '52cc Air-Cooled 2-Stroke' },
      { label: 'Output Power', value: '2.2 HP @ 7,500 RPM' },
      { label: 'Attachments', value: '3T Metal Blade, 80T Saw, Nylon Head' },
      { label: 'Harness', value: 'Double Shoulder Padded Strap' },
    ],
  },

  // 5. PIPES, NUT-BOLTS & SPARE PARTS SECTION
  {
    id: 'part-hdpe-pipe-63',
    name: 'HDPE Irrigation Pipe Coil (63mm / 2 Inch)',
    section: 'pipes-parts',
    categoryLabel: 'Irrigation Pipe',
    brand: 'Jain / Finolex',
    shortSpec: '63 mm PE-100 · PN-6 Pressure · 100 Metre Coil',
    priceINR: 7400,
    unit: 'per 100m coil',
    availability: 'In Stock',
    image: agriPipesImg,
    description:
      'UV-stabilized virgin HDPE agricultural pipe coil resistant to sun cracking, high pressure surges, and rough field dragging.',
    specs: [
      { label: 'Outer Diameter', value: '63 mm (2 Inch)' },
      { label: 'Pressure Class', value: 'PN-6 (6 kg/cm²)' },
      { label: 'Coil Length', value: '100 Metres' },
      { label: 'Material', value: 'ISI Marked Virgin PE-100' },
    ],
  },
  {
    id: 'part-upvc-column',
    name: 'uPVC Borewell Column Pipe (2 Inch)',
    section: 'pipes-parts',
    categoryLabel: 'Column Pipe',
    brand: 'Ashirvad / Supreme',
    shortSpec: '50 mm Medium Heavy · Square Thread · 10 ft Length',
    priceINR: 1180,
    unit: 'per 10 ft pipe',
    availability: 'In Stock',
    image: agriPipesImg,
    description:
      'High-tensile blue uPVC riser column pipes with leak-proof rubber ring seals designed for deep submersible pump installations.',
    specs: [
      { label: 'Nominal Size', value: '50 mm (2 Inch)' },
      { label: 'Standard Length', value: '3 Metres (10 Feet)' },
      { label: 'Safe Pull Load', value: 'Up to 2,200 kg' },
      { label: 'Joint Type', value: 'Square Thread + EPDM Rubber Ring' },
    ],
  },
  {
    id: 'part-nutbolt-flange',
    name: 'Galvanized Nut-Bolt, Washer & Flange Kit',
    section: 'pipes-parts',
    categoryLabel: 'Nut-Bolts & Flanges',
    brand: 'TVS / Unbrako Grade',
    shortSpec: 'High-Tensile M12–M20 Hex Bolts, Nuts, Spring Washers & Flanges',
    priceINR: 1450,
    unit: 'per 5 kg pack',
    availability: 'In Stock',
    image: hardwarePartsImg,
    description:
      'Rust-resistant hot-dip galvanized hex nuts, long/short foundation bolts, flat & spring washers, and cast-iron 2"–3" pump flanges.',
    specs: [
      { label: 'Bolt Sizes', value: 'M12, M16, M20 (Full & Half Thread)' },
      { label: 'Finish', value: 'Hot-Dip Galvanized Zinc Coat' },
      { label: 'Flange Sizes', value: '2 Inch, 2.5 Inch & 3 Inch Cast Iron' },
      { label: 'Pack Options', value: 'Loose by Weight or 5 kg Workshop Box' },
    ],
  },
  {
    id: 'part-brass-valves',
    name: 'Forged Brass Gate Valve & Foot Valve Set',
    section: 'pipes-parts',
    categoryLabel: 'Valves & Fittings',
    brand: 'Zoloto / Leader',
    shortSpec: 'Solid Forged Brass · 1.5" & 2" BSP · PN-16 Leak Tested',
    priceINR: 2450,
    unit: 'per set',
    availability: 'In Stock',
    image: hardwarePartsImg,
    description:
      'Heavy forged brass gate valves, non-return check valves, GI nipples, and strainers for leak-free borewell and monoblock joints.',
    specs: [
      { label: 'Thread Sizes', value: '1.5 Inch & 2 Inch BSP' },
      { label: 'Material', value: 'Solid Forged Brass' },
      { label: 'Pressure Rating', value: 'PN-16 Tested' },
      { label: 'Includes', value: 'Gate Valve + NRV + GI Nipple' },
    ],
  },
  {
    id: 'part-pump-spares',
    name: 'Pump Impeller, Bearing, Oil Seal & Gasket Kit',
    section: 'pipes-parts',
    categoryLabel: 'Pump Spare Parts',
    brand: 'Kirloskar / Taro / Universal',
    shortSpec: 'SS/CI Impellers · SKF Bearings · Mechanical Seals & O-Rings',
    priceINR: 1650,
    unit: 'per overhaul kit',
    availability: 'In Stock',
    image: hardwarePartsImg,
    description:
      'Complete pump repair & overhaul spares including brass/cast-iron impellers, SKF ball bearings, carbon mechanical seals, and rubber gaskets.',
    specs: [
      { label: 'Compatibility', value: 'Kirloskar, Taro, CRI, Texmo Pumps' },
      { label: 'Bearings', value: '6204 / 6205 / 6305 ZZ Sealed' },
      { label: 'Seals', value: 'Silicon-Carbide & Carbon Face' },
      { label: 'Availability', value: 'Individual Spares or Full Kit' },
    ],
  },
  {
    id: 'part-toolkit-box',
    name: 'Heavy-Duty Farm Repair Hand Tool Kit',
    section: 'pipes-parts',
    categoryLabel: 'Workshop Tools',
    brand: 'Taparia',
    shortSpec: 'Chrome Vanadium Steel · Pipe Wrench, Spanners & Pliers',
    priceINR: 3850,
    unit: 'per box',
    availability: 'In Stock',
    image: agriToolsImg,
    description:
      'Steel carry-box stocked with ring/open spanners, heavy pipe wrench, combination pliers, screwdrivers, and files for field maintenance.',
    specs: [
      { label: 'Steel Grade', value: 'Drop-Forged Chrome Vanadium' },
      { label: 'Box Contents', value: '24-pc Spanners, Pipe Wrench, Pliers' },
      { label: 'Case', value: 'Powder-Coated Steel Carry Box' },
      { label: 'Weight', value: '6.8 kg Total' },
    ],
  },
];

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${SHOP_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
