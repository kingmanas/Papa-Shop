import { FormEvent, useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cog,
  Droplets,
  Gauge,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Search,
  ShoppingBag,
  Tractor,
  Wrench,
  X,
} from 'lucide-react';
import { OrderDrawer, OrderItem } from './components/OrderDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ResilientImage } from './components/ResilientImage';
import {
  buildWhatsAppUrl,
  CATALOGUE_SECTIONS,
  CatalogueSectionId,
  formatINR,
  HERO_IMAGE,
  Product,
  PRODUCTS,
  SHOP_INFO,
  SHOWCASE_PAIR_IMAGE,
  SHOWCASE_SLIDES,
} from './data/catalogue';

const SECTION_CARDS_META: Record<
  CatalogueSectionId,
  {
    icon: typeof Droplets;
    cardBg: string;
    cardText: string;
    subText: string;
    summary: string;
  }
> = {
  kirloskar: {
    icon: Droplets,
    cardBg: 'bg-[#0E3D26]',
    cardText: 'text-white',
    subText: 'text-[#BFE3CC]',
    summary: 'V4/V6 Submersibles, KDS Monoblocks, Openwell & Diesel Pumpsets',
  },
  taro: {
    icon: Gauge,
    cardBg: 'bg-[#16613C]',
    cardText: 'text-white',
    subText: 'text-[#CAEBD7]',
    summary: 'Taro Stainless Borewell Sets, Openwell & Monoblock Pumps',
  },
  comet: {
    icon: Cog,
    cardBg: 'bg-[#217C4B]',
    cardText: 'text-white',
    subText: 'text-[#D6F2E1]',
    summary: 'Comet 5–8 HP Diesel Engines, HTP Sprayer Pumps & Sets',
  },
  'agri-machines': {
    icon: Tractor,
    cardBg: 'bg-[#2E5E3A]',
    cardText: 'text-white',
    subText: 'text-[#D2E6D6]',
    summary: 'Power Tillers, Electric Sprayers, Chaff Cutters & Generators',
  },
  'pipes-parts': {
    icon: Wrench,
    cardBg: 'bg-[#E1EDE4] border border-[#BFD6C6]',
    cardText: 'text-[#0E3D26]',
    subText: 'text-[#31543D]',
    summary: 'HDPE & Column Pipes, Nut-Bolts, Flanges, Brass Valves & Spares',
  },
};

export default function App() {
  const [selectedSection, setSelectedSection] = useState<CatalogueSectionId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const [showcaseIndex, setShowcaseIndex] = useState(0);

  // Quick Shop Callback form state
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquiryItem, setEnquiryItem] = useState('');
  const [enquirySent, setEnquirySent] = useState(false);

  const activeSlide = SHOWCASE_SLIDES[showcaseIndex] ?? SHOWCASE_SLIDES[0];

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      const matchesSection =
        selectedSection === 'all' || product.section === selectedSection;
      if (!matchesSection) return false;
      if (!query) return true;
      return (
        product.name.toLowerCase().includes(query) ||
        product.categoryLabel.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.shortSpec.toLowerCase().includes(query)
      );
    });
  }, [selectedSection, searchQuery]);

  const sectionsToRender = useMemo(() => {
    return CATALOGUE_SECTIONS.map((meta) => ({
      meta,
      items: filteredProducts.filter((p) => p.section === meta.id),
    })).filter((group) => group.items.length > 0);
  }, [filteredProducts]);

  const totalOrderCount = useMemo(
    () => orderItems.reduce((sum, item) => sum + item.quantity, 0),
    [orderItems]
  );

  const handleAddToOrder = (product: Product, quantity = 1) => {
    setOrderItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    setRecentlyAddedId(product.id);
    window.setTimeout(() => {
      setRecentlyAddedId((current) => (current === product.id ? null : current));
    }, 1500);
  };

  const handleUpdateQty = (productId: string, quantity: number) => {
    setOrderItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setOrderItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearOrder = () => {
    setOrderItems([]);
  };

  const handleJumpToSection = (sectionId: CatalogueSectionId) => {
    setSelectedSection('all');
    setSearchQuery('');
    window.setTimeout(() => {
      const el = document.getElementById(`section-${sectionId}`);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 40);
  };

  const handlePrevSlide = () => {
    setShowcaseIndex((prev) =>
      prev === 0 ? SHOWCASE_SLIDES.length - 1 : prev - 1
    );
  };

  const handleNextSlide = () => {
    setShowcaseIndex((prev) =>
      prev === SHOWCASE_SLIDES.length - 1 ? 0 : prev + 1
    );
  };

  const handleEnquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!enquiryName.trim() || !enquiryPhone.trim()) return;
    setEnquirySent(true);
    setEnquiryName('');
    setEnquiryPhone('');
    setEnquiryItem('');
  };

  const generalWhatsAppUrl = buildWhatsAppUrl(
    `Hello ${SHOP_INFO.name}, I saw your catalogue and would like to enquire about Kirloskar, Taro, Comet, or agricultural machinery products.`
  );

  const featuredSlideProduct = PRODUCTS.find(
    (p) => p.id === activeSlide.featuredProductId
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F8F5] text-[#111A14]">
      {/* Top Bar Contract: Exactly 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#D5E3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#0E3D26] whitespace-nowrap shrink-0"
          >
            {SHOP_INFO.name}
          </a>

          {/* Zone 2: 5 clean single-line navigation links */}
          <nav
            aria-label="Catalogue Navigation"
            className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#314A3B]"
          >
            <button
              type="button"
              onClick={() => handleJumpToSection('kirloskar')}
              className="hover:text-[#16613C] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Kirloskar
            </button>
            <button
              type="button"
              onClick={() => handleJumpToSection('taro')}
              className="hover:text-[#16613C] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Taro
            </button>
            <button
              type="button"
              onClick={() => handleJumpToSection('comet')}
              className="hover:text-[#16613C] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Comet
            </button>
            <button
              type="button"
              onClick={() => handleJumpToSection('agri-machines')}
              className="hover:text-[#16613C] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Agri &amp; Sprayers
            </button>
            <button
              type="button"
              onClick={() => handleJumpToSection('pipes-parts')}
              className="hover:text-[#16613C] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Pipes &amp; Parts
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setIsOrderDrawerOpen(true)}
              className="h-10 px-4 inline-flex items-center gap-2 rounded-lg bg-[#16613C] text-white text-sm font-semibold hover:bg-[#0E3D26] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16613C] transition-colors whitespace-nowrap shrink-0"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order List</span>
              {totalOrderCount > 0 && (
                <span className="font-mono tabular-nums text-xs bg-white text-[#16613C] px-1.5 py-0.5 rounded">
                  {totalOrderCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Section 1: Multi-Tone Deep Pine to Emerald Hero */}
        <section className="bg-gradient-to-br from-[#0B3320] via-[#124B30] to-[#1A6842] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#9CE0B8]">
                  Shree Balaji Enterprises · Complete Agricultural Store
                </p>

                <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.03] text-balance max-w-xl">
                  All Brands &amp; Farm Equipment Under One Roof
                </h1>

                <p className="mt-4 text-base sm:text-lg text-[#DCF0E4] leading-relaxed max-w-lg">
                  Authorised stock of Kirloskar, Taro &amp; Comet pumps and engines,
                  agricultural machines, electric sprayers, HDPE &amp; column pipes,
                  nut-bolts, and genuine spare parts.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="#catalogue-directory"
                    className="h-11 px-6 inline-flex items-center justify-center gap-2 rounded-lg bg-white text-[#0E3D26] text-sm font-semibold hover:bg-[#E8F3EC] transition-colors whitespace-nowrap"
                  >
                    <span>Explore Full Range</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href={generalWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 px-5 inline-flex items-center justify-center gap-2 rounded-lg bg-[#23804D] text-white border border-white/25 text-sm font-semibold hover:bg-[#1C6B40] transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Shop</span>
                  </a>

                  <a
                    href={SHOP_INFO.phoneHref}
                    className="h-11 px-5 inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 text-white text-sm font-semibold hover:bg-white/10 transition-colors whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="font-mono tabular-nums">{SHOP_INFO.phoneDisplay}</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="w-full h-full min-h-[260px] sm:min-h-[360px] rounded-xl overflow-hidden bg-[#082618] border border-white/20 shadow-xl">
                  <ResilientImage
                    src={HERO_IMAGE}
                    alt="Shree Balaji Enterprises agricultural machinery, Kirloskar and Taro pumps, generators, and pipe showroom"
                    fallbackTitle="Shree Balaji Enterprises Showroom"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Homepage Complete Range Variety Directory (Varied Green Shades) */}
        <section
          id="catalogue-directory"
          className="bg-[#F4F8F5] border-b border-[#D5E3DA] py-10 sm:py-12"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#16613C]">
                  Our Variety Range
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#111A14]">
                  Browse By Brand &amp; Product Department
                </h2>
              </div>
              <p className="text-sm text-[#415748]">
                Click any department to jump directly to its catalogue section
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {CATALOGUE_SECTIONS.map((section) => {
                const cardMeta = SECTION_CARDS_META[section.id];
                const Icon = cardMeta.icon;
                const count = PRODUCTS.filter((p) => p.section === section.id).length;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => handleJumpToSection(section.id)}
                    className={`text-left rounded-xl p-5 flex flex-col justify-between gap-4 transition-transform duration-150 hover:-translate-y-0.5 shadow-xs ${cardMeta.cardBg} ${cardMeta.cardText}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <Icon className="w-6 h-6 opacity-90" strokeWidth={1.7} />
                      <span className={`font-mono text-xs font-semibold tabular-nums ${cardMeta.subText}`}>
                        {count} items
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold uppercase tracking-tight leading-tight">
                        {section.shortName}
                      </h3>
                      <p className={`mt-1.5 text-xs leading-relaxed ${cardMeta.subText}`}>
                        {cardMeta.summary}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 3: Interactive Department Spotlight (< 01 / 05 >) on Crisp White */}
        <section id="showcase" className="bg-white border-b border-[#D5E3DA] py-12 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#23804D]">
                  Featured Department Spotlight
                </p>

                <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-[#0E3D26] leading-[1.04]">
                  {activeSlide.headline}
                </h2>

                <p className="font-mono text-sm font-semibold text-[#16613C]">
                  {activeSlide.modelTag}
                </p>

                <p className="text-base text-[#3A4D40] leading-relaxed max-w-lg">
                  {activeSlide.summary}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => handleJumpToSection(activeSlide.sectionId)}
                    className="h-11 px-5 inline-flex items-center gap-2 rounded-lg bg-[#16613C] text-white text-sm font-semibold hover:bg-[#0E3D26] transition-colors whitespace-nowrap"
                  >
                    <span>Jump to Section</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {featuredSlideProduct && (
                    <button
                      type="button"
                      onClick={() => setActiveProduct(featuredSlideProduct)}
                      className="h-11 px-5 inline-flex items-center gap-2 rounded-lg border border-[#BBD0C2] bg-[#F4F8F5] text-[#0E3D26] text-sm font-semibold hover:bg-[#E1EDE4] transition-colors whitespace-nowrap"
                    >
                      <span>View Featured Specs</span>
                    </button>
                  )}
                </div>

                <div className="pt-3 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={handlePrevSlide}
                    aria-label="Previous brand department"
                    className="h-10 w-10 inline-flex items-center justify-center rounded-lg border border-[#C2D5C8] bg-white text-[#0E3D26] hover:bg-[#EEF5F0] transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="font-mono text-sm font-semibold tabular-nums text-[#0E3D26]">
                    {String(showcaseIndex + 1).padStart(2, '0')} /{' '}
                    {String(SHOWCASE_SLIDES.length).padStart(2, '0')}
                  </span>

                  <button
                    type="button"
                    onClick={handleNextSlide}
                    aria-label="Next brand department"
                    className="h-10 w-10 inline-flex items-center justify-center rounded-lg border border-[#C2D5C8] bg-white text-[#0E3D26] hover:bg-[#EEF5F0] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#F4F8F5] border border-[#D5E3DA] shadow-sm">
                  <ResilientImage
                    src={activeSlide.image}
                    alt={activeSlide.headline}
                    fallbackTitle={activeSlide.headline}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Catalogue Search & Filter Toolbar */}
        <section
          id="catalogue"
          className="bg-[#E3EFE7] border-b border-[#C7DCCE] py-6 sticky top-16 z-30"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div
              role="tablist"
              aria-label="Filter catalogue sections"
              className="flex items-center gap-1.5 p-1 bg-white/80 border border-[#C7DCCE] rounded-lg overflow-x-auto"
            >
              <button
                type="button"
                role="tab"
                aria-selected={selectedSection === 'all'}
                onClick={() => setSelectedSection('all')}
                className={`h-9 px-3.5 rounded-md text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  selectedSection === 'all'
                    ? 'bg-[#0E3D26] text-white'
                    : 'text-[#2D4536] hover:text-[#0E3D26]'
                }`}
              >
                All Sections ({PRODUCTS.length})
              </button>

              {CATALOGUE_SECTIONS.map((sec) => {
                const isActive = selectedSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedSection(sec.id)}
                    className={`h-9 px-3.5 rounded-md text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-[#16613C] text-white'
                        : 'text-[#2D4536] hover:text-[#0E3D26]'
                    }`}
                  >
                    {sec.shortName}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 text-[#43614E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Kirloskar, Taro, Comet, nut bolts..."
                aria-label="Search full catalogue"
                className="w-full h-10 pl-10 pr-9 rounded-lg bg-white border border-[#B9D0C1] text-sm text-[#111A14] placeholder:text-[#5B7564] focus:outline-none focus:border-[#16613C]"
              />
              {searchQuery && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#43614E] hover:text-[#111A14]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Section 5: Dedicated Multi-Brand & Category Sections */}
        {sectionsToRender.length === 0 ? (
          <section className="bg-white py-16 px-4 text-center border-b border-[#D5E3DA]">
            <div className="max-w-lg mx-auto bg-[#F4F8F5] border border-[#D5E3DA] rounded-xl p-10">
              <p className="text-base font-semibold text-[#0E3D26]">
                No products matched &ldquo;{searchQuery}&rdquo;
              </p>
              <p className="mt-1.5 text-sm text-[#415748]">
                Reset filters to view all Kirloskar, Taro, Comet, agricultural machines,
                and pipes &amp; hardware items, or message us on WhatsApp.
              </p>
              <div className="mt-5 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSection('all');
                  }}
                  className="h-10 px-4 rounded-lg bg-[#16613C] text-white text-sm font-semibold hover:bg-[#0E3D26] transition-colors"
                >
                  Show All Sections
                </button>
                <a
                  href={generalWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 px-4 inline-flex items-center gap-2 rounded-lg border border-[#B9D0C1] bg-white text-sm font-semibold text-[#0E3D26] hover:bg-[#EEF5F0] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#16613C]" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>
          </section>
        ) : (
          sectionsToRender.map(({ meta, items }) => (
            <section
              key={meta.id}
              id={`section-${meta.id}`}
              className={`${meta.surfaceClass} border-b ${meta.borderClass} py-12 sm:py-14 scroll-mt-32`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#D5E3DA]">
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: meta.accentHex }}
                    >
                      {meta.eyebrow}
                    </p>
                    <h2 className="mt-1 font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#0E3D26]">
                      {meta.title}
                    </h2>
                    <p className="mt-1.5 text-sm text-[#3E5245] max-w-2xl">
                      {meta.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono text-xs font-semibold tabular-nums text-[#3E5245]">
                      {items.length} products
                    </span>
                    <a
                      href={buildWhatsAppUrl(
                        `Hello ${SHOP_INFO.name}, I would like to enquire about items in your ${meta.title} section.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-9 px-3.5 inline-flex items-center gap-1.5 rounded-lg border border-[#B9D0C1] bg-white text-xs font-semibold text-[#0E3D26] hover:bg-[#E1EDE4] transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#16613C]" />
                      <span>Ask {meta.shortName} Price</span>
                    </a>
                  </div>
                </div>

                <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((product) => {
                    const isAdded = recentlyAddedId === product.id;
                    const inOrderQty =
                      orderItems.find((item) => item.product.id === product.id)
                        ?.quantity ?? 0;

                    return (
                      <article
                        key={product.id}
                        className="group bg-white border border-[#D5E3DA] rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <div>
                          <button
                            type="button"
                            onClick={() => setActiveProduct(product)}
                            className="w-full block text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#16613C]"
                          >
                            <div className="aspect-[4/3] w-full bg-[#F4F8F5] overflow-hidden border-b border-[#E6EFE9]">
                              <ResilientImage
                                src={product.image}
                                alt={product.name}
                                fallbackTitle={product.name}
                                className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                              />
                            </div>
                          </button>

                          <div className="p-5">
                            <div className="flex items-center gap-2 text-xs text-[#43594A]">
                              <span
                                className="uppercase tracking-wider font-semibold"
                                style={{ color: meta.accentHex }}
                              >
                                {product.categoryLabel}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="truncate font-medium">{product.brand}</span>
                            </div>

                            <h3 className="mt-1.5 font-sans text-base font-semibold text-[#111A14] leading-snug">
                              <button
                                type="button"
                                onClick={() => setActiveProduct(product)}
                                className="text-left hover:text-[#16613C] transition-colors"
                              >
                                {product.name}
                              </button>
                            </h3>

                            <p className="mt-1.5 text-xs text-[#43594A] line-clamp-1">
                              {product.shortSpec}
                            </p>
                          </div>
                        </div>

                        <div className="px-5 pb-5 pt-2 flex flex-col gap-3">
                          <div className="flex items-baseline justify-between gap-2 pt-3 border-t border-[#E6EFE9]">
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-lg font-bold font-mono tabular-nums text-[#111A14]">
                                {formatINR(product.priceINR)}
                              </span>
                              <span className="text-xs text-[#43594A]">
                                {product.unit}
                              </span>
                            </div>
                            <span className="text-xs font-semibold text-[#23804D]">
                              {product.availability}
                            </span>
                          </div>

                          <div className="flex items-center gap-2.5">
                            <button
                              type="button"
                              onClick={() => handleAddToOrder(product, 1)}
                              style={
                                isAdded
                                  ? { backgroundColor: '#0E3D26' }
                                  : { backgroundColor: meta.accentHex }
                              }
                              className="flex-1 h-10 px-3.5 inline-flex items-center justify-center gap-1.5 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
                            >
                              {isAdded ? (
                                <>
                                  <Check className="w-4 h-4" />
                                  <span>Added to List</span>
                                </>
                              ) : (
                                <>
                                  <ShoppingBag className="w-4 h-4" />
                                  <span>
                                    {inOrderQty > 0
                                      ? `Add More (${inOrderQty})`
                                      : 'Add to Order'}
                                  </span>
                                </>
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() => setActiveProduct(product)}
                              className="h-10 px-3.5 rounded-lg border border-[#C2D5C8] text-sm font-semibold text-[#0E3D26] hover:bg-[#EEF5F0] transition-colors whitespace-nowrap shrink-0"
                            >
                              Specs
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>
          ))
        )}

        {/* Section 6: 50/50 Split Callback Form + Brand Spotlight */}
        <section id="callback" className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left 50%: Rich Emerald-to-Pine Callback Panel */}
          <div className="bg-gradient-to-b from-[#16613C] to-[#0E3D26] text-white px-6 sm:px-10 lg:px-14 py-14 sm:py-16 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto lg:ml-auto lg:mr-8">
              <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                Request A Callback
              </h2>
              <p className="mt-2 text-sm text-[#D6EDE0] leading-relaxed">
                Need Kirloskar, Taro, or Comet pricing, borewell pipe lengths, or bulk
                nut-bolts &amp; spare parts? Leave your number and we will call right back.
              </p>

              {enquirySent ? (
                <div className="mt-6 p-5 rounded-xl bg-white/10 border border-white/25 space-y-2">
                  <p className="text-sm font-semibold text-white">
                    Callback Request Received
                  </p>
                  <p className="text-sm text-[#DCF0E4]">
                    Thank you! Our Shree Balaji Enterprises desk will call you shortly. For
                    immediate help, call{' '}
                    <a href={SHOP_INFO.phoneHref} className="underline font-mono">
                      {SHOP_INFO.phoneDisplay}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => setEnquirySent(false)}
                    className="mt-2 text-xs font-semibold text-white underline"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="mt-7 space-y-5">
                  <div>
                    <label
                      htmlFor="callback-name"
                      className="block text-xs font-medium text-[#D6EDE0] mb-1"
                    >
                      Your Name *
                    </label>
                    <input
                      id="callback-name"
                      type="text"
                      required
                      value={enquiryName}
                      onChange={(e) => setEnquiryName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full h-10 bg-transparent border-b border-white/40 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="callback-phone"
                      className="block text-xs font-medium text-[#D6EDE0] mb-1"
                    >
                      Mobile Number *
                    </label>
                    <input
                      id="callback-phone"
                      type="tel"
                      required
                      value={enquiryPhone}
                      onChange={(e) => setEnquiryPhone(e.target.value)}
                      placeholder="+91 98260 00000"
                      className="w-full h-10 bg-transparent border-b border-white/40 text-sm font-mono text-white placeholder:text-white/50 focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="callback-item"
                      className="block text-xs font-medium text-[#D6EDE0] mb-1"
                    >
                      Brand / Equipment / Spare Parts Needed
                    </label>
                    <input
                      id="callback-item"
                      type="text"
                      value={enquiryItem}
                      onChange={(e) => setEnquiryItem(e.target.value)}
                      placeholder="e.g. Taro 5 HP Submersible + 2 inch Column Pipe + Nut Bolts"
                      className="w-full h-10 bg-transparent border-b border-white/40 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white"
                    />
                  </div>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <button
                      type="submit"
                      className="h-11 px-6 rounded-lg bg-white text-[#0E3D26] text-sm font-semibold hover:bg-[#E8F3EC] transition-colors whitespace-nowrap"
                    >
                      Send Callback Request
                    </button>

                    <a
                      href={buildWhatsAppUrl(
                        `Hello ${SHOP_INFO.name}, my name is ${
                          enquiryName || 'a customer'
                        } (${enquiryPhone || 'phone'}). Requirement: ${
                          enquiryItem || 'Looking for agricultural machinery & parts pricing.'
                        }`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-11 px-5 inline-flex items-center gap-2 rounded-lg border border-white/45 text-white text-sm font-semibold hover:bg-white/10 transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send on WhatsApp</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right 50%: Soft Mint-White Brand Spotlight */}
          <div className="bg-[#F4F8F5] px-6 sm:px-10 lg:px-14 py-14 sm:py-16 flex flex-col justify-center border-t lg:border-t-0 border-[#D5E3DA]">
            <div className="max-w-lg w-full mx-auto lg:mr-auto lg:ml-8 space-y-5">
              <div>
                <p className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight leading-none">
                  <span className="text-[#0E3D26]">SHREE BALAJI </span>
                  <span className="text-[#23804D]">ENTERPRISES</span>
                </p>
                <p className="mt-2 text-sm text-[#3E5245]">
                  Kirloskar · Taro · Comet · Agricultural Machines · Electric Sprayers ·
                  HDPE &amp; Column Pipes · Nut-Bolts &amp; Genuine Parts
                </p>
              </div>

              <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-white border border-[#D5E3DA] shadow-xs">
                <ResilientImage
                  src={SHOWCASE_PAIR_IMAGE}
                  alt="Agricultural monoblock pumpset and cordless electric sprayer available at Shree Balaji Enterprises"
                  fallbackTitle="Shree Balaji Enterprises Range"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Deep Pine About & Visit Shop */}
        <section
          id="visit-shop"
          className="bg-[#0F4028] text-white border-t border-white/15 py-14 sm:py-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                  Visit Shree Balaji Enterprises
                </h2>

                <p className="text-base text-[#DCF0E4] leading-relaxed">
                  Visit our showroom to compare Kirloskar, Taro, and Comet pumps side by
                  side, inspect electric sprayers and power tillers, or pick up exact
                  pipe coils, brass valves, bearings, and nut-bolts on the spot.
                </p>

                <div className="space-y-3 pt-2 border-t border-white/15 text-sm text-[#DCF0E4]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#9CE0B8] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">
                        {SHOP_INFO.addressLine1}
                      </p>
                      <p>{SHOP_INFO.addressLine2}</p>
                      <p className="text-xs text-[#9CE0B8] mt-0.5">
                        Landmark: {SHOP_INFO.landmark}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#9CE0B8] shrink-0 mt-0.5" />
                    <div>
                      <p>{SHOP_INFO.hoursWeekday}</p>
                      <p>{SHOP_INFO.hoursSunday}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={SHOP_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 px-5 inline-flex items-center gap-2 rounded-lg bg-white text-[#0E3D26] text-sm font-semibold hover:bg-[#E8F3EC] transition-colors whitespace-nowrap"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Get Directions</span>
                  </a>

                  <a
                    href={generalWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 px-5 inline-flex items-center gap-2 rounded-lg bg-[#23804D] text-white border border-white/25 text-sm font-semibold hover:bg-[#1C6B40] transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Shop</span>
                  </a>

                  <a
                    href={SHOP_INFO.phoneHref}
                    className="h-11 px-5 inline-flex items-center gap-2 rounded-lg border border-white/40 text-white text-sm font-semibold hover:bg-white/10 transition-colors whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="font-mono tabular-nums">{SHOP_INFO.phoneDisplay}</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#082618] border border-white/15">
                  <ResilientImage
                    src={HERO_IMAGE}
                    alt="Inside Shree Balaji Enterprises agricultural machinery and irrigation showroom"
                    fallbackTitle="Shree Balaji Enterprises Storefront"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#082618] text-[#DCF0E4] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-white/10">
            <div>
              <p className="font-display text-2xl font-bold uppercase tracking-tight text-white">
                {SHOP_INFO.name}
              </p>
              <p className="mt-2 text-sm text-[#9CE0B8] max-w-xs leading-relaxed">
                Authorised agricultural catalogue for Kirloskar, Taro, Comet, farm
                machines, electric sprayers, pipes, nut-bolts, and spare parts.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#9CE0B8]">
                Catalogue Sections
              </p>
              <ul className="mt-3 grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                {CATALOGUE_SECTIONS.map((sec) => (
                  <li key={sec.id}>
                    <button
                      type="button"
                      onClick={() => handleJumpToSection(sec.id)}
                      className="text-[#DCF0E4] hover:text-white transition-colors text-left"
                    >
                      {sec.shortName}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#9CE0B8]">
                Direct Contact
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a
                    href={SHOP_INFO.phoneHref}
                    className="hover:text-white font-mono tabular-nums transition-colors"
                  >
                    Call: {SHOP_INFO.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={generalWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    WhatsApp Order Desk
                  </a>
                </li>
                <li>
                  <a
                    href={SHOP_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {SHOP_INFO.addressLine1}, Dewas (M.P.)
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9CE0B8]">
            <p>© {new Date().getFullYear()} {SHOP_INFO.name}. All rights reserved.</p>
            <p>{SHOP_INFO.hoursWeekday}</p>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAddToOrder={handleAddToOrder}
      />

      <OrderDrawer
        isOpen={isOrderDrawerOpen}
        items={orderItems}
        onClose={() => setIsOrderDrawerOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearOrder={handleClearOrder}
      />
    </div>
  );
}
