import { useCallback, useEffect, useState } from 'react';
import { type FieldValues, useForm, type UseFormProps } from 'react-hook-form';

const useSettingsForm = <T extends FieldValues>(formOptions: UseFormProps<T>, initialValues?: T) => {
  const form = useForm<T>(formOptions);
  const [isEdited, setIsEdited] = useState(false);

  const resetForm = useCallback(() => {
    form.reset(initialValues);
    setIsEdited(false);
  }, [form, initialValues]);

  const handleSubmit = useCallback((values: T) => {
    console.log(values);
  }, []);

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
