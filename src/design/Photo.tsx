import React from 'react';
import { C, TYPE, STROKE, FILL } from './tokens';
import { Property } from '../art/properties';

/**
 * A photographic frame.
 *
 * When the property has a verified photograph it is shown, cropped with
 * object-fit so its proportions are preserved and the crop is intentional.
 * When it does not, the frame renders an on-brand placeholder rather than
 * an unrelated building: a terracotta-tinted field, a light architectural
 * mark, the property name, and an explicit note that the image is pending.
 */
export const PhotoFrame: React.FC<{
  property: Property;
  w: number;
  h: number;
  /** Where the crop favours, e.g. '50% 40%'. */
  focus?: string;
  style?: React.CSSProperties;
  small?: boolean;
  /** Use a specific shot of this property instead of its lead photograph. */
  src?: string;
}> = ({ property, w, h, focus = '50% 50%', style, small = false, src }) => {
  const chosen = src ?? property.src;
  return (
    <div
      style={{
        width: w,
        height: h,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: C.ivoryDeep,
        border: `1px solid rgba(145,71,47,0.28)`,
        flex: '0 0 auto',
        ...style,
      }}
    >
      {chosen ? (
        <img
          src={chosen}
          alt={property.label}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: focus, display: 'block' }}
        />
      ) : (
        <Placeholder label={property.label} w={w} h={h} small={small} />
      )}
    </div>
  );
};

/**
 * A framed image that is not a property photograph: illustrative material
 * standing in for the kind of footage a reel would carry. It is never
 * captioned with a property name, because it does not document one.
 */
export const ImageFrame: React.FC<{
  src: string;
  alt: string;
  w: number;
  h: number;
  focus?: string;
  style?: React.CSSProperties;
}> = ({ src, alt, w, h, focus = '50% 50%', style }) => (
  <div
    style={{
      width: w,
      height: h,
      overflow: 'hidden',
      position: 'relative',
      backgroundColor: C.ivoryDeep,
      border: `1px solid rgba(145,71,47,0.28)`,
      flex: '0 0 auto',
      ...style,
    }}
  >
    <img
      src={src}
      alt={alt}
      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: focus, display: 'block' }}
    />
  </div>
);

/** A plain frame that takes arbitrary content, used for the format frames. */
export const Frame: React.FC<{
  w: number;
  h: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ w, h, children, style }) => (
  <div
    style={{
      width: w,
      height: h,
      overflow: 'hidden',
      position: 'relative',
      backgroundColor: C.ivoryDeep,
      border: `1px solid rgba(145,71,47,0.28)`,
      flex: '0 0 auto',
      ...style,
    }}
  >
    {children}
  </div>
);

const Placeholder: React.FC<{ label: string; w: number; h: number; small: boolean }> = ({
  label,
  w,
  h,
  small,
}) => {
  const u = Math.min(w, h);
  return (
    <div style={{ position: 'absolute', inset: 0, background: FILL.shade2 }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <g stroke={C.terracotta} strokeWidth={STROKE.fine} fill="none" opacity={0.42}>
          <path d={`M${w * 0.5 - u * 0.24},${h * 0.72} L${w * 0.5 - u * 0.24},${h * 0.38} L${w * 0.5 - u * 0.04},${h * 0.26} L${w * 0.5 + u * 0.16},${h * 0.38} L${w * 0.5 + u * 0.16},${h * 0.72}`} />
          <path d={`M${w * 0.5 - u * 0.24},${h * 0.72} L${w * 0.5 + u * 0.16},${h * 0.72}`} />
          <path d={`M${w * 0.5 - u * 0.12},${h * 0.72} L${w * 0.5 - u * 0.12},${h * 0.52} L${w * 0.5 + u * 0.04},${h * 0.52} L${w * 0.5 + u * 0.04},${h * 0.72}`} />
        </g>
      </svg>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: small ? 10 : 16,
          textAlign: 'center',
          fontFamily: TYPE.family,
          fontSize: small ? 12 : 14,
          fontWeight: TYPE.weightBold,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: C.terracottaDeep,
          opacity: 0.62,
        }}
      >
        {small ? 'Photograph pending' : `${label} · photograph pending`}
      </div>
    </div>
  );
};
