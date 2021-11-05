pragma solidity >=0.5.16;

contract auction{
    struct auction_item {
        address payable launcher;
        uint256  unique_id;
        uint  ddl;
        uint  bottom;
        uint  highest_now;
        address  highest_bidder;
        uint  node;
        bool finished;
        mapping(address => uint)  bidds;
    }
    struct nft_item{
        address  creator;
        address  owner;
        uint256  unique_id;
    }
    struct if_create{
        uint256 unique_id;
        bool if_;
    }
    uint public maxn;
    uint public productsNum;
    
    constructor() public {
        maxn = 12;
        productsNum = 0;
	}
    mapping(address => uint) public userLaunchsLen;
    mapping(address => uint[]) public userLaunchs;
    mapping(address => uint) public userbidsLen;
    mapping(address => uint[]) public userbids;
    mapping(address => nft_item[]) public ownership;
    mapping(address => uint) public ownlen;
    mapping(uint256 => address[]) public former_owners;
    mapping(uint256 => uint) public formerown_len;
    mapping(uint => auction_item) public products;
    mapping(uint256 => nft_item) public nfts;
    mapping(address => if_create[]) public if_creator;
    mapping(address => uint) public if_creatorlen;
    uint256  amount;

    function create(uint inputnum)public payable {
        maxn++;
        nft_item memory new_nft = nft_item(msg.sender,msg.sender,maxn) ;
        nfts[new_nft.unique_id] = new_nft;
        ownership[msg.sender].push(new_nft);
        ownlen[msg.sender]--;
        former_owners[new_nft.unique_id].push(msg.sender);
        if_create memory nif = if_create(new_nft.unique_id,true);
        if_creator[msg.sender].push(nif);
        if_creatorlen[msg.sender]++;
        formerown_len[new_nft.unique_id]++;
    }

    function launch(uint256 id, uint goal, uint ddl) public payable {
        require(nfts[id].owner == msg.sender);
        auction_item storage p = products[productsNum];
        p.launcher = msg.sender;
        p.bottom = goal;
        p.ddl = ddl;
        p.highest_now = 0;
        p.finished = false;
        p.node = productsNum;
        p.unique_id = id;
        userLaunchs[msg.sender].push(productsNum);
        userLaunchsLen[msg.sender] = userLaunchs[msg.sender].length;
        productsNum++;
    }

    function bid(uint time,uint node) public payable returns(bool) {
        auction_item storage p = products[node];
        require(time<p.ddl);
        require((msg.value *1 wei/1 ether) + p.bidds[msg.sender] > p.highest_now);
        require((msg.value *1 wei/1 ether) + p.bidds[msg.sender] >= p.bottom);
        if(p.bidds[msg.sender] == 0){
            userbids[msg.sender].push(node);
            userbidsLen[msg.sender]++;
        }
        else{}
        p.highest_bidder = msg.sender; 
        p.bidds[msg.sender] += msg.value *1 wei/1 ether;
        p.highest_now = p.bidds[p.highest_bidder];
        return true;
    }

    function claim(uint node)public payable {
        auction_item storage p = products[node];
        require(msg.sender == p.highest_bidder);
        nfts[p.unique_id].owner = msg.sender;
        amount = p.highest_now * 1 ether;
        p.launcher.transfer(amount) ;
        formerown_len[p.unique_id]++;
        former_owners[p.unique_id].push(msg.sender);
    }
}