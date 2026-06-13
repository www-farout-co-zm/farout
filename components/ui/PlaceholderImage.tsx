import { FC } from 'react';

interface PlaceholderImageProps {
  className?: string;
  width?: number;
  height?: number;
  text?: string;
}

const PlaceholderImage: FC<PlaceholderImageProps> = ({
  className = '',
  width = 800,
  height = 600,
  text = 'Image'
}) => {
  return (
    <div 
      className={`bg-gray-200 flex items-center justify-center text-gray-400 ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        maxWidth: '100%',
        aspectRatio: `${width} / ${height}`
      }}
    >
      <div className="text-center p-4">
        <div className="text-lg font-medium">{text}</div>
        <div className="text-sm">{width} × {height}</div>
      </div>
    </div>
  );
};

export default PlaceholderImage;
