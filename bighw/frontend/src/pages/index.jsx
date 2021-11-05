import React from "react";
import "../index.css";



class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    go2_launch(){
        window.location.href = '/launch';
    }
    go2_view(){
        window.location.href = '/view';
    }
    go2_mynfts(){
        window.location.href = '/my_nfts';
    }
    go2_mylaunchs(){
        window.location.href = '/mylaunchs';
    }
    go2_bids(){
        window.location.href = '/bid';
    }
    go2_creatnfts(){
        window.location.href = '/create';
    }
    render(){
        document.title = 'auction index';
        return (
            document.getElementById("root"),
            <div className='index'>
                <button class='button' 
                onClick={this.go2_launch}>
                    launch
                </button>

                <button class='button'
                onClick={this.go2_view}>
                    view
                </button>

                <button class='button'
                onClick={this.go2_mynfts}>
                    my nfts
                </button>

                <button class='button'
                onClick={this.go2_mylaunchs}>
                    my launchs
                </button>
                
                <button class='button'
                onClick={this.go2_bids}>
                    quick bid
                </button>

                <button class='button'
                onClick={this.go2_creatnfts}>
                    create nft
                </button>

                <div>bighw</div>
            </div>
        )
    }
}

export default Index;