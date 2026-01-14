import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import {Context1} from '@/App.jsx';
let YellowBtn = styled.button`
  background: yellow;
  color: black;
  padding: 10px;
`

let PropsBtn = styled.button`
  background: ${props => props.bg};
  color: black;
  padding: 10px;
`

let Box = styled.div`
  background: grey;
  pading: 20px;
`

function DetailProduct(props) {

  let {proNumber} = useParams();
  let shoes = props.shoes || [];

  if ( !proNumber ) return <div>상품번호가 없습니다.</div>
  
  let filteredShoes = shoes.filter(f => f.id === Number(proNumber));

  if ( filteredShoes.length === 0 ) return <div>상품이 존재하지 않습니다.</div>
  if ( filteredShoes.length > 1 ) return <div>상품번호에 해당하는 상품이 여러개입니다.</div>
  
  const [hide, setHide] = useState(false);
  
  const [inputText, setInputText] = useState(null);
  const [inputTextAlert, setInputTextAlert] = useState(false);

  const [tabpage, setTabpage] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setHide(true);
    }, 2000);
  }, []);

  useEffect(() => {
    let value = /^[0-9]+$/.test(inputText);
    let alertValue = value ? false : (inputText === null || inputText === "" || inputText === undefined) ? false : true;
    setInputTextAlert(alertValue);
  }, [inputText]);

  return (
    <div className="container">
      {hide ? null : 
          <div className="alert alert-warning">
            2초이내 구매시 할인
          </div>
      }
      <Box>
        <YellowBtn>버튼</YellowBtn>
        <PropsBtn bg="blue">파란버튼</PropsBtn>
        <PropsBtn bg="red">빨간버튼</PropsBtn>
      </Box>

      {
        inputTextAlert ? <div className="alert alert-danger">숫자만 입력하세요</div> : null
      }

      <input type="text"
             onChange={(e) => setInputText(e.target.value)}
      />

      <div className="row">
        <div className="col-md-6">
          <img src={`https://codingapple1.github.io/shop/shoes${filteredShoes[0].id + 1}.jpg`} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{filteredShoes[0].title}</h4>
          <p>{filteredShoes[0].content}</p>
          <p>{filteredShoes[0].price.toLocaleString()}원</p>
          <button className="btn btn-danger">주문하기</button> 
        </div>
      </div>
      {/* defaultActiveKey 속성으로 기본 선택 탭 지정 */}
      <Nav variant="tabs"  defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link eventKey="link0" onClick={() => setTabpage(0)}>버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link1" onClick={() => setTabpage(1)}>버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link2" onClick={() => setTabpage(2)}>버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tabpage={tabpage} />
    </div> 
  );
}

function TabContent({tabpage}) {
  let {재고} = useContext(Context1);

  let [fadeClass, setFadeClass] = useState('');
  useEffect(() => {
    // 탭이 바뀔 때마다 fadeClass 상태를 aftAnimation으로 변경
    // setTimeout 사용 이유: useEffect 내부에서 바로 상태를 변경하면 리렌더링이 즉시 발생하여 애니메이션 효과가 적용되지 않음
    // setTimeout을 사용하여 상태 변경을 지연시켜 리렌더링이 발생하도록 함
    let timeout = setTimeout(() => setFadeClass("aftAnimation"), 100);
    return () => {
      clearTimeout(timeout);
      setFadeClass("");
    }
  }, [tabpage]);

  return (
    <div className={`befAnimation ${fadeClass}`}>
      {[<div>내용-재고{재고[0]}</div>, <div>내용-재고{재고[1]}</div>, <div>내용-재고{재고[2]}</div>][tabpage]}
    </div>
  );
}



export default DetailProduct;