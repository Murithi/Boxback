const express = require("express");
const bodyParser = require("body-parser");
const pdf = require("html-pdf");
const cors = require("cors");
const pdfTemplate = require("./documents");
const path = require("path");
nodeMailer = require("nodemailer");
const moment = require("moment");

var template = path.join(__dirname, "documents/doc.html");
const fs = require("fs");
var filename = template.replace(".html", ".pdf");

var options = {
  // width: '50mm',
  // height: '90mm'
};

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const makeTemplate = (data) => {
  let templateHtml = fs.readFileSync(template, "utf8");
  let image = path.join("file://", __dirname, "img/container.png");
  let logoimage = path.join("file://", __dirname, "img/logo.jpeg");
  templateHtml = templateHtml.replace("{{image}}", image);
  templateHtml = templateHtml.replace("{{logo_image}}", logoimage);
  const selectedTime = moment(new Date(data.inTimeICD)).format("HH.mm");

  templateHtml = templateHtml.replace("{{selectedTime}}", selectedTime);
  templateHtml = templateHtml.replace("{{bblEIR}}", data.bblEIR);
  templateHtml = templateHtml.replace("{{selectedDate}}", data.inDateICD);
  templateHtml = templateHtml.replace("{{location}}", data.pOL);
  templateHtml = templateHtml.replace("{{containerNum}}", data.containerNum);
  templateHtml = templateHtml.replace("{{containerSize}}", data.containerSize);
  templateHtml = templateHtml.replace("{{dest}}", data.pOD);
  templateHtml = templateHtml.replace("{{shipping_line}}", data.clientCode);
  templateHtml = templateHtml.replace("{{bl_no}}", data.bblEIR);
  templateHtml = templateHtml.replace("{{vessel}}", data.fileBillingNumber);
  templateHtml = templateHtml.replace("{{voy_no}}", data.vessel);
  templateHtml = templateHtml.replace("{{truck_no}}", data.modeOfTransportId);
  templateHtml = templateHtml.replace("{{driver}}", data.deliveryDriverName);
  templateHtml = templateHtml.replace(
    "{{transporter}}",
    data.partyDeliveringName
  );
  templateHtml = templateHtml.replace(
    "{{partydelivering}}",
    data.partyDeliveringName
  );
  templateHtml = templateHtml.replace("{{delivery_note}}", "");

  let damages_str = "";
  let totalcost = 0;
  let containerDamages = [];
  if (data.operatorCode) {
    data.containerDamages.map((repair) => {
      containerDamages.push(repair.repair);
    });
    templateHtml = templateHtml.replace(
      "{{reciever}}",
      data.recievedICDBy.name
    );
    templateHtml = templateHtml.replace(
      "{{estimated_by}}",
      data.recievedICDBy.name
    );
  } else {
    containerDamages = data.containerDamages;
    templateHtml = templateHtml.replace("{{reciever}}", data.name);
    templateHtml = templateHtml.replace("{{estimated_by}}", data.name);
  }

  containerDamages.forEach((damage) => {
    totalcost += damage.materialCost;
    damages_str =
      damages_str +
      '<tr>\
                        <td>\
                           <table cellpadding="0" cellspacing="0"> <tr style="height:10px">\
                           <td style="width: 10%;"><b style="font-size: 9px;"><i>' +
      damage.repairCode +
      '</i></b></td>\
                           <td style="width: 40%;"><b style="font-size: 9px;"><i>' +
      damage.description +
      '</i></b></td>\
                           <td style="width: 6%;"><b style="font-size: 9px;"></b></td>\
                           <td style="width: 6%;"><b style="font-size: 9px;"><i>' +
      damage.manhours +
      '</i></b></td>\
                           <td style="width: 6%;"><b style="font-size: 9px;"></b></td>\
                           <td style="width: 8%;"><b style="font-size: 9px;"></b></td>\
                           <td style="width: 12%;"><b style="font-size: 9px;"><i>' +
      damage.materialCost +
      '</i></b></td>\
                           <td style="width: 10%;"><b style="font-size: 9px;"></b></td></tr>\
                        </table>\
                        </td>\
                     </tr>';
  });
  damages_str =
    damages_str +
    '<tr>\
                        <td>\
                           <table cellpadding="0" cellspacing="0">\
                           <td style="width: 10%;"><b style="font-size: 9px;"></b></td>\
                           <td style="width: 40%;"><b style="font-size: 9px;"></b></td>\
                           <td style="width: 6%;"><b style="font-size: 9px;"></b></td>\
                           <td style="width: 6%;"><b style="font-size: 9px;"></b></td>\
                           <td style="width: 6%;"><b style="font-size: 9px;"></b></td>\
                           <td style="width: 8%;"><b style="font-size: 9px;"></b></td>\
                           <td style="width: 12%;"><b style="font-size: 9px;"></b></td>\
                           <td style="width: 10%;"><b style="font-size: 9px;"><i>' +
    totalcost +
    "</i></b></td>\
                        </table>\
                        </td>\
                     </tr>";

  templateHtml = templateHtml.replace("{{damages_table}}", damages_str);
  return templateHtml;
};
// POST - PDF generation and data fetching
app.post("/create-pdf", async (req, res) => {
  const data = req.body;
  const filename = `${__dirname}/documents/${data.bblEIR}.pdf`;
  pdf.create(makeTemplate(data), options).toFile(filename, (err, pdf) => {
    console.log(err);
    if (err) {
      res.send(Promise.reject());
    }
    console.log(pdf);
    res.send(Promise.resolve());
  });
});
//GET - Send the generated PDF to the client

app.post("/send-email", (req, res) => {
  const data = req.body;
  let filename = data.bblEIR + ".pdf";
  pdf.create(makeTemplate(data), options).toFile(filename, (err, pdf) => {
    if (err) return console.log(err);
    console.log(pdf.filename);
    // res.send(Promise.resolve());
    console.log("Sending Email");
    let transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        // should be replaced with real sender's account
        user: "johnestest2@gmail.com",
        pass: "dashboard2.0",
      },
    });
    const { clientEmail } = data;
    fs.readFile(pdf.filename, async function (err, data) {
      await transporter.sendMail({
        sender: "sender@sender.com",
        subject: "Attachment!",
        to: clientEmail,
        body: "mail content...",
        attachments: [{ filename: "attachment.pdf", content: data }],
      }),
        function (error, info) {
          if (error) {
            return console.log(error);
          }

          console.log("Message %s sent: %s", info.messageId, info.response);
        };
    });
  });
});
app.get("/fetch-pdf/:id", (req, res) => {
  let id = req.params.id;
  res.sendFile(`${__dirname}/documents/${id}.pdf`);
});
// app.get("/fetch-pdf/:id", respond, removeFile);

// function removeFile(req, res) {
//   let id = req.params.id;
//   let filename = `${__dirname}/documents/${id}.pdf`;
//   fs.unlinkSync(filename);
// }

// function respond(req, res, next) {
//   let id = req.params.id;
//   res.sendFile(`${__dirname}/documents/doc.pdf`);
//   next();
// }

app.listen(port, () => console.log(`Listening on port ${port}`));
