import React from 'react';
import '../styles/launch.scss';
import { InputNumber } from 'antd';

let web3 = require('../backend/web3');
let contract = require('../backend/contract');

class Bid extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            money: 0,
            prd_id: 0,
            time: 0
        }
    }
    
    set_time(){
        let now = new Date().getTime();
        this.setState({
            time: now
        });
    }
    query_item_change(prod_id){
        this.setState({
            prd_id: prod_id
        });
    }
    num_input_change(value){
        this.setState({
            money: value
        });
    }
    query_bid = async() => {
        try {
            let heighst = await contract.methods.products(this.state.prd_id).call();
            this.setState({ isClicked: false })
            console.log(heighst)
            alert('heighest now is ' + heighst.highest_now);
            window.location.reload()
        } catch (e) {
            console.log(e)
            this.setState({ isClicked: false })
            alert('failed!');
        }
    }
    the_real_bid = async() =>{
        let accounts = await web3.eth.getAccounts();
        this.set_time();
        //console.log('state:', this.state);
        try {
            console.log(this.state)
            await contract.methods.bid(this.state.time,this.state.prd_id).send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.money.toString(), 'ether'),
                gas: '2000000',
            })
            //window.location.reload()
            this.setState({ isClicked: false })
            alert('success, query to see your bid!');
        } catch (e) {
            console.log(e)
            this.setState({ isClicked: false })
            alert('failed, lower than current or TimeOut!');
        }
    }
    render() {
        document.title = 'bid';
        return <div>
                <div className='need'>
                    product id:
                    <InputNumber id='input-num' size='small' className='input-num' 
                        min={0} defaultValue={0}
                        onChange={(prd_id)=>{
                            this.query_item_change(prd_id);
                    }}/>
                </div>
                <div className='prod_id'>
                    value:
                    <InputNumber id='input-num' size='small' className='input-num' 
                        min={0} defaultValue={0}
                        onChange={(prd_id)=>{
                            this.num_input_change(prd_id);
                    }}/>
                </div>
                <button class='button' onClick={this.query_bid}>
                    query
                </button>
                <button class='button' onClick={this.the_real_bid}>
                    bid
                </button>
               </div>;
      }
    
}

export default Bid;

