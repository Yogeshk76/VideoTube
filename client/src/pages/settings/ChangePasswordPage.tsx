import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { changeCurrentPassword } from '@/features/authSlice';
import Button from '@/components/uiComponents/Button';
import Input from '@/components/uiComponents/Input';
import type { ChangePasswordInput } from '@/types/auth.types';

const ChangePasswordPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ChangePasswordInput>();

  const onSubmit = async (data: ChangePasswordInput) => {
    try {
      await dispatch(changeCurrentPassword(data)).unwrap();
      reset();
    } catch (error) {
      // Error handled in the slice
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Change Password</h2>

      {error && (
        <div className="mb-6 p-4 bg-red-900 border border-red-700 rounded-lg">
          <p className="text-red-300">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="oldPassword" className="block text-gray-300 mb-2">
            Current Password*
          </label>
          <Input
            id="oldPassword"
            type="password"
            placeholder="Enter your current password"
            {...register("oldPassword", {
              required: "Current password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
          />
          {errors.oldPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.oldPassword.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="newPassword" className="block text-gray-300 mb-2">
            New Password*
          </label>
          <Input
            id="newPassword"
            type="password"
            placeholder="Enter your new password"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
          )}
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600"
          >
            {loading ? "Changing Password..." : "Change Password"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordPage;

