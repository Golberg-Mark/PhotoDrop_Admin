import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { getAlbumsAction } from '@/store/actions/userActions';
import { selectAlbums } from '@/store/selectors/userSelector';
import AlbumItem from '@/components/Album/AlbumItem';
import PageWrapper from '@/components/PageWrapper';
import styled from 'styled-components';
import AlbumsSkeleton from '@/components/AlbumsSkeleton';

const Albums = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const albums = useSelector(selectAlbums);

  const onAlbumClick = (id: string) => {
    navigate(`/album/${id}`);
  };

  useEffect(() => {
    if (!albums) dispatch(getAlbumsAction());
  }, []);

  return (
    <PageWrapper>
      {albums ? (
        <>
          {albums.length ? (
            <>
              {albums.map((el, i) => (
                  <AlbumItem
                    key={`${el.name}_${i}`}
                    id={el.id}
                    name={el.name}
                    location={el.location}
                    date={el.date}
                    onClick={() => onAlbumClick(el.id)}
                  />
                ))}
            </>
            ) : <EmptyAlbums>There is no album</EmptyAlbums>}
        </>
      ) : <AlbumsSkeleton />}
    </PageWrapper>
  );
};

const EmptyAlbums = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 60px);
  font-size: 24px;
  font-weight: 500;
`;

export default Albums;
