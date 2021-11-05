import React from 'react';
import '../styles/view.scss';
let contract = require('../backend/contract');
let web3 = require('../backend/web3');

class Mynfts extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            productsNum: 0,
            products: []
        }
    }
    view_nfts = async() => {
        try{
            let num = await contract.methods.maxn().call();
            let accounts = await web3.eth.getAccounts();
            console.log(num);
            
            let prods = [];
            for(let i=13; i<=num; i++){
                let p = await contract.methods.nfts(i).call();
                console.log(p);
                if(p.owner === accounts[0]){
                    prods.push(p);
                }
            }
            num -= 12;

            this.setState({
                productsNum: num,
                products: prods
            });
        }catch(e){

        }
    }

    display_prods() {
        console.log(this.state.products);
        return(
            <div class='products'>
                {this.state.products.map((item, index) => {
                    console.log(item)
                    return(
                        <div class='product' key={index}>
                            <div className='info'>
                                <div>unique id: {item[2]} </div>
                                <div>creator: {item[0]} </div>
                            </div>
                            
                            {item[0]===item[1] &&
                            <div>
                                铸造获得
                            </div>
                            }
                            {item[0] !== item[1] &&
                            <div>
                                购买获得
                            </div>
                            }
                        </div>
                    )} 
                )}
            </div>
        );
    }
    render(){
        document.title = 'nfts view';
        return(
            <div class='view'>
                <button onClick={this.view_nfts}>view my nfts</button>
                <div>number of total nfts: {this.state.productsNum}</div>
                {this.display_prods()}
            </div>
        );
    }
}

export default Mynfts;