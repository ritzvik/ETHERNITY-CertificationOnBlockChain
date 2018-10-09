window.addEventListener('load', injected)

function injected()
{
  return typeof web3 === 'undefined' 
  if (typeof web3 === 'undefined') {
    console.log('No Web3 Found')
    return false;
  }
  else {
    console.log('Hooraaay !!!')
    return true;
  }
}

function waitToLoad()
{
  while (injected() == false)
    continue;
  ethaddr = currentAccount();
  setTimeout (function () {
    ethaddr = currentAccount();
    $("#current").html(ethaddr.toString())
    getAukat();
  },500);
}


contract_address = '0xA126124825Bbe39381eDE8c907430Aad641021f1';
abi = [{"constant":true,"inputs":[{"name":"_ethaddress","type":"address"}],"name":"isRecipientActive","outputs":[{"name":"status","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"}],"name":"linkRecipientName","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_ethaddress","type":"address"}],"name":"getData","outputs":[{"name":"_data","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_issuer","type":"address"},{"name":"_recipient","type":"address"},{"name":"_certificateNonce","type":"uint256"}],"name":"getCertificateHash","outputs":[{"name":"_hash","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ethaddress","type":"address"}],"name":"getIssuerStatus","outputs":[{"name":"status","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_data","type":"bytes"}],"name":"linkData","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_ethaddress","type":"address"}],"name":"getName","outputs":[{"name":"_name","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_issuer","type":"address"},{"name":"_certificateNonce","type":"uint256"},{"name":"_permission","type":"bool"}],"name":"grantPermissionToChange","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"}],"name":"linkIssuerName","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_receiver","type":"address"},{"name":"_hash","type":"bytes32"},{"name":"_certificateNonce","type":"uint256"}],"name":"changeCertificateHash","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_receiver","type":"address"},{"name":"_hash","type":"bytes32"}],"name":"registerCertificateHash","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_issuer","type":"address"},{"name":"_recipient","type":"address"}],"name":"getCurrentCertificateNonce","outputs":[{"name":"_certificateNonce","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_issuer","type":"address"},{"name":"_receiver","type":"address"},{"name":"_certificateNonce","type":"uint256"}],"name":"permissionToChange","outputs":[{"name":"status","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_issuer","type":"address"},{"indexed":false,"name":"_receiver","type":"address"},{"indexed":false,"name":"document_number","type":"uint256"}],"name":"newIssue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_ethaddress","type":"address"},{"indexed":false,"name":"_name","type":"bytes32"}],"name":"issuerNameLinked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_ethaddress","type":"address"},{"indexed":false,"name":"_name","type":"bytes32"}],"name":"recipientNameLinked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_ethaddress","type":"address"},{"indexed":false,"name":"_data","type":"bytes"}],"name":"dataLinked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_issuer","type":"address"},{"indexed":false,"name":"_receiver","type":"address"},{"indexed":false,"name":"document_number","type":"uint256"},{"indexed":false,"name":"_permission","type":"bool"}],"name":"permissionToChangeGranted","type":"event"}];


w3 = new Web3(web3.currentProvider);
Contract = w3.eth.contract(abi);

contractInstance = Contract.at(contract_address);
var a,b;

function fa (error, result) {
  a=result;
}

function fb (error, result) {
  b=result;
}

function pausecomp(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}

function getAukat() {
  console.log(w3.eth.accounts[0])
  // contractInstance.getIssuerStatus(w3.eth.accounts[0], fa)
  contractInstance.getIssuerStatus(w3.eth.accounts[0], fa)
  // contractInstance.isrecipientActive(w3.eth.accounts[0], fb);
  contractInstance.isrecipientActive(w3.eth.accounts[0], fb /*function (error, result) {if (!error) b=result;}*/);
  // console.log(a,b);
  // pausecomp(100)
  if (a==0 && b==0)
    console.log('Not issuer and Not recipient');
  else if (a==1)
    console.log('issuer');
  else if (b==1)
    console.log('recipient');
  return a,b;
}

function hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
} 

function handler(error, result) {
  if (!error);
    // console.log(result);
  else
    console.error(error);
}

function handler1(error, result) {
  if (!error)
  {
      var result1=hex2a(result);
      $("#finalName").html(result1);
  }
  else
    console.error(error);
}

function linkIssuerName() {
  n = $("#iname").val();
  console.log(w3.eth.accounts[0])
  // ano = $("#inum").val();
  contractInstance.linkIssuerName(n, {from:w3.eth.accounts[0]}, handler);
  // $("candidate-1").html(ano).toString();
}

function linkRecipientName() {
  n = $("#rname").val();
  // ano = $("#rnum").val();
  contractInstance.linkRecipientName(n, {from:w3.eth.accounts[0]}, handler);
}

function getName() {
  ADDR = $("#addr").val();
  contractInstance.getName.call(ADDR, handler1);
}

function currentAccount() {
  var ethaddr = w3.eth.accounts[0]
	$("#current").html(ethaddr.toString());
  return ethaddr;
}