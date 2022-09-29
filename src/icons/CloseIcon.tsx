import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLOrSVGElement> {
  stroke?: string
}

const CloseIcon: React.FC<Props> = ({ stroke = '#fff', onClick }) => {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClick} >
      <path d="M16.1996 0.713462L1.11914 15.7939M16.2932 15.7933L1.21281 0.712891" stroke={stroke} strokeWidth="1.5"/>
    </svg>
  );
};

export default CloseIcon;
