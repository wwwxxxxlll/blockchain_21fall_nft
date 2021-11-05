import React from 'react';
import '../styles/launch.scss';
import { InputNumber } from 'antd';

let web3 = require('../backend/web3');
let contract = require('../backend/contract');

class Launch extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            contract: contract,
            _id: 13,
            money: 1,
            ddl: 1667663940000
        }
    }
    time2timestamp(s){
        let stamp = new Date(s);
        return stamp.getTime();
    }

    id_input_change(_idt){
        this.setState({
            _id: _idt
        });
    }

    num_input_change(value){
        this.setState({
            money: value
        });
    }

    ddl_input_change(event){
        this.setState({
            ddl: this.time2timestamp(event.target.value)
        });
    }

    launch = async() => {
        let accounts = await web3.eth.getAccounts();
        let number = await contract.methods.productsNum().call();
        console.log('state:', this.state);
        try {
            console.log('max:',number)
            await contract.methods.launch(this.state._id, this.state.money, this.state.ddl).send({
                from: accounts[0],
                //value: web3.utils.toWei('0', 'ether'),
                gas: '2000000',
            })
            window.location.reload()
            this.setState({ isClicked: false })
            alert('success !');
        } catch (e) {
            console.log(e)
            this.setState({ isClicked: false })
            alert('failed!\nYou are not owner or already in auction');
        }
    }

    render(){
        document.title = 'launch';
        return (
            <div className='launch'>
                <div className='goods'>
                    nft to be launch:
                    <InputNumber id='input-goods-id' size='small' className='input-goods-id' 
                        min={12} defaultValue={13}
                        onChange={(_idt)=>{
                            this.id_input_change(_idt);
                    }}/>
                </div>
                <div className='need'>
                    bottom price:
                    <InputNumber id='input-num' size='small' className='input-num' 
                        min={1} defaultValue={1}
                        onChange={(value)=>{
                            this.num_input_change(value);
                    }}/>
                </div>
                <div className='ddl'>
                    Deadline:
                    <input class='input' type='datetime-local' 
                        defaultValue="2021-11-05T23:59"
                        onChange={(event)=>{
                            this.ddl_input_change(event);
                    }}/>
                </div>

                <button class='button' onClick={this.launch}>
                    launch
                </button>
            </div>
        );
    }
}

export default Launch;