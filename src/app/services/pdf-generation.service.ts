import { Injectable } from '@angular/core';
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


  async generatePdf(project) {
    try {
      const logoUrl = 'assets/images/logo.jpg';
      const base64Logo = await this.getBase64ImageFromURL(logoUrl);
      const villaUrl = 'assets/images/villa.jpg';
      const base64Villa = await this.getBase64ImageFromURL(villaUrl);
      const haitamUrl = 'assets/images/haitam.jpg';
      const base64Haitam = await this.getBase64ImageFromURL(haitamUrl);

      const content = [];

      // Iterate through each espace and load images one by one
      for (const espace of project.Espace) {
        const product = project.Products.find(p => p.Espace_a_traiter === espace.label);
        if (!product) continue;

        const espaceImage = await this.getBase64ImageFromURL(espace.image);
        const productImage = await this.getBase64ImageFromURL(this.convertDropboxLink(product.Photo_luminaire));

        content.push(
          { image: base64Logo, width: 100, margin: [0, 40, 0, 0] },
          { text: project.Nom, style: 'header', alignment: 'center', color: '#344C64' },
          { text: `Nos conseils de luminaires pour l’espace : ${espace.label}`, bold: true, fontSize: 18, margin: [0, 20, 0, 20] },
          { image: espaceImage, width: 450, height: 300, margin: [20, 10, 0, 10] },
          {
            columns: [
              { image: productImage, width: 120 },
              {
                text: [
                  { text: ' Détail du produit \n', bold: true, fontSize: 20, margin: [70, 20, 20, 20] },
                  { text: `${product.Marque} - ${product.Modele} \n` },
                  { text: `Couleur : ${product.Finition} Forme : ${product.Forme} Puissance : ${product.Puissance} Température de couleur : ${product.Temperature_de_couleur} Type : ${product.Type} Faisceau : ${product.Faisceau} Description : ${product.Description}`, margin: [70, 20, 150, 20] },
                ],
                color: '#344C64'
              }
            ],
            columnGap: 20,
          },
          { text: '+33 6 84 97 26 47\nwww.thesupernovabot.com\nhaitam@thesupernovabot.com\n', style: 'footer2', color: '#344C64' }
        );
      }

      const docDefinition = {
        content: [
          { image: base64Logo, width: 100 },
          { text: project.Nom, style: 'header', alignment: 'center', color: '#344C64' },
          { image: base64Villa, width: 500 },
          { text: 'Aide conceptuelle en éclairage', style: 'header', color: '#344C64' },
          { text: '+33 6 84 97 26 47\nwww.thesupernovabot.com\nhaitam@thesupernovabot.com\n', style: 'footer', color: '#344C64' },
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
                  color: '#344C64' // Dark blue color
                }
              ], width:'58%'
              }
            ]
          },
          { text: '+33 6 84 97 26 47\nwww.thesupernovabot.com\nhaitam@thesupernovabot.com\n', style: 'footer1', color: '#344C64' },
          { image: base64Logo, width: 100 },
          { text: project.Nom, style: 'header', alignment: 'center', color: '#344C64' },
          { text: 'Résumé de votre projet', style: 'subheader', color: '#344C64', bold: true, fontSize: 20 },
          { text: "La collecte d'informations préalable à votre projet...", style: 'content', color: '#344C64', margin: [0, 20, 0, 0] },
          // Additional project details...
          { text: '+33 6 84 97 26 47\nwww.thesupernovabot.com\nhaitam@thesupernovabot.com\n', style: 'footer1', color: '#344C64', margin: [0, 150, 0, 0] },
          ...content,
          { image: base64Logo, width: 100, margin: [0, 40, 0, 0] },
          { text: project.Nom, style: 'header', alignment: 'center', color: '#344C64' },
          { text: 'Votre interlocuteur fabricant\n', style: 'subheader', color: '#344C64', bold: true, fontSize: 20 },
          { text: "Je m'appelle Alban et je votre interlocuteur fabricant\n", style: 'content', color: '#344C64' }
          // More content...
        ],
        styles: {
          header: { fontSize: 22, bold: true, margin: [20, 20, 20, 20], color: '#344C64' },
          subheader: { fontSize: 16, margin: [0, 10, 0, 5], color: '#344C64' },
          content: { fontSize: 12, alignment: 'left', margin: [0, 20, 0, 0], color: '#344C64' },
          sectionHeader: { fontSize: 18, bold: true, alignment: 'left', color: '#344C64' },
          signature: { margin: [0, 10, 0, 10], color: '#344C64', bold: true },
          footer1: { fontSize: 10, alignment: 'left', margin: [0, 50, 0, 0], color: '#344C64' },
          footer2: { fontSize: 10, alignment: 'left', margin: [0, 100, 0, 0], color: '#344C64' },
          footer: { fontSize: 10, alignment: 'left', margin: [0, 200, 0, 0], color: '#344C64' }
        }
      };

      pdfMake.createPdf(docDefinition).download('Projet.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }
}
