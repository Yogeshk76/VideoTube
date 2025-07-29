// React Router
import { Routes, Route } from "react-router-dom";

// Layouts
import AppLayout from "@/layouts/AppLayout";
import RequireAuth from "@/layouts/RequireAuth";

// Auth Pages
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";

// Legal Pages
import PrivacyPolicyPage from "@/pages/legal/PrivacyPolicyPage";
import TermsConditionsPage from "@/pages/legal/TermsConditionsPage";

// Video Pages
import AllVideosPage from "@/pages/videos/AllVideosPage";
import VideoDetailPage from "@/pages/videos/VideoDetailPage";

// Playlist Pages
import PlaylistDetailsPage from "@/pages/playlists/PlaylistDetailsPage";
import PlaylistVideoPage from "@/pages/playlists/PlaylistVideoPage";

// Channel (Public)
import ChannelLayout from "@/pages/channel/ChannelLayout";
import ChannelVideos from "@/pages/channel/ChannelVideos";
import ChannelPlaylists from "@/pages/channel/ChannelPlaylists";
import ChannelTweets from "@/pages/channel/ChannelTweets";
import ChannelSubscribers from "@/pages/channel/ChannelSubscribers";

// My Channel (Protected)
import SettingsLayout from "@/pages/settings/SettingsLayout";
import MyChannelLayout from "@/pages/myChannel/MyChannelLayout";
import MyVideos from "@/pages/myChannel/MyVideos";
import MyPlaylists from "@/pages/myChannel/MyPlaylists";
import MyTweets from "@/pages/myChannel/MyTweets";

// Settings (Protected)
import ChangePasswordPage from "@/pages/settings/ChangePasswordPage";
import EditPersonalInfoPage from "@/pages/settings/EditPersonalInfoPage";
import EditChannelInfoPage from "@/pages/settings/EditChannelInfoPage";

// Admin (Protected)
import AdminDashboard from "@/pages/admin/AdminDashboard";

// Fallback / 404
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";


// Main App Routes
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes under AppLayout */}
      <Route path="/" element={<AppLayout />}>
        <Route index element={<AllVideosPage />} />
        <Route path="videos" element={<AllVideosPage />} />
        <Route path="video/:id" element={<VideoDetailPage />} />
        <Route path="playlist/:id" element={<PlaylistDetailsPage />} />
        <Route path="video/:videoId/playlist/:id" element={<PlaylistVideoPage />} />
        
        {/* Public Legal Pages */}
        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="terms-conditions" element={<TermsConditionsPage />} />

        {/* Channel Pages */}
        <Route path="channel/:channelId" element={<ChannelLayout />}>
          <Route index element={<ChannelVideos />} />
          <Route path="videos" element={<ChannelVideos />} />
          <Route path="playlists" element={<ChannelPlaylists />} />
          <Route path="tweets" element={<ChannelTweets />} />
          <Route path="subscribers" element={<ChannelSubscribers />} />
        </Route>

        {/* Auth Pages */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="my-channel" element={<MyChannelLayout />}>
            <Route index element={<MyVideos />} />
            <Route path="videos" element={<MyVideos />} />
            <Route path="playlists" element={<MyPlaylists />} />
            <Route path="tweets" element={<MyTweets />} />
          </Route>

          <Route path="settings" element={<SettingsLayout />}>
            <Route index element={<EditPersonalInfoPage />} />
            <Route path="edit-personal-info" element={<EditPersonalInfoPage />} />
            <Route path="edit-channel-info" element={<EditChannelInfoPage />} />
            <Route path="change-password" element={<ChangePasswordPage />} />
          </Route>

          <Route path="admin" element={<AdminDashboard />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

