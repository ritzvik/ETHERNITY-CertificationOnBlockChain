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
function currentAccount() {
  var ethaddr = w3.eth.accounts[0]
	$("#current").html(ethaddr);
  return ethaddr;
}

contract_address = '0xA126124825Bbe39381eDE8c907430Aad641021f1';
abi = [{"constant":true,"inputs":[{"name":"_ethaddress","type":"address"}],"name":"isRecipientActive","outputs":[{"name":"status","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"}],"name":"linkRecipientName","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_ethaddress","type":"address"}],"name":"getData","outputs":[{"name":"_data","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_issuer","type":"address"},{"name":"_recipient","type":"address"},{"name":"_certificateNonce","type":"uint256"}],"name":"getCertificateHash","outputs":[{"name":"_hash","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ethaddress","type":"address"}],"name":"getIssuerStatus","outputs":[{"name":"status","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_data","type":"bytes"}],"name":"linkData","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_ethaddress","type":"address"}],"name":"getName","outputs":[{"name":"_name","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_issuer","type":"address"},{"name":"_certificateNonce","type":"uint256"},{"name":"_permission","type":"bool"}],"name":"grantPermissionToChange","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"}],"name":"linkIssuerName","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_receiver","type":"address"},{"name":"_hash","type":"bytes32"},{"name":"_certificateNonce","type":"uint256"}],"name":"changeCertificateHash","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_receiver","type":"address"},{"name":"_hash","type":"bytes32"}],"name":"registerCertificateHash","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_issuer","type":"address"},{"name":"_recipient","type":"address"}],"name":"getCurrentCertificateNonce","outputs":[{"name":"_certificateNonce","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_issuer","type":"address"},{"name":"_receiver","type":"address"},{"name":"_certificateNonce","type":"uint256"}],"name":"permissionToChange","outputs":[{"name":"status","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_issuer","type":"address"},{"indexed":false,"name":"_receiver","type":"address"},{"indexed":false,"name":"document_number","type":"uint256"}],"name":"newIssue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_ethaddress","type":"address"},{"indexed":false,"name":"_name","type":"bytes32"}],"name":"issuerNameLinked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_ethaddress","type":"address"},{"indexed":false,"name":"_name","type":"bytes32"}],"name":"recipientNameLinked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_ethaddress","type":"address"},{"indexed":false,"name":"_data","type":"bytes"}],"name":"dataLinked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_issuer","type":"address"},{"indexed":false,"name":"_receiver","type":"address"},{"indexed":false,"name":"document_number","type":"uint256"},{"indexed":false,"name":"_permission","type":"bool"}],"name":"permissionToChangeGranted","type":"event"}];
w3 = new Web3(web3.currentProvider);
Contract = w3.eth.contract(abi);
contractInstance = Contract.at(contract_address);

function hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
} 

function handler_getName(error, result) {
  if (!error)
  {
      var result1=hex2a(result);
      $("#NAME").html(result1);
  }
  else
    console.error(error);
}

function getName() {
  ADDR = $("#field_getName").val();
  contractInstance.getName.call(ADDR, handler_getName);
}

function handler_isIssuer(error, result) {
  if (!error) {
    if (result)
      $("#issuerStatus").html("true");
    else
      $("#issuerStatus").html("false");
  }
  else 
    console.log(error);
}

function isIssuer() {
  ADDR = $("#field_isIssuer").val();
  contractInstance.getIssuerStatus.call(ADDR, handler_isIssuer);
}

function handler_isRecipient(error, result) {
  if (!error) {
    if (result)
      $("#recipientStatus").html("true");
    else
      $("#recipientStatus").html("false");
  }
  else 
    console.log(error);
}

function isRecipient() {
  ADDR = $("#field_isRecipient").val();
  // console.log(ADDR);
  contractInstance.isRecipientActive.call(ADDR, handler_isRecipient);
}

function handler_getCertificateHash(error, result)
{
  if (!error) {
    $("#certificateHash").html(result);
    // console.log(result);
  }
  else
    console.log(error);
}

function getCertificateHash() {
  adri = $("#field1_getCertificateHash").val();
  adrr = $("#field2_getCertificateHash").val();
  nonce = $("#field3_getCertificateHash").val();

  contractInstance.getCertificateHash.call(adri, adrr, nonce, handler_getCertificateHash)
}

function handler_currentNonce (error, result)
{
  if (!error)
  {
    $("#currentNonce").html(result.c[0]);
    // console.log(result.c[0])
  }
  else
    console.log(error);
}

function currentNonce() {
  adri = $("#field1_currentNonce").val();
  addr = $("#field2_currentNonce").val();

  contractInstance.getCurrentCertificateNonce.call(adri, addr, handler_currentNonce)
}

function handler_linkRecipientName (error, result)
{
  if (error) console.error(error);
}

function linkRecipientName() {
  n = $("#field_linkRecipientName").val();
  contractInstance.linkRecipientName(n, {from:w3.eth.accounts[0]}, handler_linkRecipientName);
}

function handler_linkIssuerName (error, result)
{
  if (error) console.error(error);
}

function linkIssuerName() {
  n = $("#field_linkIssuerName").val();
  contractInstance.linkIssuerName(n, {from:w3.eth.accounts[0]}, handler_linkIssuerName);
}

function handler_registerHash(error, result) {
  if (error) console.error(error);
}

function registerHash() {
  addr = $("#field1_registerHash").val();
  h = $("#field2_registerHash").val();
  contractInstance.registerCertificateHash(addr,h, {from:w3.eth.accounts[0]}, handler_registerHash);
}