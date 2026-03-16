import React, {Component} from "react";
import Inform from "./InformComponent";
import Menu from "./MenuComponent";
import Home from "./HomeComponent";
import Product from "./ProductComponent";
import { Routes, Route, Navigate } from "react-router-dom";
import ProductDetail from "./ProductDetaliComponent";
import Signup from "./SignupComponent";
import Active from "./ActiveComponent";
import Login from "./LoginComponent";
import MyProfile from "./MyProfileComponent";




class Main extends Component {
    render() {
        return (
            <div className="body-customer">
                <Menu />
                <Inform />
                <Routes>
                    <Route path='/' element = {<Navigate replace to='/home'/>} />
                    <Route path='/home' element = {<Home />} />
                    <Route path='/signup' element = {<Signup />} />
                    <Route path='/active' element = {<Active />} />
                    <Route path = '/product/category/:cid' element={<Product/>}></Route>
                    <Route path = '/product/search/:keyword' element={<Product/>}></Route>
                    <Route path = '/product/:id' element={<ProductDetail/>}></Route>
                    <Route path = '/login' element = {<Login/>} />
                    <Route path = '/myprofile' element = {<MyProfile/>}/>
                </Routes>
            </div>
        );
    }

}
export default Main;