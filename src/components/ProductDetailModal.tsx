import { useEffect, useState } from 'react';
import { MessageCircle, Minus, Phone, Plus, ShoppingBag, X } from 'lucide-react';
import {
  buildWhatsAppUrl,
  formatINR,
  Product,
  SHOP_INFO,
} from '../data/catalogue';
import { ResilientImage } from './ResilientImage';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToOrder: (product: Product, quantity: number) => void;
}

export function ProductDetailModal({
  product,
  onClose,
  onAddToOrder,
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const whatsappMessage = `Hello ${SHOP_INFO.name}, I would like to order:\n- ${product.name} (${product.brand})\n- Quantity: ${quantity}\n- Listed Price: ${formatINR(product.priceINR)} ${product.unit}\n\nPlease share availability and final bill.`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-[#DFE2DC] rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#DFE2DC] bg-white text-[#181A17] hover:bg-[#F3F4F1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16613C] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
          <div className="bg-[#F3F4F1] p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#DFE2DC]">
            <div className="w-full aspect-[4/3] overflow-hidden rounded-lg bg-[#ECEEE9]">
              <ResilientImage
                src={product.image}
                alt={product.name}
                fallbackTitle={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#5A6156]">
                <span className="uppercase tracking-wider">{product.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{product.brand}</span>
              </div>

              <h2
                id="product-modal-title"
                className="mt-2 text-2xl font-bold text-[#181A17] tracking-tight text-balance"
              >
                {product.name}
              </h2>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono tabular-nums text-[#181A17]">
                  {formatINR(product.priceINR)}
                </span>
                <span className="text-sm text-[#5A6156]">{product.unit}</span>
                <span className="text-xs text-[#16613C] font-medium ml-auto">
                  {product.availability}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#4A5046]">
                {product.description}
              </p>

              <dl className="mt-6 border-t border-[#E6E8E3] divide-y divide-[#E6E8E3]">
                {product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="py-2.5 flex items-center justify-between gap-4 text-sm"
                  >
                    <dt className="text-[#5A6156]">{spec.label}</dt>
                    <dd className="font-medium text-[#181A17] text-right tabular-nums">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="space-y-3 pt-2 border-t border-[#E6E8E3]">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center border border-[#D4D7D0] rounded-lg bg-white">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="h-11 w-11 inline-flex items-center justify-center text-[#181A17] hover:bg-[#F3F4F1] rounded-l-lg transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-mono font-semibold tabular-nums text-[#181A17]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="h-11 w-11 inline-flex items-center justify-center text-[#181A17] hover:bg-[#F3F4F1] rounded-r-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onAddToOrder(product, quantity);
                    onClose();
                  }}
                  className="flex-1 h-11 px-4 inline-flex items-center justify-center gap-2 rounded-lg bg-[#16613C] text-white text-sm font-semibold hover:bg-[#0D3823] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16613C] transition-colors whitespace-nowrap"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Order List</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={buildWhatsAppUrl(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-4 inline-flex items-center justify-center gap-2 rounded-lg border border-[#16613C] text-[#16613C] text-sm font-semibold hover:bg-[#EDF4EF] transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Order</span>
                </a>

                <a
                  href={SHOP_INFO.phoneHref}
                  className="h-11 px-4 inline-flex items-center justify-center gap-2 rounded-lg border border-[#D4D7D0] text-[#181A17] text-sm font-semibold hover:bg-[#F3F4F1] transition-colors whitespace-nowrap"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Shop</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
