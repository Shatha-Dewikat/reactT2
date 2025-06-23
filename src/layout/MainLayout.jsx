
import Navbar from './../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { Outlet } from 'react-router';
import { Container } from 'react-bootstrap';

export default function MainLayout() {
  return (
<>
<Navbar/>
<Container>
<Outlet/>
</Container>

<Footer/>

</>
  )
}
