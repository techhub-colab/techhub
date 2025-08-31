import { isAxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { type FieldValues, useForm, type UseFormProps } from 'react-hook-form';
import { toast } from 'sonner';
import { updateMe } from '~/.client/services/api/user';
import { useAuth } from '~/contexts/auth';
import type { ErrorResponse } from '~/types/error';
import type { PersonalDetailsFormValues, ResetPasswordFormValues } from '~/types/settings';

const useSettingsForm = <T extends FieldValues>(formOptions: UseFormProps<T>, initialValues?: T) => {
  const form = useForm<T>(formOptions);
  const { reloadUser } = useAuth();
  const [isEdited, setIsEdited] = useState(false);

  const resetForm = useCallback(() => {
    form.reset(initialValues);
    setIsEdited(false);
  }, [form, initialValues]);

  const handleSubmit = useCallback(async (values: PersonalDetailsFormValues | ResetPasswordFormValues) => {
    try {
      const updatedUser = await updateMe(values);
      reloadUser(updatedUser);
      setIsEdited(false);
      toast.success('Update saved!');

    } catch (err) {
      if (isAxiosError<ErrorResponse>(err) && err.response?.status === 409) {
        const errCode = err.response.data.code;
        if (errCode === 'EMAIL_EXISTS') {
          toast.error('Email already registered');
        }
      } else {
        // TODO: Handle auth error
      }
    }
  }, [reloadUser]);

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
