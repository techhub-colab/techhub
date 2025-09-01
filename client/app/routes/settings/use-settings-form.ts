import { isAxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { type FieldValues, useForm, type UseFormProps } from 'react-hook-form';
import { toast } from 'sonner';
import { updateMe } from '~/.client/services/api/user';
import { useAuth } from '~/contexts/auth';
import useApiErrorHandler from '~/hooks/use-api-error-handler';
import type { ErrorResponse } from '~/types/error';
import type { User } from '~/types/user';

const useSettingsForm = <TFieldValues extends FieldValues, TTransformedValues extends FieldValues = TFieldValues>(
  formOptions: UseFormProps<TFieldValues, unknown, TTransformedValues>,
  initialValues?: TFieldValues
) => {
  const form = useForm<TFieldValues, unknown, TTransformedValues>(formOptions);
  const { reloadUser } = useAuth();
  const [isEdited, setIsEdited] = useState(false);
  const handleApiError = useApiErrorHandler();

  const resetForm = useCallback(() => {
    form.reset(initialValues);
    setIsEdited(false);
  }, [form, initialValues]);

  const handleSubmit = useCallback(async (values: Partial<User>) => {
    try {
      const updatedUser = await updateMe(values);
      reloadUser(updatedUser);
      resetForm();
      toast.success('Update saved!');

    } catch (err) {
      if (isAxiosError<ErrorResponse>(err) && err.response?.status === 409) {
        const errCode = err.response.data.code;
        if (errCode === 'EMAIL_EXISTS') {
          toast.error('Email already registered');
        }
      } else {
        handleApiError(err);
      }
    }
  }, [handleApiError, reloadUser, resetForm]);

  // Asynchronously load initial form values
  useEffect(() => {
    resetForm();
  }, [resetForm]);

  useEffect(() => {
    setIsEdited(form.formState.isDirty);
  }, [form.formState.isDirty]);

  return {
    form,
    isEdited,
    resetForm,
    handleSubmit
  };
};

export default useSettingsForm;
