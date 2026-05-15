import React from 'react';
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from '@/features/api/authApi';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

const Profile = () => {
  const reduxUser = useSelector((state) => state.auth.user);

  const { data, isLoading } = useGetUserProfileQuery();

  const [
    updateUserProfile,
    {
      data: updateUserProfileData,
      isLoading: updateUserProfileIsLoading,
      error: isSuccess,
    },
  ] = useUpdateUserProfileMutation();

  const user = data?.user || reduxUser;

  const [isEditing, setIsEditing] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
  });

  const [avatar, setAvatar] = React.useState(null);
  const [tempAvatar, setTempAvatar] = React.useState(null);

  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
      });
      setAvatar(user.photoUrl || null);
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setTempAvatar(file);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const data = new FormData();

      data.append('name', formData.name);
      data.append('email', formData.email);

      if (tempAvatar) {
        data.append('avatar', tempAvatar);
      }

      await updateUserProfile(data).unwrap();
      toast.success('Profile updated successfully');
      setTempAvatar(null);
      setIsEditing(false);
    } catch (err) {
      toast.error(err?.data?.message || 'Update failed');
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
      });

      setAvatar(user.profileImage || null);
    }

    setTempAvatar(null);
    setIsEditing(false);
  };

  // CRASH GUARDS
  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center mt-10">Please login</div>;
  }

  // safe values
  const userName = user?.name || 'User';
  const userEmail = user?.email || 'No email';
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <label className={isEditing ? 'cursor-pointer' : ''}>
            <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
              {tempAvatar ? (
                <img
                  src={URL.createObjectURL(tempAvatar)}
                  className="w-full h-full object-cover"
                />
              ) : avatar ? (
                <img src={avatar} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xl font-bold">{userInitial}</span>
              )}
            </div>

            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            )}
          </label>
        </div>

        <div>
          <h2 className="text-xl font-bold">{userName}</h2>
          <p className="text-gray-500">{userEmail}</p>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-500">Name</label>
          {isEditing ? (
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mt-1"
            />
          ) : (
            <p className="font-medium">{userName}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-500">Email</label>
          {isEditing ? (
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mt-1"
            />
          ) : (
            <p className="font-medium">{userEmail}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-500">Role</label>
          <p className="font-medium">{user?.role || 'User'}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              disabled={updateUserProfileIsLoading}
              className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updateUserProfileIsLoading ? 'Saving...' : 'Save'}
            </button>

            <button
              onClick={handleCancel}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
