import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '~/components/ui/form';
import { Input, PasswordInput } from '~/components/ui/input';
import { useAuth } from '~/contexts/auth';
import useSettingsForm from '~/routes/settings/use-settings-form';
import { personalDetailsSchema, resetPasswordSchema } from '~/schemas/settings';
import type { PersonalDetailsFormValues, ResetPasswordFormInput, ResetPasswordFormOutput } from '~/types/settings';

function PersonalDetails() {
  const { user } = useAuth();

  const initialValues = useMemo<PersonalDetailsFormValues>(() => ({
    email: user?.email ?? ''
  }), [user?.email]);

  const { form, isEdited, resetForm, handleSubmit } = useSettingsForm<PersonalDetailsFormValues>({
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
                <FormLabel className="sm:w-2/6">Email</FormLabel>
                <FormControl className="sm:w-3/6">
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

function ResetPassword() {
  const { form, isEdited, resetForm, handleSubmit } = useSettingsForm<
    ResetPasswordFormInput,
    ResetPasswordFormOutput
  >({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  });

  return (
    <>
      <h6>Reset Password</h6>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sm:w-2/6">New password</FormLabel>
                <FormControl className="sm:w-3/6">
                  <PasswordInput {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sm:w-2/6">Confirm password</FormLabel>
                <FormControl className="sm:w-3/6">
                  <PasswordInput {...field} />
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
      <ResetPassword />
    </>
  );
}
