import { useState } from 'react';
import { X, Facebook, Linkedin, Mail, Link2, MessageCircle, Check } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
  thumbnailUrl?: string;
  advertiserName: string;
}

export default function ShareModal({ isOpen, onClose, url, title, thumbnailUrl, advertiserName }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareText = `${url.toUpperCase()}\n${advertiserName} : regarde cette e-card !`;
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(shareText);
  const encodedTitle = encodeURIComponent(title);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareLinks = [
    {
      name: 'Facebook',
      icon: <Facebook className="w-6 h-6" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
    },
    {
      name: 'X / Twitter',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: `https://twitter.com/intent/tweet?text=${encodedText}`,
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-6 h-6" />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: 'WhatsApp',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      href: `https://wa.me/?text=${encodedText}`,
    },
    {
      name: 'Pinterest',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z" />
        </svg>
      ),
      href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}${thumbnailUrl ? `&media=${encodeURIComponent(thumbnailUrl)}` : ''}`,
    },
  ];

  const emailSubject = encodeURIComponent(`${advertiserName} — E-Cards Corporate`);
  const emailBody = encodeURIComponent(`${url.toUpperCase()}\n\n${advertiserName} : regarde cette e-card !\n\nDécouvre-la sur E-Cards Corporate`);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop sombre */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-md bg-[#1a1a1a] border border-[#C5A55A]/40 rounded-lg shadow-2xl shadow-[#C5A55A]/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#C5A55A]/20">
          <h2 className="font-display text-xl text-[#C5A55A] tracking-wide">Partager</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-[#C5A55A] transition-colors duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnail preview */}
        {thumbnailUrl && (
          <div className="px-6 pt-5">
            <div className="rounded overflow-hidden border border-[#C5A55A]/20">
              <img
                src={thumbnailUrl}
                alt={advertiserName}
                className="w-full h-32 object-cover"
              />
            </div>
            <p className="mt-2 text-sm text-gray-400 text-center truncate">{advertiserName}</p>
          </div>
        )}

        {/* Social media grid */}
        <div className="px-6 py-5">
          <div className="grid grid-cols-4 gap-4">
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-12 h-12 rounded-full border border-[#C5A55A]/30 bg-[#C5A55A]/10 flex items-center justify-center text-[#C5A55A] group-hover:bg-[#C5A55A] group-hover:text-[#1a1a1a] transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#C5A55A]/30">
                  {link.icon}
                </div>
                <span className="text-xs text-gray-400 group-hover:text-[#C5A55A] transition-colors duration-300 text-center leading-tight">
                  {link.name}
                </span>
              </a>
            ))}

            {/* Email */}
            <a
              href={`mailto:?subject=${emailSubject}&body=${emailBody}`}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-12 h-12 rounded-full border border-[#C5A55A]/30 bg-[#C5A55A]/10 flex items-center justify-center text-[#C5A55A] group-hover:bg-[#C5A55A] group-hover:text-[#1a1a1a] transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#C5A55A]/30">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-xs text-gray-400 group-hover:text-[#C5A55A] transition-colors duration-300 text-center leading-tight">
                Email
              </span>
            </a>
          </div>
        </div>

        {/* Copy link section */}
        <div className="px-6 pb-6">
          <div className="flex items-center gap-2 bg-[#111] border border-[#C5A55A]/20 rounded-lg overflow-hidden">
            <div className="flex-1 px-4 py-3 text-sm text-gray-400 truncate">
              {url}
            </div>
            <button
              onClick={handleCopyLink}
              className={`px-5 py-3 text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                copied
                  ? 'bg-green-600 text-white'
                  : 'bg-[#C5A55A] text-[#1a1a1a] hover:bg-[#d4b76a]'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copié !
                </>
              ) : (
                <>
                  <Link2 className="w-4 h-4" />
                  Copier
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
