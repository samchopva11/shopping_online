import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            newprods: [],
            hotprods: []
        }
    }
    render() {
        const newprods = this.state.newprods.map((item) => {
            return (
                <div key = {item._id} className='inline'>
                    <figure>
                        <Link to={'/product/' + item._id}><img src={'data:image/jpeg;base64,' + item.image} alt='' width='300px' height='300px'></img></Link>
                        <figcaption className='text-center'>{item.name}<br/>Price: {item.price}</figcaption>
                    </figure>
                </div>
            );
        });
        const hotprods = this.state.hotprods.map((item) => {
            return (
                <div key = {item._id} className='inline'>
                    <figure>
                        <Link to={'/product/' + item._id}><img src={'data:image/jpeg;base64,' + item.image} alt='' width='300px' height='300px'></img></Link>
                        <figcaption className='text-center'>{item.name}<br/>Price: {item.price}</figcaption>
                    </figure>
                </div>
            );
        });
        return (
            <div>
                <div className='align-center'>
                    <h2 className='text-center'>NEW PRODUCTS</h2>
                    {newprods}
                </div>
                {this.state.hotprods.length > 0 ? (
                    <div className='align-center'>
                        <h2 className='text-center'>HOT PRODUCTS</h2>
                        {hotprods}
                    </div>
                ) : <div/>}
            </div>
        );
    }
    componentDidMount() {
        this.apiGetNewProducts();
        this.apiGetHotProducts();
    }

    //apis

    apiGetNewProducts() {
        axios.get(process.env.REACT_APP_API_URL + '/api/customer/products/new').then((res) => {
            const result = res.data;
            if (Array.isArray(result)) { // Kiểm tra xem result có phải là mảng không
                this.setState({newprods: result});
            } else {
                console.error("API for new products returned non-array data or an error:", result);
            }
        });
    }

    apiGetHotProducts() {
        axios.get(process.env.REACT_APP_API_URL + '/api/customer/products/hot').then((res) => {
            const result = res.data;
            if (Array.isArray(result)) { // Kiểm tra xem result có phải là mảng không
                this.setState({hotprods: result});
            } else {
                console.error("API for hot products returned non-array data or an error:", result);
            }
        });
    }
}
export default Home;