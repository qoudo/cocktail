import React, { useEffect, useRef, useState } from 'react';

interface LazyImageProps {
  /** Источник изображения */
  src: string;
  /** Альтернативный текст для изображения */
  alt: string;
  /** Дополнительный CSS-класс */
  className?: string;
}

/**
 * Компонент для отложенной ("ленивой") загрузки изображений.
 * @param {LazyImageProps} props - Пропсы компонента.
 */
export const LazyImage = ({ src, alt, className }: LazyImageProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : ''}
      alt={alt}
      className={className}
    />
  );
};
