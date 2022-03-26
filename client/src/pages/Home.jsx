import React from "react";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Products from "../components/Products";

// const Container = styled.div`
//   width: 100vw;
//   height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const Wrapper = styled.div`
//   width: 40%;
//   padding: 20px;
//   background-color: white;
// `;


const Home = () => {
  return (
    <div>
      <Navbar />
      <Categories />
      <Products/>
      <Footer/>
    </div>
  );
};

export default Home;
