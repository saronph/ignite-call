import { Heading, Text } from '@ignite-ui/react';
import Image from 'next/image';
import { Container, Hero, Preview } from './styles';

import previewImage from '../../assets/app-preview.png';

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading size='4xl'>Agendamento descomplicado</Heading>
        <Text>
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
      </Hero>

      <Preview>
        <Image
          alt='Calendário simbolizando o funcionamento'
          src={previewImage}
          height={400}
          quality={100}
          priority
        />
      </Preview>
    </Container>
  );
}
