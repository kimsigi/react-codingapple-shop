import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {increase} from "../store/cartSlice.js";

function Cart() {

    let carts = useSelector((state) => state.장바구니);
    let dispatch = useDispatch();

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        carts.map((cart, index) => 
                            
                                <tr key ={cart.id}>
                                    <td>{index + 1}</td>
                                    <td>{cart.name}</td>
                                    <td>{cart.count}</td>
                                    <td><button onClick={() => dispatch(increase({id: cart.id}))}>+</button></td>
                                </tr>    
                        )
                    }
                </tbody>
                </Table> 
        </div>
    );
}

export default Cart;