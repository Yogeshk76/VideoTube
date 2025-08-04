import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getAllVideos, resetError } from '@/features/videoSlice';
import VideoCard from '@/components/VideoCard';
import Container from '@/components/uiComponents/Container';

const AllVideosPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { videos, loading, error } = useAppSelector((state) => state.video);

  useEffect(() => {
    dispatch(resetError());
    dispatch(getAllVideos());
  }, [dispatch]);

  if (loading) {
    return (
      <Container>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="text-center py-8">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Recommended Videos</h1>
        <p className="text-gray-400">Discover amazing content from creators around the world</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.isArray(videos) && videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>

      {(!videos || videos.length === 0) && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No videos found</p>
        </div>
      )}
    </Container>
  );
};

export default AllVideosPage;
