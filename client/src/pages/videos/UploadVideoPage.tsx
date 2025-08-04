import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { publishAVideo, resetError } from '@/features/videoSlice';
import { useNavigate } from 'react-router-dom';
import Container from '@/components/uiComponents/Container';
import Button from '@/components/uiComponents/Button';
import Input from '@/components/uiComponents/Input';
import type { PublishAVideoInput } from '@/types/video.types';

const UploadVideoPage: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string>('');
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.video);

  const { register, handleSubmit, formState: { errors } } = useForm<PublishAVideoInput>();

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const url = URL.createObjectURL(file);
      setThumbnailPreview(url);
    }
  };

  const onSubmit = async (data: PublishAVideoInput) => {
    if (!videoFile || !thumbnailFile) {
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('videoFile', videoFile);
    formData.append('thumbnail', thumbnailFile);

    try {
      await dispatch(publishAVideo(formData as any)).unwrap();
      navigate('/my-channel');
    } catch (error) {
      // Error handled in the slice
    }
  };

  return (
    <Container>
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Upload Video</h1>
          <p className="text-gray-400">Share your video with the world</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900 border border-red-700 rounded-lg">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Video Upload */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Video File</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Select Video File</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
              </div>

              {videoPreview && (
                <div className="mt-4">
                  <video
                    src={videoPreview}
                    controls
                    className="w-full max-w-md rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Thumbnail</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Select Thumbnail</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
              </div>

              {thumbnailPreview && (
                <div className="mt-4">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="w-full max-w-md rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Video Details */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Video Details</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-gray-300 mb-2">
                  Title*
                </label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter video title"
                  {...register("title", {
                    required: "Title is required",
                    minLength: {
                      value: 3,
                      message: "Title must be at least 3 characters"
                    }
                  })}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-gray-300 mb-2">
                  Description*
                </label>
                <textarea
                  id="description"
                  rows={6}
                  placeholder="Enter video description"
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 10,
                      message: "Description must be at least 10 characters"
                    }
                  })}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              onClick={() => navigate('/my-channel')}
              className="bg-gray-600 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !videoFile || !thumbnailFile}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600"
            >
              {loading ? "Uploading..." : "Upload Video"}
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default UploadVideoPage; 