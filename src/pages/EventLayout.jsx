import { Link, Outlet } from "react-router-dom";

function EventLayout() {
    return (
        <div>
            <h2>오늘의 이벤트</h2>
            <button><Link to="one">첫 주문 이벤트</Link></button>
            <button><Link to="two">생일 쿠폰 받기</Link></button>
            <Outlet />
        </div>
    );
}

export default EventLayout;