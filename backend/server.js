// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mailjet = require('node-mailjet').apiConnect('55e759da9c12781517ac35f998a468ad', 'c27c14cfdc52d4f62b0cf524bb2b58b3');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/send-email', async (req, res) => {
  const { email, nom, prenom } = req.body;

  const request = mailjet
  .post("send", {'version': 'v3.1'})
  .request({
    "Messages":[
      {
        "From": {
          "Email": "narawmind@gmail.com",
          "Name": "Rana"
        },
        "To": [
          {
            "Email": email,
            "Name": "Client"
          }
        ],
        "Subject": "Bienvenue à Supernova",
        "TextPart": "Création de compte réussie et demande d'attendre la confirmation de l'administrateur pour activer votre compte.",
        "HTMLPart": "<h3>Bonjour "+ prenom +" "+ nom +"</h3><br /> <p>Votre compte a bien été crée, pour des raisons de sécurité, on vous prie d'attendre la confirmation de l'administrateur pour activer votre compte.</p><br /><p>Merci de votre confiance.</p><p> Un nouveau mail vous sera envoyé pour vous informer de l'activation de votre compte.</p> <br /> <p> Cordialement, </p> <p> L'équipe Supernova</p>",
        "CustomID": "AppGettingStartedTest"
      }
    ]
  })
  request
    .then((result) => {
      console.log(result.body)
    })
    .catch((err) => {
      console.log(err.statusCode)
    })

  try {
    const result = await request;
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sending email' });
  }
});


app.listen(3000, () => {
  console.log('Server running on port 3000');
});
