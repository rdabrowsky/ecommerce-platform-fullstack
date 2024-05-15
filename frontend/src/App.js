import Header from './components/Header';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main className={'py-3'}>
        <Container></Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
