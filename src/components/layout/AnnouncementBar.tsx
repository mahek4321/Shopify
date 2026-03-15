const text =
  "✦ FREE SHIPPING ON ORDERS OVER $60 · USE CODE LUMINA15 FOR 15% OFF · SUBSCRIBE & SAVE 20% ✦";

export function AnnouncementBar() {
  return (
    <div className="overflow-hidden bg-plum py-2">
      <div className="announcement-track flex whitespace-nowrap text-[10px] font-medium tracking-[0.2em] text-champagne uppercase">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="px-10 flex-shrink-0">{text}</span>
        ))}
      </div>
    </div>
  );
}
