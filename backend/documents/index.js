module.exports = ({ Vacccine_Name , Vaccinated_To , Vaccinated_By ,Aadhaar_No,Dose_Number,Date_of_Dose,Age,Gender,Vaccination_Status,Vaccinated_At,Remaining_Number_of_Dose,NextDose_On }) => {
   const today = new Date();
   const date1 = Date_of_Dose.toString();
   const vaccinatedOn = date1.slice(0,10);
   const date2 = NextDose_On.toString();
   let nextDoseOn ;
   if(Remaining_Number_of_Dose == 0){
      nextDoseOn = "Vaccination Completed";
   }
   else{
      nextDoseOn = date2.slice(0,10);
   }
return `
   <!doctype html>
   <html>
      <head>
         <meta charset="utf-8">
         <title>PDF Result Template</title>
         <style>
            .invoice-box {
            max-width: 800px;
            margin: 300px 50px;
            padding: 30px;
            border: 1px solid #eee;
            box-shadow: 0 0 10px rgba(0, 0, 0, .15);
            font-size: 16px;
            line-height: 24px;
            font-family: 'Helvetica Neue', 'Helvetica',
            color: #555;
            }
            .margin-top {
            margin-top: 50px;
            }
            .justify-center {
            text-align: center;
            }
            .invoice-box table {
            width: 100%;
            line-height: inherit;
            text-align: left;
            }
            .invoice-box table td {
            padding: 5px;
            vertical-align: top;
            }
            .invoice-box table tr td:nth-child(2) {
            text-align: right;
            }
            .invoice-box table tr.top table td {
            padding-bottom: 20px;
            }
            .invoice-box table tr.top table td.title {
            font-size: 45px;
            line-height: 45px;
            color: #333;
            }
            .invoice-box table tr.information table td {
            padding-bottom: 40px;
            }
            .invoice-box table tr.heading td {
            background: #eee;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
            }
            .invoice-box table tr.details td {
            padding-bottom: 20px;
            }
            .invoice-box table tr.item td {
            border-bottom: 1px solid #eee;
            }
            .invoice-box table tr.item.last td {
            border-bottom: none;
            }
            .invoice-box table tr.total td:nth-child(2) {
            border-top: 2px solid #eee;
            font-weight: bold;
            }
            @media only screen and (max-width: 600px) {
            .invoice-box table tr.top table td {
            width: 100%;
            display: block;
            text-align: center;
            }
            .invoice-box table tr.information table td {
            width: 100%;
            display: block;
            text-align: center;
            }
            }
         </style>
      </head>
      <body>
         <div class="invoice-box">
            <table cellpadding="0" cellspacing="0">
               <tr class="top">
                  <td colspan="2">
                     <table>
                        <tr>
                           <td class="title"><img  src="https://dummyimage.com/800x600/000/fff.jpg&text=AVS"
                              style="width:100%; max-width:156px;"></td>
                           <td>
                              Date: ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}
                           </td>
                        </tr>
                     </table>
                  </td>
               </tr>
               <tr class="item">
                  <td>Vaccine Name : </td>
                  <td>${Vacccine_Name}</td>
               </tr>
               <tr class="item">
                  <td>Vaccinated To : </td>
                  <td>${Vaccinated_To}</td>
               </tr>
               <tr class="item">
                  <td>Vaccinated By : </td>
                  <td>Dr.${Vaccinated_By}</td>
               </tr>
               <tr class="item">
                  <td>Aadhaar No : </td>
                  <td>${Aadhaar_No}</td>
               </tr>
               <tr class="item">
                  <td>Dose Number : </td>
                  <td>${Dose_Number}</td>
               </tr>
               <tr class="item">
                  <td>Date Of Dose : </td>
                  <td>${vaccinatedOn}</td>
               </tr>
               <tr class="item">
                  <td>Age : </td>
                  <td>${Age}</td>
               </tr>
               <tr class="item">
                  <td>Gender : </td>
                  <td>${Gender}</td>
               </tr>
               <tr class="item">
                  <td>Vaccination Status : </td>
                  <td>${Vaccination_Status}</td>
               </tr>
               <tr class="item">
                  <td>Vaccinated At : </td>
                  <td>${Vaccinated_At}</td>
               </tr>
               <tr class="item">
                  <td>Remained Number of Dose : </td>
                  <td>${Remaining_Number_of_Dose}</td>
               </tr>
               <tr class="item">
                  <td>Next Dose On : </td>
                  <td>${nextDoseOn}</td>
               </tr>
            </table>
         </div>
      </body>
   </html>
   `;
};