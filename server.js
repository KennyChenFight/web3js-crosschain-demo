const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const Web3 = require('web3');
let web3Hospital = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
let web3Clinic = new Web3(new Web3.providers.WebsocketProvider("http://localhost:8545"));
web3Hospital.eth.defaultAccount = web3Hospital.eth.accounts[0];
web3Clinic.eth.defaultAccount = web3Clinic.eth.accounts[0];

const hospitalAbi = [
    {
        "constant": true,
        "inputs": [],
        "name": "getInfo",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "string",
                "name": "newInfo",
                "type": "string"
            }
        ],
        "name": "setInfo",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const clinicAbi = [
    {
        "constant": true,
        "inputs": [],
        "name": "getInfo",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "string",
                "name": "newInfo",
                "type": "string"
            }
        ],
        "name": "setInfo",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "hospitalInfo",
                "type": "string"
            }
        ],
        "name": "noticeHospital",
        "type": "event"
    }
];

const hospitalAddress = '0x31BAccda0C7294c8A813D97D82463F75Bc6Bbed5';
const clinicAddress = '0x31BAccda0C7294c8A813D97D82463F75Bc6Bbed5';

const hospitalContract = new web3Hospital.eth.Contract(hospitalAbi, hospitalAddress);
// hospitalContract.methods.getInfo().call().then(console.log);

const clinicContract = new web3Clinic.eth.Contract(clinicAbi, clinicAddress);

const clinicEvent = clinicContract.events.noticeHospital({}, function (error, result) {
    if (!error) {
        console.log('clinic event:', result.returnValues.hospitalInfo);
        console.log('hospital will do something...');
    }
});

// clinicContract.methods.setInfo("clinic update info1~").send({from: '0xb511bE5D828d0B5410E833e7B4e2d8492228D9E4'}).then(function (error, result) {
//     // console.log('clinic: I update something');
// });
// clinicContract.methods.setInfo("clinic update info2~").send({from: '0xb511bE5D828d0B5410E833e7B4e2d8492228D9E4'}).then(function (error, result) {
//     // console.log('clinic: I update something');
// });
// clinicContract.methods.getInfo().call().then(function (result) {
//     console.log(result);
// });

app.use(bodyParser.json());

router = express.Router();
router.post('/clinicUpdateInfo', function (req, res, next) {
    const data = req.body.info;
    clinicContract.methods.setInfo(data).send({from: '0xb511bE5D828d0B5410E833e7B4e2d8492228D9E4'}).then(function (error, result) {
        res.json({
            message: 'success'
        });
    });
});
app.use(router);


app.listen(3000, function () {
    console.log('Express app started on 3000');
});
