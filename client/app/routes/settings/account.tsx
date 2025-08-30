import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { useAuth } from '~/contexts/auth';
import useSettingsForm from '~/routes/settings/use-settings-form';
import { personalDetailsSchema } from '~/schemas/settings';
import type { PersonalDetailsFormValues } from '~/types/settings';

function PersonalDetails() {
  const { user } = useAuth();

  const initialValues = useMemo<PersonalDetailsFormValues>(() => ({
    email: user?.email ?? ''
  }), [user?.email]);

  const { form, isEdited, resetForm, handleSubmit } = useSettingsForm({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: initialValues
  }, initialValues);

  return (
    <>
      <h6>Personal Details</h6>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem required>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {isEdited && <div className="flex gap-2">
            <Button size="sm" type="submit">Save</Button>
            <Button size="sm" variant="outline" onClick={resetForm}>Cancel</Button>
          </div>}
        </form>
      </Form>
    </>
  );
}

export default function Account() {
  return (
    <>
      <h4>Account Settings</h4>
      <PersonalDetails />
    </>
  );
}
