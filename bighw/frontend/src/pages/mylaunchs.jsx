import React from 'react';
import '../styles/view.scss';
let contract = require('../backend/contract');
let web3 = require('../backend/web3');

class MyLaunchs extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            productsNum: 0,
            products: []
        }
    }
    view_launchs = async() => {
        try{
            let num = await contract.methods.productsNum().call();
            let accounts = await web3.eth.getAccounts();
            console.log(num);
            
            let prods = [];
            for(let i=0; i<num; i++){
                let p = await contract.methods.products(i).call();
                if(p.launcher === accounts[0]){
                    prods.push(p);
                }
            }

            this.setState({
                productsNum: num,
                products: prods
            });
        }catch(e){

        }
    }
    go2_bids(){
        window.location.href = '/bid';
    }

    tiemstamp2time(stamp){
        console.log(stamp);
        let time = new Date(parseInt(stamp));
        let Y = time.getFullYear();
        let M = time.getMonth()+1 < 10 ? '0'+(time.getMonth()+1) : time.getMonth()+1;
        let D = time.getDate();
        let h = time.getHours();
        let m = time.getMinutes()<10 ? '0'+time.getMinutes() : time.getMinutes();
        let s = time.getSeconds()<10 ? '0'+time.getSeconds() : time.getSeconds(); 
        return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
    }

    is_finished(stamp){
        let now = new Date().getTime();
        return stamp < now;
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
                                <div>product id: {item[6]} </div>
                                <div>nft id: {item[1]} </div>
                                <div>current highest: {item[4]}</div>
                                <div>bottom price: {item[3]}</div>
                                <div>launcher: {item[0]}</div>
                                <div>deadline: {this.tiemstamp2time(item[2])}</div>
                            </div>
                            
                            {this.is_finished(item[2])===false &&
                            <div className='bid'>
                                    <button class='button'
                                    onClick={this.go2_bids}>
                                    go to bid
                                </button>
                            </div>
                            }
                        </div>
                    )} 
                )}
            </div>
        );
    }
    render(){
        document.title = 'auctions view launch';
        return(
            <div class='view'>
                <button onClick={this.view_launchs}>view my launchs</button>
                <div>number of total products: {this.state.productsNum}</div>
                {this.display_prods()}
            </div>
        );
    }
}

export default MyLaunchs;