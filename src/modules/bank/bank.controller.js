// const { Payment } = require('../payment/payment.model');
// const { Bank } = require('./bank.model');

// const approveBankPayment = async (req, res, next) => {
//     try {
//         const { bankName, accountHolderName, bankNumber, cheque, bankPaymentId } = req.body;
       
    
      

//         let finalData = {
//             cheque,

//             userId: req.tokenPayload._id,

            
//             cost,
           
//         };
//         console.log(finalData);

//         const bankPayment = new Bank({ ...finalData });
//         await bankPayment.save();
//        return res.json({
//             message: 'bank transfer done , waiting for admin approval',
//             status: true
//         });
//     } catch ({ message }) {
//         return res
//             .json({
//                 message,
//                 status: false
//             })
//             .status(500);
//     }
// };

// const addFundBank = async (req, res, next) => {
//     try {
      
//         const cheque = req.files.cheque[0].filename;
//         console.log(cheque, '------------------------------------');
//         if (!cheque) {
//            return res.json({
//                 message: 'insufficient bank credentials ',
//                 status: false
//             });
//         }

//         let finalData = {
//             cheque,

//             userId: req.tokenPayload._id,
//             status : "Pending"

          
//         };
//         console.log(finalData);

//         const bankPayment = new Bank({ ...finalData });
//         await bankPayment.save();
//         return res.json({
//             message: 'bank transfer done , waiting for admin approval',
//             status: true
//         });
//     } catch ({ message }) {
//         return res
//             .json({
//                 message,
//                 status: false
//             })
//             .status(500);
//     }
// };



// module.exports = {
//     makePaymentBank
// };
