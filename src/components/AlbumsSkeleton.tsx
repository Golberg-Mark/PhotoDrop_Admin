import React from 'react'
import ContentLoader from 'react-content-loader'
import styled from 'styled-components';

const AlbumsSkeleton: React.FC<any> = (props) => {
  return (
    <StyledSkeleton
      height={1200}
      backgroundColor="#d9d9d9"
      foregroundColor="#ebeaea"
      {...props}
    >
      <rect x="103" y="12" rx="3" ry="3" width="123" height="7" />
      <rect x="102" y="152" rx="3" ry="3" width="171" height="6" />
      <circle cx="44" cy="42" r="38" />
      <circle cx="44" cy="147" r="38" />
      <circle cx="44" cy="251" r="38" />
      <rect x="105" y="117" rx="3" ry="3" width="123" height="7" />
      <rect x="104" y="222" rx="3" ry="3" width="123" height="7" />
      <rect x="105" y="48" rx="3" ry="3" width="171" height="6" />
      <rect x="104" y="257" rx="3" ry="3" width="171" height="6" />
    </StyledSkeleton>
  )
};

const StyledSkeleton = styled(ContentLoader)`
  display: block;
  margin: 0 auto;
  padding-top: 20px;
  max-width: 800px;
  width: 100%;
`;

export default AlbumsSkeleton;
