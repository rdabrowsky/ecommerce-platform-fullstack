import Header from './components/Header';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <>
      <Header />
      <main className={'py-3'}>
        <Container></Container>
      </main>
    </>
  );
}

export default App;
