import React from 'react';
import '../styles/view.scss';
import { InputNumber } from 'antd';
let contract = require('../backend/contract');

class Former extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            productsNum: 0,
            products: [],
            unique_id: 0
        }
    }
    num_input_change(value){
        this.setState({
            unique_id: value
        });
    }
    view_former = async() => {
        try{
            console.log(this.state.unique_id);
            let num = await contract.methods.formerown_len(this.state.unique_id).call();
            console.log(num);
            
            let prods = [];
            for(let i=0; i<num; i++){
                let p = await contract.methods.former_owners(this.state.unique_id,i).call();
                prods.push(p);
            }

            this.setState({
                productsNum: num,
                products: prods
            });
        }catch(e){

        }
    }


    display_prods(){
        console.log(this.state.products);
        
        return(
            <div class='products'>
                {this.state.products.map((item, index) => {
                    console.log(item)
                    return(
                        <div class='product' key={index}>
                            <div className='info'>
                                <div>owner {index}: {item} </div>
                            </div>
                        </div>
                    )} 
                )}
            </div>
        );
    }
    render(){
        document.title = 'owners view';
        return(
            <div class='view'>
            <div>
                input an unique id to view former owners
            </div>
            <div className='need'>
            unique_id:
            <InputNumber id='input-num' size='small' className='input-num' 
                min={1} defaultValue={1}
                onChange={(value)=>{
                    this.num_input_change(value);
            }}/>
            </div>
                <button onClick={this.view_former}>view</button>
                {this.display_prods()}
            </div>
        );
    }
}

export default Former;