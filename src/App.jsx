import { Button, Col, Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap'
import '@/App.css'
import shoes2 from '@/images/shoes2.jpg';
import logoImg from '/vite.svg';
import dataShoes from '@/data/shoes.js';
import { createContext, useState } from 'react';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import DetailProduct from './pages/DetailProduct';
import About from './pages/About';
import EventLayout from './pages/EventLayout';
import axios from 'axios';

export let Context1 = createContext(); 

function App(){
  
  let navigate = useNavigate();

  let [shoes, setShoes] = useState(dataShoes);
  const [재고, set재고] = useState([10, 11, 12]);
  
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand as={Link} to="/"><img src={logoImg} />신발샵</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link onClick={() => navigate('/event')}>Event</Nav.Link>
          <Nav.Link as={Link} to="/detail">상세</Nav.Link>
          <Nav.Link onClick={() => navigate('/about')}>어바웃</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
      
      <Routes>
        <Route path="/" element={
          <>
            <button onClick={() => {
              axios.get('https://codingapple1.github.io/shop/data2.json').then((result) => {
                setShoes([...shoes, ...result.data]);
                console.log([...shoes, ...result.data]);
              }).catch((e) => {
                console.log('실패함 ㅠ', e.message);
              });
            }}>
              axios.GET
            </button>
            <div  className="main-bg" 
                  style={{ backgroundImage: `url(${shoes2})` }}
            />
            <Container>
              <Row>
                {
                  shoes.map((item, index) => <Product shoes={item} 
                                                      index={index} 
                                                      key={item.id}
                                                      navigate={() => navigate(`/detail/${item.id}`)}
                                              />
                  )
                }
              </Row>
            </Container>
          </>
        } />
          <Route path="/detail" element={<DetailProduct />} />
          <Route path="/detail/:proNumber" element={
            <Context1.Provider value={{shoes, 재고}}>
              <DetailProduct shoes={shoes} />
            </Context1.Provider>
          } />
          <Route path="/about" element={<About />}>
            <Route path="member" element={<div>멤버임</div>} />
            <Route path="location" element={<div>위치정보임</div>} />
          </Route>
          <Route path="/about/member2" element={<div>멤버2임</div>} />
          <Route path="/event" element={<EventLayout />}>
            <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
            <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
          </Route>
          <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  )
}

const Product = (props) => {
  return (
    <Col xs={4} md={4} key={props.index} onClick={props.navigate} style={{ cursor: 'pointer' }}>
      <img src={`https://codingapple1.github.io/shop/shoes${props.shoes.id + 1}.jpg`} className="w-100" />
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.price.toLocaleString() }원</p>
      <p>{ props.shoes.content }</p>
    </Col>
  );
}

export default App
