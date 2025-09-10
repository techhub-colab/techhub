import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { Form } from '~/components/ui/form';
import { useAuth } from '~/contexts/auth';
import useSettingsForm from '~/routes/settings/use-settings-form';
import { profileSchema } from '~/schemas/settings';
import type { ProfileFormValues } from '~/types/settings';

export default function Profile() {
  const { user } = useAuth();

  const initialValues = useMemo<ProfileFormValues>(() => ({
    bio: user?.bio ?? ''
  }), [user?.bio]);

  const { form, isEdited, resetForm, handleSubmit } = useSettingsForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialValues
  }, initialValues);

  return (
    <>
      <h4>Profile Settings</h4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}></form>
      </Form>
    </>
  );
}
