import React from 'react';
import { ComponentProps } from '@/types/component';

interface ButtonProps extends ComponentProps {
  style: {
    backgroundColor?: string;
    color?: string;
    borderRadius?: string | number;
    [key: string]: any;
  };
  data: {
    text: string;
    link?: string;
  };
}

const Button: React.FC<ButtonProps> = ({ style, data }) => {
  const handleClick = () => {
    if (data.link) {
      window.open(data.link, '_blank');
    }
  };

  return (
    <button 
      style={style}
      onClick={handleClick}
    >
      {data.text}
    </button>
  );
};

export default Button; 