import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
  useFormState
} from 'react-hook-form';
import { Label } from '~/components/ui/label';

import { cn } from '~/lib/utils';

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
};

type FormItemContextValue = {
  id: string,
  required: boolean,
  direction: 'row' | 'column'
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

interface FormItemProps extends React.ComponentProps<'div'> {
  required?: boolean;
  direction?: 'row' | 'column';
}

function FormItem({
  className,
  required = false,
  direction = 'row',
  ...props
}: FormItemProps) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id, required, direction }}>
      <div
        data-slot="form-item"
        className={cn(
          'flex flex-col gap-2 mb-6',
          direction === 'row' && 'sm:flex-row',
          className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();
  const { required, direction } = React.useContext(FormItemContext);

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn(
        'data-[error=true]:text-destructive',
        required && 'before:content-["*"] before:text-red-500',
        direction === 'row' && 'sm:w-1/4 sm:after:content-[":"]',
        className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

function FormControl({ className, ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  const { direction } = React.useContext(FormItemContext);

  return (
    <div className={cn(
      'relative',
      direction === 'row' && 'sm:w-1/2',
      className)}>
      <Slot
        data-slot="form-control"
        id={formItemId}
        aria-describedby={
          !error
            ? `${formDescriptionId}`
            : `${formDescriptionId} ${formMessageId}`
        }
        aria-invalid={!!error}
        {...props}
      />
      <FormMessage />
    </div>
  );
}

function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? '') : props.children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn('absolute mt-1 text-destructive text-xs', className)}
      {...props}
    >
      {body}
    </p>
  );
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField
};
