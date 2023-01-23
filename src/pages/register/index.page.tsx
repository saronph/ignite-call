import { api } from '@/lib/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react';
import { useRouter } from 'next/router';
import { ArrowRight } from 'phosphor-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Container, Form, FormError, Header } from './styles';

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Mínimo 3 letras' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'Caracteres especiais não permitidos',
    })
    .transform((username) => username.toLowerCase()),
  name: z.string().min(3, { message: 'Mínimo 3 letras' }),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const router = useRouter();

  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username));
    }
  }, [router.query?.username, setValue]);

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Header>
        <Heading as='strong'>Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1}></MultiStep>
      </Header>

      <Form as='form' onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text>Nome de usuário</Text>
          <TextInput
            prefix='ignite.com/'
            placeholder='seu-usuario'
            {...register('username')}
          />

          {errors.username && (
            <FormError size='sm'>{errors.username.message}</FormError>
          )}
        </label>

        <label>
          <Text>Nome completo</Text>
          <TextInput placeholder='Seu Nome' {...register('name')} />

          {errors.name && (
            <FormError size='sm'>{errors.name.message}</FormError>
          )}
        </label>

        <Button type='submit' disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  );
}