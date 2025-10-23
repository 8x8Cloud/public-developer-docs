import React from 'react';

/**
 * PreviewColor component displays a circular color preview.
 *
 * @param {Object} props - Component props
 * @param {string} props.color - Hex color code (e.g., "#0056e0" or "#FFFFFF")
 * @returns {JSX.Element} Circular color preview
 *
 * @example
 * <PreviewColor color="#0056e0" />
 *
 * @example
 * // White color will automatically get a border
 * <PreviewColor color="#FFFFFF" />
 */
export default function PreviewColor({ color }) {
  // Check if color is white (case-insensitive)
  const isWhite = color.toUpperCase() === '#FFFFFF';

  const style = {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    backgroundColor: color,
    borderRadius: '50%',
    verticalAlign: 'middle',
    marginRight: '8px',
    ...(isWhite && { border: '1px solid #ccc' })
  };

  return <span style={style}></span>;
}
