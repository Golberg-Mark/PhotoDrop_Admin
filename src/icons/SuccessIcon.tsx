import React from 'react';

const SuccessIcon = () => {
  return (
		<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
			viewBox="0 0 50 50" width="30px" height="30px">
				<circle style={{ fill: '#25AE88' }} cx="25" cy="25" r="25"/>
				<polyline style={{ fill: 'none', stroke: '#FFF', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10' }}
				          points="38,15 22,33 12,25 "
				/>
		</svg>
	);
};

export default SuccessIcon;
