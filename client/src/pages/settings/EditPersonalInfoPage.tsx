import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateAccountDetails } from '@/features/userSlice';
import Button from '@/components/uiComponents/Button';
import Input from '@/components/uiComponents/Input';
import type { UpdateAccountDetailsInput } from '@/types/user.types';

const EditPersonalInfoPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.user);

  const { register, handleSubmit, formState: { errors } } = useForm<UpdateAccountDetailsInput>({
    defaultValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
    }
  });

  const onSubmit = async (data: UpdateAccountDetailsInput) => {
    try {
      await dispatch(updateAccountDetails(data)).unwrap();
    } catch (error) {
      // Error handled in the slice
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Edit Personal Information</h2>

      {error && (
        <div className="mb-6 p-4 bg-red-900 border border-red-700 rounded-lg">
          <p className="text-red-300">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-gray-300 mb-2">
            Full Name*
          </label>
          <Input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            {...register("fullName", {
              required: "Full name is required",
              minLength: {
                value: 2,
                message: "Full name must be at least 2 characters"
              }
            })}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-300 mb-2">
            Email*
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600"
          >
            {loading ? "Updating..." : "Update Information"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditPersonalInfoPage;

