import { Link, Outlet } from "react-router-dom";

const About = () => {
    return (
        <>
            <div>회사정보임</div>
            <Outlet></Outlet>
            <Link to="/about/member2">멤버2로 이동</Link>
        </>
    );
}

export default About;