import axios from "axios";
import React, {Component} from "react";
import MyContext from '../contexts/MyContext';

class ProductDetail extends Component {
    static contextType = MyContext;
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            txtID: '',
            txtName: '',
            txtPrice: 0,
            cmbCategory: '',
            imgProduct: '',
        };
    }
    render() {
        const cates = this.state.categories.map((cate) => {
            return (<option key={cate._id} value={cate._id}>{cate.name}</option>);
        });
        return (
            <div className="float-right">
                <h2 className="text-center">PRODUCT DETAIL</h2>
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td><input type="text" value = {this.state.txtName} onChange = {(e) => {this.setState({txtName: e.target.value})}}></input></td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td><input type="text" value = {this.state.txtPrice} onChange = {(e) => {this.setState({txtPrice: e.target.value})}}></input></td>
                            </tr>
                            <tr>
                                <td>Category</td>
                                <td>
                                    <select value={this.state.cmbCategory} onChange={(e) => { this.setState({ cmbCategory: e.target.value }) }}>
                                        {cates}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Image</td>
                                <td><input type="file" onChange={(e) => this.previewImage(e)}></input></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <input type="submit" value="ADD NEW" onClick = {(e) => this.btnAddClick(e)}></input>
                                    <input type="submit" value="UPDATE" onClick = {(e) => this.btnUpdateClick(e)}></input>
                                    <input type="submit" value="DELETE" onClick = {(e) => this.btnDeleteClick(e)}></input>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan='2'><img src={this.state.imgProduct} alt="" width= "300px" height="300px" /></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
    componentDidMount() {
        this.apiGetCategories();
    }

    componentDidUpdate(prevProps) {
        if (this.props.item !== prevProps.item) {
            this.setState({
                txtID: this.props.item?._id || '',
                txtName: this.props.item?.name || '',
                txtPrice: this.props.item?.price || 0,
                cmbCategory: this.props.item?.category?._id || '',
                imgProduct: this.props.item ? 'data:image/jpeg;base64,' + this.props.item.image : '',
            });
        }
    }
    //event handlers
    
    btnDeleteClick(e){
        e.preventDefault();
        if(window.confirm('Are you sure to delete this product?')){
            const id = this.state.txtID;
            if(id){
                this.apiDeleteProduct(id);
            }else {
                alert('Please select a product to delete');
            }
        }
    }

    btnUpdateClick(e){
        e.preventDefault();
        const id = this.state.txtID;
        const name = this.state.txtName;
        const price = this.state.txtPrice;
        const category = this.state.cmbCategory;
        const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, '');
        if(id && name && price && category && image){
            const prod = {name: name, price: price, category: category, image: image};
            this.apiPutProduct(id, prod);
        }else{
            alert('Please input name and price and category and image');
        }
    }

    btnAddClick(e){
        e.preventDefault();
        const name = this.state.txtName;
        const price = this.state.txtPrice;
        const category = this.state.cmbCategory;
        const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, '');
        if(name && price && category && image){
            const prod = {name: name, price: price, category: category, image: image};
            this.apiPostProduct(prod);
        }else {
            alert('Please input name and price and category and image');
        }
    }

    previewImage(e) {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = (evt) => {
                this.setState({imgProduct: evt.target.result});
            };
            reader.readAsDataURL(file);
        }
    }
    //api

    apiDeleteProduct(id) {
        const config = {headers: {'x-access-token': this.context.token}};
        axios.delete(process.env.REACT_APP_API_URL + '/api/admin/products/' + id, config).then((res) => {
            const result = res.data;
            if(result){
                alert('OK BABY!');
                this.apiGetProducts();
            }else {
                alert('SORRY BABY!');
            }
        });
    }

    apiPutProduct(id, prod) {
        const config = {headers: {'x-access-token': this.context.token}};
        axios.put(process.env.REACT_APP_API_URL + '/api/admin/products/' + id, prod, config).then((res) => {
            const result = res.data;
            if(result){
                alert('OK BABY!');
                this.apiGetProducts();
            }else {
                alert('SORRY BABY!');
            }
        });
    }

    apiPostProduct(prod) {
        const config = {headers: {'x-access-token': this.context.token}};
        axios.post(process.env.REACT_APP_API_URL + '/api/admin/products', prod, config).then((res) => {
            const result = res.data;
            if(result){
                alert('OK BABY!');
                this.apiGetProducts();
            }else {
                alert('SORRY BABY!');
            }
        });
    };

    apiGetProducts(){
        const config = {headers: {'x-access-token': this.context.token}};
        axios.get(process.env.REACT_APP_API_URL + '/api/admin/products?page=' + this.props.curPage, config).then((res) => {
            const result = res.data;
            if (result.products.length !== 0) {
                this.props.updateProducts(result.products, result.noPages);

            }else {
                axios.get(process.env.REACT_APP_API_URL + '/api/admin/products?page=' +(this.props.curPage -1), config).then((res) => {
                    const result = res.data;
                    if(result.products.length !== 0){
                        this.props.updateProducts(result.products, result.noPages);
                    }
                })
            }
        })
    }

    async apiGetCategories() {
        const config = {headers: {'x-access-token': this.context.token}};   
        axios.get(process.env.REACT_APP_API_URL + '/api/admin/categories', config).then((res) => {
            const result = res.data;
            if (result.categories && result.categories.length > 0) {
                this.setState({
                    categories: result.categories,
                    cmbCategory: result.categories[0]._id
                });
            } else {
                this.setState({ categories: [] });
            }
        });
    }
}
export default ProductDetail;