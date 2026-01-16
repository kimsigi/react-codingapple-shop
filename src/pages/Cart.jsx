import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {increase} from "../store/cartSlice.js";
import { memo, useMemo, useState } from "react";

function Cart() {

    let carts = useSelector((state) => state.장바구니);
    let dispatch = useDispatch();

    // useMemo는 [] 컬럼의 값이 변경될 때에만 재실행됨.
    // 그 전에는 이전에 계산된 값을 재사용함.
    let result = useMemo(() => ChildUseMemo(carts), [carts]);
    console.log("### useMemo result : ", result);

    return (
        <div>
            {/* Child 재랜더링 테스트(memo, useMemo) */}
            <ChildMemo />
            {   /*<ChildMemo carts={carts}/>*/
                /* 값이 변경되면 재랜더링 되지만 변경되지 않으면 재랜더링 되지 않음. */
            }
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

const ChildMemo = memo(() =>{
    console.log('ChildMemo 재랜더링됨');
    return (
        <div>Memo자식임</div>
    );
});

const ChildUseMemo = (carts) => {
    console.log("CHILD MEMO USEMEMO 재랜더링됨");
    return carts.reduce((sum, item) => sum + item.count, 0);
}

export default Cart;