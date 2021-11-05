import React from 'react';
import '../styles/launch.scss';
import { InputNumber } from 'antd';

let web3 = require('../backend/web3');
let contract = require('../backend/contract');

class Claim extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            contract: contract,
            _id: 0
        }
    }

    id_input_change(_idt){
        this.setState({
            _id: _idt
        });
    }
    claim = async() => {
        let accounts = await web3.eth.getAccounts();
        let number = await contract.methods.productsNum().call();
        let product = await contract.methods.products(number).call();
        console.log('state:', this.state);
        console.log(accounts[0]);
        console.log('p:',product.unique_id);
        try {
            console.log('max:',number)
            await contract.methods.claim(this.state._id).send({
                from: accounts[0],
                //value: web3.utils.toWei('0', 'ether'),
                gas: '2000000',
            })
            window.location.reload()
            this.setState({ isClicked: false })
            alert('success!');
        } catch (e) {
            console.log(e)
            this.setState({ isClicked: false })
            alert('failed!');
        }
    }

    render(){
        document.title = 'claim';
        return (
            <div className='launch'>
                <div className='goods'>
                    product id you want to claim:
                    <InputNumber id='input-goods-id' size='small' className='input-goods-id' 
                        min={0} defaultValue={0}
                        onChange={(_idt)=>{
                            this.id_input_change(_idt);
                    }}/>
                </div>

                <button class='button' onClick={this.claim}>
                    claim`
                </button>
            </div>
        );
    }
}

export default Claim;