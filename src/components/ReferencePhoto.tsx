import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function ReferencePhoto({ src, alt, caption, className = '', sizes = '100vw', priority = false }: Props) {
  return (
    <div className={`reference-photo ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="reference-photo-image" />
      <svg className="reference-photo-drawing" viewBox="0 0 240 150" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M18 126V64l51-30 52 30v62M69 126V75l52-11 50 28v34M121 126V64l46-26 52 26v62M18 64h103m0 0 46-26m-46 26v62m-52 0V75m52 0 50 17v34" />
          <path d="M10 137h212M12 132v10m204-10v10M28 56V44m84 12V44" strokeDasharray="3 4" />
        </g>
      </svg>
      {caption && <span className="reference-photo-caption">{caption}</span>}
    </div>
  );
}
