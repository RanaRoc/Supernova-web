import { Injectable } from '@angular/core';
import { Console } from 'console';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfGenerationService {

  constructor() {}

  async fetchImageAsBase64(url: string): Promise<string> {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      referrer: 'no-referrer',
    });

    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(blob);
    });
  }

  getBase64ImageFromURL(url: string): Promise<string> {
    // Check if the URL is a Dropbox link
    if (url.includes('dropboxusercontent.com')) {
      return this.fetchImageAsBase64(url);
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('Context is null');
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/jpeg'); // Change format as needed
        resolve(dataURL);
      };
      img.onerror = (error) => {
        reject(error);
      };
    });
  }

  convertDropboxLink(originalLink: string): string {
    const dropboxUrlPattern = /^https:\/\/www\.dropbox\.com\/scl\/fi\//;
    if (!dropboxUrlPattern.test(originalLink)) {
      console.error('Invalid Dropbox link.');
      return originalLink;
    }
    const directLink = originalLink.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
    return directLink;
  }

  async generatePdfAsBase64(project): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        this.generatePdf(project, (pdfDoc) => {
          pdfDoc.getBase64((data) => {
            resolve(data);
          });
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  async generatePdf(project, callback) {
    try {
      const logoUrl = 'assets/images/logo.jpg';
      const base64Logo = await this.getBase64ImageFromURL(logoUrl);
      const villaUrl = 'assets/images/villa.jpg';
      const base64Villa = await this.getBase64ImageFromURL(villaUrl);
      const haitamUrl = 'assets/images/haitam.jpg';
      const base64Haitam = await this.getBase64ImageFromURL(haitamUrl);

      const content = [];
      const produits = [];
      // Iterate through each espace and load images one by one
      for (const espace of project.Espace) {
        const product = project.Products.find(p => p.Espace_a_traiter === espace.label);
        if (!product) continue;

        const espaceImage = await this.getBase64ImageFromURL(espace.image);
        const productImage = await this.getBase64ImageFromURL(this.convertDropboxLink(product.Photo_luminaire));

        content.push(
          { image: base64Logo, width: 100, margin: [0, 40, 0, 0] },
          { text: project.Nom, style: 'header', alignment: 'justify', color: '#344C64' },
          { text: `Nos conseils de luminaires pour l’espace : ${espace.label}`, bold: true, fontSize: 18, margin: [0, 20, 0, 20] },
          { image: espaceImage, width: 450, height: 300, margin: [0, 10, 0, 10] },
          {
            columns: [
              { image: productImage, width: 120 },
              {
                text: [
                  { text: ' Détail du produit \n', bold: true, fontSize: 20, margin: [70, 20, 20, 20] },
                  { text: `${product.Marque} - ${product.Modele} \n` },
                  { text: `Couleur : ${product.Finition} Forme : ${product.Forme} Puissance : ${product.Puissance} Température de couleur : ${product.Temperature_de_couleur} Type : ${product.Type} Faisceau : ${product.Faisceau} Description : ${product.Description}`, margin: [70, 20, 150, 20], alignment:'justify' },
                ],
                color: '#344C64'
              }
            ],
            columnGap: 20,
          },
          { text: "Supernova : Bureau d'étude éclairage\n+33 6 84 97 26 47\nwww.thesupernovabot.com\nhaitam@thesupernovabot.com\n", style: 'footer2', color: '#344C64' }
        );
      }
      for(const product of project.Products){
        const productImage = await this.getBase64ImageFromURL(this.convertDropboxLink(product.Photo_luminaire));

      produits.push(
        {
          columns: [
            { image: productImage, width: 120 },
            {
              text: [
                { text: ' Détail du produit \n', bold: true, fontSize: 20, margin: [70, 20, 20, 20] },
                { text: `${product.Marque} - ${product.Modele} \n` },
                { text: `Couleur : ${product.Finition} Forme : ${product.Forme} Puissance : ${product.Puissance} Température de couleur : ${product.Temperature_de_couleur} Type : ${product.Type} Faisceau : ${product.Faisceau} Description : ${product.Description}`, margin: [70, 20, 150, 20], alignment:'justify' },
              ],
              color: '#344C64'
            }
          ],
          columnGap: 80,
        },
        { text : "                                         "},
      )
      }

      const docDefinition = {
        content: [
          { image: base64Logo, width: 100 },
          { text: project.Nom, style: 'header', alignment: 'left', color: '#344C64' },
          { image: base64Villa, width: 500 },
          { text: 'Aide conceptuelle en éclairage', style: 'header', color: '#344C64' },
          { text: "Supernova : Bureau d'étude éclairage\n+33 6 84 97 26 47\nwww.thesupernovabot.com\nhaitam@thesupernovabot.com\n", style: 'footer', color: '#344C64' },
          { image: base64Logo, width: 100 },

          {
            columns: [
              { stack: [
                { image: base64Haitam, width: 200 },
                { text: 'Haitam LAADIDAOUI\nCEO Supernova', style: 'signature', color: '#344C64' }
              ]},
              {
                stack: [
                  { text: 'Avant-Propos', style: 'sectionHeader', color: '#344C64' },
                {
                  text: `En tant que passionné de lumière, ma priorité est
                    que mon entreprise porte les valeurs qui feront sa
                    renommée ainsi que celles qui lui permettront de
                    s'adapter à l'évolution de notre métier.

                    Locale : basée en France, je suis directement
                    impliqué dans la mission qui contribue à
                    l’avancement des projets. Interlocuteur de
                    proximité, réactivité, disponibilité, connaissance des
                    sites et qualité du travail réalisé.
                    Dépendant de mon positionnement local, je suis
                    guidé par la satisfaction des clients gage de la
                    pérennisation de mes activités

                    Expertise et passion : Avec un seul et unique
                    métier, je suis dédié exclusivement aux activités
                    d'Éclairage. A tous niveaux, je cherche le
                    développement des compétences notamment par
                    une veille technologique et des formations
                    techniques ciblées. Mon objectif est que toutes
                    mes propositions soient à une haute valeur ajoutée
                    technique vous garantissant ainsi un haut niveau de
                    technicité.

                    Responsable : Le développement responsable et
                    solidaire est la clé de voûte de toutes mes actions à
                    tous les niveaux. Celui-ci passe autant par le respect
                    des règles d’éthique dans les projets vis à vis de tous
                    les acteurs, que par la promotion de l'équité sociale
                    et le respect environnemental.

                    Innovante : Sur tous mes contrats, je cherche avec
                    mes clients des solutions innovantes pour
                    améliorer la performance de nos activités ou des
                    installations, je m'engage à vous proposer des
                    solutions qui optimisent l’avancement du projet
                    avec un engagement de performance énergétique.`,
                  style: 'content',
                  color: '#344C64', // Dark blue color
                  alignment: 'justify'
                }
              ], width:'58%'
              }
            ]
          },

          { text: "Supernova : Bureau d'étude éclairage\n+33 6 84 97 26 47\nwww.thesupernovabot.com\nhaitam@thesupernovabot.com\n", style: 'footer1', color: '#344C64' },
          { image: base64Logo, width: 100 },
          { text: project.Nom, style: 'header', alignment: 'center', color: '#344C64' },
          { text: 'Résumé de votre projet', style: 'subheader', color: '#344C64', bold: true, fontSize: 20 },
          {text: " La collecte d'informations préalable à votre projet est essentielle pour une conception efficace. Elle comprend la compréhension de vos besoins, des caractéristiques du site, et des contraintes réglementaires. En comprenant pleinement ces paramètre, nous tâchons de concevoir un concept d’éclairage confortable  et harmonieux avec son environnement", style: 'content', color: '#344C64', alignment:'justify',
            margin: [0, 20, 0, 0]},
          {
            text: [
              { text: 'Standing: ', bold: true },
              { text: project.Dashboard.Standing }
            ],
            color: '#344C64',
            margin: [0, 20, 0, 0]
          },
          {
            text: [
              { text: 'Style architectural: ', bold: true },
              { text: project.Dashboard.Style }
            ],
            color: '#344C64',
            margin: [0, 20, 0, 0]
          },
          {
            text: [
              { text: 'Segment: ', bold: true },
              { text: project.Dashboard.Segment }
            ],
            color: '#344C64',
            margin: [0, 20, 0, 0]
          },
          {
            text: [
              { text: 'Type: ', bold: true },
              { text: project.Dashboard.Type_de_projet }
            ],
            color: '#344C64',
            margin: [0, 20, 0, 0]
          },
          {
            text: [
              { text: 'Espaces à étudier: ', bold: true },
              { text: project.Espace.map((espace) => espace.label).join(', ') }
            ],
            color: '#344C64',
            margin: [0, 20, 0, 0]
          },
          {
            text: [
              { text: 'Surface de pose: ', bold: true },
              ...Object.keys(project.Dashboard.Surface_de_pose).map(key => [
                { text: `${key}: `, decoration: 'underline' },
                { text: `${project.Dashboard.Surface_de_pose[key]}, ` }
              ]).flat()
            ],
            color: '#344C64',
            margin: [0, 20, 0, 0]
          },
          {
            text: [
              { text: 'Matériaux de surface de pose: ', bold: true },
              ...Object.keys(project.Dashboard.Materiaux_de_surface_de_pose).map(key => [
                { text: `${key}: `, decoration: 'underline' },
                { text: `${project.Dashboard.Materiaux_de_surface_de_pose[key]}, ` }
              ]).flat()
            ],
            color: '#344C64',
            margin: [0, 20, 0, 0]
          },
          {
            text: [
              { text: 'Mode de pose: ', bold: true },
              ...Object.keys(project.Dashboard.Mode_de_pose).map(key => [
                { text: `${key}: `, decoration: 'underline' },
                { text: `${project.Dashboard.Mode_de_pose[key]}, ` }
              ]).flat()
            ],
            color: '#344C64',
            margin: [0, 20, 0, 0]

          },

          {
            text: [
              { text: 'Formes: ', bold: true },
              ...Object.keys(project.Dashboard.Forme).map(key => [
                { text: `${key}: `, decoration: 'underline' },
                { text: `${project.Dashboard.Forme[key]}, ` }
              ]).flat()
            ],
            color: '#344C64',
            margin: [0, 20, 0, 0]
          },
          {
            text: [
              { text: 'Finitions: ', bold: true },
              ...Object.keys(project.Dashboard.Finition).map(key => [
                { text: `${key}: `, decoration: 'underline' },
                { text: `${project.Dashboard.Finition[key]}, ` }
              ]).flat()
            ],
            color: '#344C64',
            margin: [0, 20, 0, 0]
          },
          { text:"Options : ",margin: [0, 20, 0, 0], color: '#344C64', bold: true},
          {
            ul: [
              project.options[0] ? 'Télécharger le concept éclairage' : '',
              project.options[1] ? 'Obtenir une estimation financière' : '',
              project.options[2] ? 'Essayer les produits en demo' : ''
            ],
            color: '#344C64',
            margin: [0, 20, 0, 0]
          },
          { text: "Supernova : Bureau d'étude éclairage\n+33 6 84 97 26 47\nwww.thesupernovabot.com\nhaitam@thesupernovabot.com\n", style: 'footer1', color: '#344C64', margin: [0, 150, 0, 0] },
          ...content,
          { image: base64Logo, width: 100, margin: [0, 40, 0, 40] },

          ...produits,
          { text: "Supernova : Bureau d'étude éclairage\n+33 6 84 97 26 47\nwww.thesupernovabot.com\nhaitam@thesupernovabot.com\n", style: 'footer1', color: '#344C64'},

          { image: base64Logo, width: 100, margin: [0, 40, 0, 0] },
          { text: project.Nom, style: 'header', alignment: 'center', color: '#344C64' },
          { text: 'Votre interlocuteur fabricant\n', style: 'subheader', color: '#344C64', bold: true, fontSize: 16 },
          { text: "Je m'appelle Alban et je votre interlocuteur fabricant\n", style: 'content', color: '#344C64', margin: [0, 20, 0, 0] , alignment:'justify'},
          { text: "Ce qui m'anime, c'est l'élégance et l'efficacité, des valeurs qui guident ma vie. J'apprécie le dynamisme intellectuel et je trouve mon équilibre dans les sports en plein air. L'inertie m'ennuie profondément, préférant l'actionà l'immobilisme. ",margin:[0,20,0,0], alignment:'justify'},
          { text:"Plutôt que de lister mes aversions, je préfère me concentrer sur  ce que j'aime et valorise. Mes qualités incluent un sens inné de l'esthétique, une appréciation du beau, et un bon sens qui guide mes choix et mes actions a quotidien.", margin: [0,15,0,0], alignment:'justify'},
          {
            columns:[{image: await this.getBase64ImageFromURL('assets/images/manu.jpg'), width: 150,  },
          { text: "K-DESIGN HOUSE\nAlban Grison\nCEO K-DESIGN HOUSE\n+ a.grison@k-designhouse.com\n/+33 6 43 1/7/ 29 79", alignment:'justify'
            }
          ],            columnGap: 40, margin: [0,40,0,40]
          // Index 0: Represents the right margin. Index 1: Represents the top margin. Index 2: Represents the left margin. Index 3: Represents the top margin.
        },
        ],
        styles: {
          header: { fontSize: 22, bold: true, margin: [20, 20, 20, 20], color: '#344C64' },
          subheader: { fontSize: 16, margin: [0, 10, 0, 5], color: '#344C64' },
          content: { fontSize: 12, margin: [0, 20, 0, 0], color: '#344C64' },
          sectionHeader: { fontSize: 18, bold: true, color: '#344C64' },
          signature: { margin: [0, 10, 0, 10], color: '#344C64', bold: true },
          footer1: { fontSize: 10, alignment: 'left', margin: [0, 100, 0, 30], color: '#344C64' },
          footer2: { fontSize: 10, alignment: 'left', margin: [0, 80, 0, 0], color: '#344C64' },
          footer: { fontSize: 10, alignment: 'left', margin: [0, 200, 0, 0], color: '#344C64' }
        }
      };
      console.log("Supposed to download");
      const pdfDoc = pdfMake.createPdf(docDefinition);

    if (callback) {
      callback(pdfDoc);
    } else {
      pdfDoc.download('Projet.pdf');
    }

    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }
}
