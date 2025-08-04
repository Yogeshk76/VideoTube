import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getAllVideos, resetError } from '@/features/videoSlice';
import VideoCard from '@/components/VideoCard';
import Container from '@/components/uiComponents/Container';

const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const dispatch = useAppDispatch();
  const { videos, loading, error } = useAppSelector((state) => state.video);
  const [filteredVideos, setFilteredVideos] = useState<any[]>([]);

  useEffect(() => {
    dispatch(resetError());
    dispatch(getAllVideos());
  }, [dispatch]);

  useEffect(() => {
    if (videos.length > 0 && query) {
      const filtered = videos.filter(video =>
        video.title.toLowerCase().includes(query.toLowerCase()) ||
        video.description.toLowerCase().includes(query.toLowerCase()) ||
        (typeof video.owner === 'object' && video.owner.fullName.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredVideos(filtered);
    } else {
      setFilteredVideos(videos);
    }
  }, [videos, query]);

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
        <h1 className="text-2xl font-bold text-white mb-2">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-400">
          Found {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''}
        </p>
      </div>

      {filteredVideos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg mb-4">No videos found for "{query}"</p>
          <p className="text-gray-500 text-sm">Try searching for something else</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default SearchResultsPage; 