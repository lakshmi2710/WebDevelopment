const patients = {};
const availablePatients = [];
const doctors = {};
const chatMessages = { "chatRoom" : {}}
const healthTip = [{'doctorName' : "Dr.Ram", 'healthTip' : "Base your diet on plenty of foods rich in carbohydrates."},{'doctorName' : "Dr.Raj", 'healthTip' : "Do yoga everyday morning"}];
const chatRoomMetaData = {}

module.exports = {
    patients,
    doctors,
    chatMessages,
    availablePatients,
    healthTip,
    chatRoomMetaData
};