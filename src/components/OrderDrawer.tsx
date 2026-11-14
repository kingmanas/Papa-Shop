import { FormEvent, useEffect, useState } from 'react';
import {
  CheckCircle2,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import {
  buildWhatsAppUrl,
  formatINR,
  Product,
  SHOP_INFO,
} from '../data/catalogue';
import { ResilientImage } from './ResilientImage';

export interface OrderItem {
  product: Product;
  quantity: number;
}

interface OrderDrawerProps {
  isOpen: boolean;
  items: OrderItem[];
  onClose: () => void;
  onUpdateQty: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearOrder: () => void;
}

interface SubmittedReceipt {
  orderRef: string;
  customerName: string;
  phone: string;
  location: string;
  fulfillment: 'Shop Pickup' | 'Local Delivery';
  totalINR: number;
  items: OrderItem[];
}

export function OrderDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearOrder,
}: OrderDrawerProps) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [fulfillment, setFulfillment] = useState<'Shop Pickup' | 'Local Delivery'>('Shop Pickup');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [receipt, setReceipt] = useState<SubmittedReceipt | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.priceINR * item.quantity,
    0
  );

  const buildOrderWhatsAppText = () => {
    const lines = items.map(
      (item, idx) =>
        `${idx + 1}. ${item.product.name} x ${item.quantity} = ${formatINR(
          item.product.priceINR * item.quantity
        )}`
    );
    const details = [
      customerName.trim() ? `Name: ${customerName.trim()}` : null,
      phone.trim() ? `Phone: ${phone.trim()}` : null,
      location.trim() ? `Village/City: ${location.trim()}` : null,
      `Mode: ${fulfillment}`,
      notes.trim() ? `Notes: ${notes.trim()}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    return `Hello ${SHOP_INFO.name}, I would like to place an order:\n\n${lines.join(
      '\n'
    )}\n\nEstimated Total: ${formatINR(subtotal)}\n\n${details}`;
  };

  const handleDirectSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    if (!customerName.trim() || phone.trim().length < 10) {
      setErrorMsg('Please enter your full name and a 10-digit mobile number.');
      return;
    }

    setErrorMsg('');
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setReceipt({
      orderRef: `BE-${randomCode}`,
      customerName: customerName.trim(),
      phone: phone.trim(),
      location: location.trim() || 'Dewas Area',
      fulfillment,
      totalINR: subtotal,
      items: [...items],
    });
    onClearOrder();
  };

  const handleClose = () => {
    setReceipt(null);
    setErrorMsg('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-drawer-title"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-lg bg-white h-full flex flex-col border-l border-[#DFE2DC] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-[#E6E8E3] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#16613C]" />
            <h2
              id="order-drawer-title"
              className="text-lg font-bold text-[#181A17] tracking-tight"
            >
              {receipt ? 'Order Request Confirmed' : 'Your Order List'}
            </h2>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close order drawer"
            className="h-10 w-10 inline-flex items-center justify-center rounded-lg border border-[#E6E8E3] text-[#181A17] hover:bg-[#F3F4F1] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {receipt ? (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-[#EDF4EF] border border-[#C6DEC9] space-y-2">
                <div className="flex items-center gap-2 text-[#16613C] font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>
                    Order #{receipt.orderRef} Confirmed — Preparing For {receipt.fulfillment}
                  </span>
                </div>
                <p className="text-sm text-[#314235]">
                  Thank you, {receipt.customerName}. Our shop team will call you on{' '}
                  <span className="font-mono font-medium">{receipt.phone}</span> shortly to
                  confirm stock and dispatch timing.
                </p>
              </div>

              <div className="border border-[#E6E8E3] rounded-xl divide-y divide-[#E6E8E3]">
                {receipt.items.map((item) => (
                  <div
                    key={item.product.id}
                    className="px-4 py-3 flex items-center justify-between gap-4 text-sm"
                  >
                    <div>
                      <p className="font-medium text-[#181A17]">{item.product.name}</p>
                      <p className="text-xs text-[#5A6156]">
                        Qty: {item.quantity} × {formatINR(item.product.priceINR)}
                      </p>
                    </div>
                    <span className="font-mono font-semibold tabular-nums text-[#181A17]">
                      {formatINR(item.product.priceINR * item.quantity)}
                    </span>
                  </div>
                ))}
                <div className="px-4 py-3.5 bg-[#F6F7F4] flex items-center justify-between font-semibold text-sm">
                  <span className="text-[#181A17]">Estimated Total</span>
                  <span className="font-mono text-base tabular-nums text-[#181A17]">
                    {formatINR(receipt.totalINR)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={buildWhatsAppUrl(
                    `Hello ${SHOP_INFO.name}, my order reference is #${receipt.orderRef} (${receipt.customerName}, ${receipt.phone}). Total: ${formatINR(receipt.totalINR)}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-11 px-4 inline-flex items-center justify-center gap-2 rounded-lg bg-[#16613C] text-white text-sm font-semibold hover:bg-[#164225] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Reference on WhatsApp</span>
                </a>

                <a
                  href={SHOP_INFO.phoneHref}
                  className="w-full h-11 px-4 inline-flex items-center justify-center gap-2 rounded-lg border border-[#D4D7D0] text-[#181A17] text-sm font-semibold hover:bg-[#F3F4F1] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Shop ({SHOP_INFO.phoneDisplay})</span>
                </a>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-12 h-12 rounded-xl bg-[#F3F4F1] flex items-center justify-center text-[#5A6156] mb-4">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <p className="text-base font-semibold text-[#181A17]">
                Your order list is empty
              </p>
              <p className="mt-1.5 text-sm text-[#5A6156] max-w-xs">
                Browse machines, submersibles, generators, pipes, or tools and click
                &ldquo;Add to Order&rdquo; to prepare a quick order.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-6 h-10 px-5 rounded-lg bg-[#16613C] text-white text-sm font-semibold hover:bg-[#164225] transition-colors"
              >
                Browse Catalogue
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <ul className="divide-y divide-[#E6E8E3] border-b border-[#E6E8E3]">
                {items.map(({ product, quantity }) => (
                  <li key={product.id} className="py-4 flex gap-4">
                    <div className="w-20 h-16 rounded-lg overflow-hidden bg-[#F3F4F1] shrink-0 border border-[#E6E8E3]">
                      <ResilientImage
                        src={product.image}
                        alt={product.name}
                        fallbackTitle={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-[#181A17] truncate">
                          {product.name}
                        </p>
                        <button
                          type="button"
                          aria-label={`Remove ${product.name}`}
                          onClick={() => onRemoveItem(product.id)}
                          className="text-[#6B7266] hover:text-[#B91C1C] p-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-[#5A6156] mt-0.5">
                        {formatINR(product.priceINR)} {product.unit}
                      </p>
                      <div className="mt-2.5 flex items-center justify-between">
                        <div className="inline-flex items-center border border-[#D4D7D0] rounded-md">
                          <button
                            type="button"
                            aria-label={`Decrease quantity for ${product.name}`}
                            onClick={() =>
                              quantity > 1
                                ? onUpdateQty(product.id, quantity - 1)
                                : onRemoveItem(product.id)
                            }
                            className="w-8 h-8 inline-flex items-center justify-center hover:bg-[#F3F4F1] text-[#181A17]"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-mono font-semibold tabular-nums">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            aria-label={`Increase quantity for ${product.name}`}
                            onClick={() => onUpdateQty(product.id, quantity + 1)}
                            className="w-8 h-8 inline-flex items-center justify-center hover:bg-[#F3F4F1] text-[#181A17]"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-mono font-semibold tabular-nums text-[#181A17]">
                          {formatINR(product.priceINR * quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between text-base font-semibold text-[#181A17]">
                <span>Estimated Total</span>
                <span className="font-mono text-lg tabular-nums">
                  {formatINR(subtotal)}
                </span>
              </div>
              <p className="text-xs text-[#5A6156] -mt-4">
                Pay on shop pickup, Cash on Delivery (local), or UPI at dispatch.
              </p>

              <form onSubmit={handleDirectSubmit} className="space-y-4 pt-2 border-t border-[#E6E8E3]">
                <h3 className="text-sm font-semibold text-[#181A17]">
                  Customer Details For Order
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="order-name"
                      className="block text-xs font-medium text-[#4A5046] mb-1"
                    >
                      Your Name *
                    </label>
                    <input
                      id="order-name"
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ramesh Patel"
                      className="w-full h-10 px-3 rounded-lg border border-[#D4D7D0] text-sm text-[#181A17] focus:outline-none focus:border-[#16613C]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="order-phone"
                      className="block text-xs font-medium text-[#4A5046] mb-1"
                    >
                      Mobile Number *
                    </label>
                    <input
                      id="order-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98260 00000"
                      className="w-full h-10 px-3 rounded-lg border border-[#D4D7D0] text-sm font-mono text-[#181A17] focus:outline-none focus:border-[#16613C]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="order-location"
                    className="block text-xs font-medium text-[#4A5046] mb-1"
                  >
                    Village / Tehsil / City
                  </label>
                  <input
                    id="order-location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Tonk Khurd, Dewas"
                    className="w-full h-10 px-3 rounded-lg border border-[#D4D7D0] text-sm text-[#181A17] focus:outline-none focus:border-[#16613C]"
                  />
                </div>

                <div>
                  <span className="block text-xs font-medium text-[#4A5046] mb-1.5">
                    Order Mode
                  </span>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-[#F3F4F1] rounded-lg">
                    {(['Shop Pickup', 'Local Delivery'] as const).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setFulfillment(mode)}
                        className={`h-9 rounded-md text-xs font-semibold transition-colors whitespace-nowrap ${
                          fulfillment === mode
                            ? 'bg-white text-[#181A17] shadow-xs'
                            : 'text-[#5A6156] hover:text-[#181A17]'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="order-notes"
                    className="block text-xs font-medium text-[#4A5046] mb-1"
                  >
                    Borewell Depth / Pipe Size / Notes (Optional)
                  </label>
                  <textarea
                    id="order-notes"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any specific HP, voltage, or fitting details..."
                    className="w-full px-3 py-2 rounded-lg border border-[#D4D7D0] text-sm text-[#181A17] focus:outline-none focus:border-[#16613C]"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs font-medium text-[#B91C1C]" role="alert">
                    {errorMsg}
                  </p>
                )}

                <div className="space-y-2.5 pt-1">
                  <a
                    href={buildWhatsAppUrl(buildOrderWhatsAppText())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-11 px-4 inline-flex items-center justify-center gap-2 rounded-lg bg-[#16613C] text-white text-sm font-semibold hover:bg-[#164225] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Order on WhatsApp</span>
                  </a>

                  <button
                    type="submit"
                    className="w-full h-11 px-4 inline-flex items-center justify-center gap-2 rounded-lg border border-[#181A17] text-[#181A17] text-sm font-semibold hover:bg-[#F3F4F1] transition-colors"
                  >
                    <span>Confirm Order Request Online</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
