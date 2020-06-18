module.exports = ({ name, price1, price2, receiptId }) => {
  const today = new Date();
  return `
  <!doctype html>
  <html>
     <head>
        <meta charset="utf-8">
        <title>PDF Result Template</title>
        <style>
           .invoice-box {
           color: #555;
           max-width: 800px;
           margin: auto;
           padding: 30px;
           border: 1px solid #eee;
           box-shadow: 0 0 10px rgba(0, 0, 0, .15);
           font-size: 16px;
           line-height: 24px;
           font-family: 'Helvetica Neue', 'Helvetica',
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
           padding: 1px;
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
           padding-bottom: 20px;
           text-align: center;
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
           .show-border td {
               border-top: thin solid; 
               border-bottom: thin solid;
            }

            .show-border td:first-child {
               border-left: thin solid;
            }

            .show-border td:last-child {
               border-right: thin solid;
            }
           }
        </style>
     </head>
     <body>
        <div class="invoice-box">
           <table cellpadding="0" cellspacing="0">
              <tr >
                 <td colspan="2">
                    <table cellspacing="0" cellpadding="0">
                       <tr>
                          <td ><img  src="{{logo_image}}" style="width:150px; height: 40px;""></td>
                          <td>
                            Time : 08:48
                          </td>
                       </tr>
                       <tr>
                          <td></td>
                          <td><b>No : 646</b></td>
                       </tr>
                       <tr>
                        <td></td>
                        <td><b>DATE : 05/12/2019 </b></td>
                        </tr>
                        <tr>
                           <td></td>
                           <td><b> <i>LOCATION : SNT </i></b></td>
                        </tr>
                    </table>
                 </td>
              </tr>
              <tr >
                 <td colspan="2">
                    <table cellspacing="0">
                       <tr>
                          <td style="text-align: center;">
                            <b style="font-size: 21px;"> INWARD EQUIPMENT INTERCHANGE </b>
                          </td>
                          
                       </tr>
                    </table>
                 </td>
              </tr>
              <tr >
               <td colspan="2" >
                  <table>
                     <tr >
                        <td style="width: 35% ;"><b>CONTAINER NO :</b> 00CU70264</td>
                        <td style="width: 25% ; text-align: left;"><b>40</b> FT GP</td>
                        <td style="width: 25% ;">SEAL -</td> 
                        <td style="width: 25% ;">DEST KEMBA</td>
                     </tr>
                  </table>
               </td>
            </tr>
           </table>
           <table  cellspacing="0" style="border: 1px solid black; -moz-border-radius:10px;
           -webkit-border-radius:10px;
           border-radius:10px;">
            <tr >
               <td colspan="2" style="padding: 0px;">
                  <table cellspacing="0" cellpadding="0" >
                     <tr>
                        <td><b>SHIPPING LINE : SNT</b></td>
                        <td></td>
                        <td><b>B\L NO :</b> 00CU70264</td>
                     </tr>
                     <tr>
                      <td><b>VESSEL :</b> SIGINON TERMINAL</td>
                      <td></td>
                      <td><b> NO:</b> </td>
                      </tr>
                      <tr>
                         <td><b>TRANSPORTER :</b> SANALSA LTD</td>
                         <td style="text-align: left;"><b>TRUCK NO :</b> KBR 370</td>
                         <td><b>DRIVER :</b> BOAS/ 28295848</td>
                      </tr>
                      <tr>
                        <td><b>DELIVERY NOTE :</b> </td>
                        <td style="text-align: left;"></td>
                        <td></td>
                     </tr>
                     <tr>
                        <td colspan="2"><b>PARTY DELIVERING CONTAINER : SANALSA LTD</b></td>
                       
                     </tr>
                     <tr>
                        <table cellspacing="0" cellpadding="0" >
                        <tr class="show-border">
                           <td style="border-top: thin solid; 
                           border-bottom: thin solid; width: 50%;"><b><i>STORAGE : {{storage}}</i></b> </td>
                           <td style="text-align: left; border-top: thin solid; 
                           border-bottom: thin solid; border-right: thin solid; width: 30%;"><b>CNTR IN DATE : 05/12/2019</td>
                           <td style="text-align: right; border-top: thin solid; 
                           border-bottom: thin solid; width: 20%;"><b> STATUS : LCL</b></td>
                        </tr>
                        </table>
                     </tr>
                     <tr >
                        <td ><img  src="{{image}}"
                           style="width:100%; height: 340px; padding:0em"></td>
                     </tr>
                    <tr>
                     <td class="show-border" style="text-align: left; border-top: thin solid; 
                     border-bottom: thin solid;"><b>Tally Report</b></td>
                    </tr>
                    <tr>
                     <td class="show-border" style="text-align: left; border-top: thin solid; 
                     border-bottom: thin solid; height: 80px;">
                     <sub >MINOR DENTS AND SCRATCHES SEEN</sub>   
                     </td>
                     <tr>
                        <td>
                           <table cellpadding="0" cellspacing="0">
                           
                           <td style="width: 10%;"><b style="font-size: 12px;">Repair Code</b></td>
                           <td style="width: 40%;"><b style="font-size: 12px;">Description of Damage/Repair</b></td>
                           <td style="width: 6%;"><b style="font-size: 12px;">Qty</b></td>
                           <td style="width: 6%;"><b style="font-size: 12px;">Hours</b></td>
                           <td style="width: 6%;"><b style="font-size: 12px;">Labour</b></td>
                           <td style="width: 8%;"><b style="font-size: 12px;">Cost$</b></td>
                           <td style="width: 12%;"><b style="font-size: 12px;">Material Cost</b></td>
                           <td style="width: 10%;"><b style="font-size: 12px;">Total Cost</b></td>
                        </table>
                        </td>
                     </tr>
                     <tr>
                        <td class="show-border" style="text-align: left; border-top: thin solid; 
                        border-bottom: thin solid;">
                        <p style="height : 2em;"></p>   
                        </td>
                     </tr>
                    </tr>
                    <tr>
                     <td style="padding: 0em;">
                        <table cellspacing="0" cellpadding="0">
                           <tr class="show-border">
                              <td style="width: 33%;"><b>Prepared by :</b> Amos
                                 <br>
                                 <br>
                                 <br>
                              SIGINON CFS
                              </td>
                              <td style="width: 33%; text-align: left; border-left: thin solid; border-right: thin solid;"><b>Repair Estimated by </b>
                                 <br>
                                 <br>
                                 &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp________________________<br>
                                 Date
                              </td>
                              <td style="width: 33;"><b>Delivering driver signature</b>
                                 <br>
                                 <br>
                                 &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp________________________<br>
                                 Date
                              </td>
                           </tr>
                        </table>   
                     </td>
                  </tr>
                        
                  </table>
                  
               </td>
            </tr>
           </table>
           <p style="text-align: right; padding-top: 0px; margin-top: 0px;">Distribution : 1, Transporter : 2, Shpg Line 3 SIG</p>
        </div>
     </body>
  </html>
  `;
};
