import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { store, persistor } from "../redux/store";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;
const Wrapper = styled.div`
  padding: 10px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

//left part
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-items: centre;
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  flex: 1;
  display: flex;
  align-items: center;
  padding: 2px;
`;
const Input = styled.input`
  border: none;
  flex: 1;
  ${mobile({ width: "50px" })}
`;

//centre part
const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;

//rightpart
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;
const MenuItem = styled.div`
  font-size: 16px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Button = styled.button`
  /* width: 40%; */
  border: none;
  /* padding: 15px 20px; */
  background-color: white;
  color: #000000;
  cursor: pointer;
  /* margin-bottom: 10px; */
  /* &:disabled {
    color: green;
    cursor: not-allowed;
  } */
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("clicked");
    await localStorage.removeItem("persist:root");
    console.log("flushed");
    window.location.reload()
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>

        <Center>
          <Logo>GOEL MEDZ.</Logo>
        </Center>

        <Right>
          <>
            {user ? 
              <>
                
                  <MenuItem>
                    <Button onClick={handleClick}>
                      Sign Out
                    </Button>
                  </MenuItem>
                
              </>
              :
              <>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <MenuItem>Register</MenuItem>
                </Link>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <MenuItem>Sign In</MenuItem>
                </Link>
              </>
            }
          </>

          <Link to="/cart" style={{ textDecoration: 'none' }}>
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
