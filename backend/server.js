// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mailjet = require('node-mailjet').apiConnect('55e759da9c12781517ac35f998a468ad', 'c27c14cfdc52d4f62b0cf524bb2b58b3');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/send-email-pdf', async (req, res) => {
  const { email, nom, prenom,pdfAttachment  } = req.body;

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
            "Email": "haitam@thesupernovabot.com",
            "Name": "Haitam"
          }
        ],
        "Subject": "Nouveau projet crée sur Supernova",
        "TextPart": "Nouveau projet crée sur Supernova, veuillez le consulter.",
        "HTMLPart": "<h3>Bonjour Haitam </h3><br /> <p> Cette personne dont le nom est : " + nom +" et le prenom est : " +  prenom + " et dont le mail est : "+ email+" vient de créer un projets; tous les détails sont consultables dans le PDF </p> <br /> <p> Cordialement, </p>",
        "CustomID": "AppGettingStartedTest",
        "Attachments": [
          {
            "ContentType": "application/pdf",
            "Filename": "Projet.pdf",
            "Base64Content": pdfAttachment
          }
        ]
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

app.post('/api/send-email-admin', async (req, res) => {
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
            "Email": "haitam@thesupernovabot.com",
            "Name": "Haitam"
          }
        ],
        "Subject": "Nouveau compte crée sur Supernova",
        "TextPart": "Création de compte réussie et demande d'attendre la confirmation de l'administrateur pour activer votre compte.",
        "HTMLPart": "<h3>Bonjour Haitam </h3><br /> <p> Cette personne dont le nom est : " + nom +" et le prenom est : " +  prenom + " et dont le mail est : "+ email+" a essaye de creer un compte, veuillez le confirmer ou le supprimer </p> <br /> <p> Cordialement, </p>",
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
        "CustomID": "AppGetting"
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

app.post('/api/send-email-confirmation', async (req, res) => {
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
        "Subject": "Confirmation de votre compte Supernova",
        "TextPart": "Confirmation de l'administrateur d'activation de votre compte.",
        "HTMLPart": "<h3>Bonjour "+ prenom +" "+ nom +",</h3><br /> <p>Votre compte a bien été confirmé, vous pouvez vous connectez immédiatement.</p><br /><p>Merci de votre confiance.</p> <br /> <p> Cordialement, </p> <p> L'équipe Supernova</p>",
        "CustomID": "AppGettingStar"
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
