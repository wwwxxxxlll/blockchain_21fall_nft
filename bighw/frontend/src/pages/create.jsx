import React from 'react';
import '../styles/launch.scss';


let web3 = require('../backend/web3');
let contract = require('../backend/contract');
class Create extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nftid: 0,
            buffer: null,  //Data to be sent to ipfs
        }
    }
    
    time2timestamp(s){
        let stamp = new Date(s);
        return stamp.getTime();
    }
    num_input_change(value){
        this.setState({
            money: value
        });
    }
    chooseFile = (event) => {
        event.preventDefault();
        let file = event.target.files[0];
        let reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            this.setState({buffer: Buffer(reader.result)});
            console.log('buffer', this.state.buffer);
        }
    }
    create = async() => {
        let accounts = await web3.eth.getAccounts();
        let inputnum = 1;
        try {
            await contract.methods.create(inputnum).send({
                from: accounts[0],
                //value: web3.utils.toWei('0', 'ether'),
                gas: '3000000',
            })
            window.location.reload()
            this.setState({ isClicked: false })
            let maxn = await contract.methods.maxn().call();
            alert('success with nft_id'+maxn);
        } catch (e) {
            console.log(e)
            this.setState({ isClicked: false })
            alert('failed!');
        }
    }

    render() {
        document.title = 'create';
        return <div>
                    <input type="file" onChange={this.chooseFile}/>
                    <button className="button" onClick={this.create}>
                        create
                    </button>
               </div>;
      }
    
}

export default Create;

/*


    chooseFile = (event) => {
        event.preventDefault();
        let file = event.target.files[0];
        let reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            this.setState({buffer: Buffer(reader.result)});
            console.log('buffer', this.state.buffer);
        }
    }

    onSubmit = async(event) => {
        event.preventDefault();
        console.log("Submitting file to IPFS");
            
        let result = await ipfs.add(this.state.buffer);
        
        console.log('Ipfs result', result);
        let tokenURI = `https://ipfs.infura.io/ipfs/${result.path}`;
        console.log(tokenURI);
        this.setState({tokenURI});
        
        this.props.NFTContract.methods.mintNFT(this.state.NFTName, tokenURI, 0).send({from: this.props.accountAddress, gas: '3000000'});
        console.log("Name:"+this.state.NFTName);
    }

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1 className="display-5">Create your NFT</h1>
                </div>
                <div className="p-4 mt-1 border">
                    <form onSubmit={this.onSubmit}>
                        <input type="file" onChange={this.chooseFile}/>
                        <input
                          required
                          type="text"
                          value={this.state.NFTName}
                          className="form-control"
                          placeholder="Enter Your NFT's Name"
                          onChange={(e) =>
                            this.setState({ NFTName: e.target.value })
                          }
                        />
                        <button className="mt-3 btn btn-outline-primary" type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        )
    };
}

export default Create;

*/