import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input, PasswordInput } from '~/components/ui/input';
import { useAuth } from '~/contexts/auth';
import { loginFormSchema } from '~/schemas/auth';
import { login } from '~/services/api/auth';
import type { LoginRequest } from '~/types/auth';

export default function Login() {
  const { setAuth, user } = useAuth();
  const form = useForm<LoginRequest>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const handleLogin = async (values: LoginRequest) => {
    try {
      const { accessToken, user } = await login(values);
      setAuth(accessToken, user);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="h-[480px] flex items-center justify-center">
      <Form {...form}>
        <form className="w-full max-w-[280px]" onSubmit={form.handleSubmit(handleLogin)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-9">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full font-medium" type="submit">LOGIN</Button>
        </form>
      </Form>
    </div>
  );
}
