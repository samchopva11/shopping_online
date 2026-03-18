import axios from "axios";
import React, {Component} from "react";
import MyContext from "../contexts/MyContext";
import { Navigate } from "react-router-dom";
import CartUtil from "../utils/CartUtil";

class Myorders extends Component {
    static contextType = MyContext;
    constructor(props){
        super(props);
        this.state = {
            orders: [],
            order: null,
        }
    }
    render(){
        if(this.context.token === ''){
            return(<Navigate replace to = '/login'/>);
        }
        const orders = this.state.orders.map((item) => {
            return(
                <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
                    <td>{item._id}</td>
                    <td>{new Date(item.cdate).toLocaleString()}</td>
                    <td>{item.customer.name}</td>
                    <td>{item.customer.phone}</td>
                    <td>{item.total}</td>
                    <td>{item.status}</td>

                </tr>
            );
        });
        if(this.state.order){
            var items = this.state.order.items.map((item, index) => {
                return(
                    <tr key={item.product._id} className="datatable">
                        <td>{index + 1}</td>
                        <td>{item.product._id}</td>
                        <td>{item.product.name}</td>
                        <td><img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt=""></img></td>
                        <td>{item.product.price}</td>
                        <td>{item.quantity}</td>
                        <td>{CartUtil.getAmount(item)}</td>
                    </tr>
                );
            
            });
        }

        return(
            <div>
                <div className="align-center">
                    <h2 className="text-center">ORDER LIST</h2>
                    <table className="datatable">
                        <tbody>
                            <tr className="datatable">
                                <th>ID</th>
                                <th>Creation date</th>
                                <th>Customer Name</th>
                                <th>Customer Phone</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                            {orders}
                        </tbody>
                    </table>
                </div>
                {this.state.order ?
                    <div className="align-center">
                        <h2 className="text-center">ORDER LIST</h2>
                        <table className="datatable">
                            <tbody>
                                <tr className="datatable">
                                    <th>No.</th>
                                    <th>Product ID</th>
                                    <th>Product Name</th>
                                    <th>Product Phone</th>
                                    <th>Image</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Amount</th>
                                </tr>
                                {items}
                            </tbody>
                        </table>
                    </div> 
                :<div/>
                }
            </div>
        );
    }

    componentDidMount(){
        if(this.context.customer){
            const cid = this.context.customer._id;
            this.apiGetOrdersByCustID(cid);

        }
    }
    //event handlers
    trItemClick(item){
        this.setState({order: item});
    }

    //apis
    apiGetOrdersByCustID(cid){
        const config = {headers: {'x-access-token': this.context.token}};
        axios.get('/api/customer/orders/customer/' + cid, config).then((res) => {
            const result = res.data;
            this.setState({orders: result});
        })
    }


}
export default Myorders;