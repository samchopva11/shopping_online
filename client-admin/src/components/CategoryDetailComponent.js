import React , { Component } from 'react';
import MyContext from '../contexts/MyContext';
import axios from 'axios';


class CategoryDetail extends Component {
    static contextType = MyContext;
    constructor(props) {
        super(props);
        this.state = {
            txtID: '',
            txtName: '',
        }
    }
    render () {
        return (
            <div className='float-right'>
                <h2 className='text-center'>CATEGORY DETAIL</h2>
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td>ID</td>
                                <td>
                                    <input type='text' value={this.state.txtID} onChange = {(e) => {this.setState({txtID: e.target.value})}} readOnly= {true}></input>
                                </td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>
                                    <input type='text' value={this.state.txtName} onChange = {(e) => {this.setState({txtName: e.target.value})}}></input>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <input type='submit' value='ADD NEW' onClick = {(e) => this.btnAddClick(e)}></input>
                                    <input type='submit' value='UPDATE' onClick = {(e) => this.btnUpdateClick(e)}></input>
                                    <input type='submit' value='DELETE' onClick = {(e) => this.btnDeleteClick(e)}></input>    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        )
    }
    //event handlers
    btnAddClick = (e) => {
        e.preventDefault();
        const name = this.state.txtName;
        if(name){
            const cate = {name:name};
            this.apiPostCategory(cate);
        }else{
            alert('Please input name');
        }
    }

    btnUpdateClick = (e) => {
        e.preventDefault();
        const id = this.state.txtID;
        const name = this.state.txtName;
        if(id && name){
            const cate = {name: name};
            this.apiPutCategory(id, cate);
        }else{
            alert('Please input id and name');
        }
    }

    btnDeleteClick = (e) => {
        e.preventDefault();
        if(window.confirm('Are you sure?')){
            const id = this.state.txtID;
            if (id){
                this.apiDeleteCategory(id);
            }else{
                alert('Please input id');
            }
        }
    }

    //api
    apiDeleteCategory = (id) => {
        const config = {headers: {'x-access-token': this.context.token}};
        axios.delete(process.env.REACT_APP_API_URL + '/api/admin/categories/'+id, config).then((res) => {
            const result = res.data;
            if(result){
                alert('OK BABY!');
                this.apiGetCategories();
            }else{
                alert('SORRY BABY!');
            }
        })
    }

    apiPutCategory = (id, cate) => {
        const config = {headers: {'x-access-token': this.context.token}};
        axios.put(process.env.REACT_APP_API_URL + '/api/admin/categories/'+id,cate,config).then((res) => {
            const result = res.data;
            if(result){
                alert('OK BABY!');
                this.apiGetCategories();
            }else{
                alert('SORRY BABY!');
            }
        })
    }

    apiPostCategory = (cate) => {
        const config = {headers: { 'x-access-token': this.context.token }};
        axios.post(process.env.REACT_APP_API_URL + '/api/admin/categories', cate, config).then((res) => {
            const result = res.data;
            if(result){
                alert('OK BABY!');
                this.apiGetCategories();
            }else{
                alert('SORRY BABY!');
            }
        });
    }

    apiGetCategories = () => {
        const config = {headers: { 'x-access-token': this.context.token }};
        axios.get('process.env.REACT_APP_API_URL + /api/admin/categories', config).then((res) => {
            const result = res.data;
            this.props.updateCategories(result.categories);
        });
    }

    componentDidUpdate(prevProps){
        if(this.props.item !== prevProps.item){
            const item = this.props.item;
            this.setState({txtID: item ? item._id : '', txtName: item ? item.name : ''})
        }
    }
}
export default CategoryDetail;