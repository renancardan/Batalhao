const updateAllFromCollection = async (collectionName) => {
    const firebase = require('firebase-admin')

    const collection = firebase.firestore().collection(collectionName)

    const newDocumentBody = {
        message: 'hello world'
    }

    collection.where('message', '==', 'goodbye world').get().then(response => {
        let batch = firebase.firestore().batch()
        response.docs.forEach((doc) => {
            const docRef = firebase.firestore().collection(collectionName).doc(doc.id)
            batch.update(docRef, newDocumentBody)
        })
        batch.commit().then(() => {
            console.log(`updated all documents inside ${collectionName}`)
        })
    })
}


//criar pdf 
var pegar_dados  = document.getElementById('dados').innerHTML;
var janela = window.open('', '', 'width=800, heigth=600'  );
janela.document.write('<html><head>');
janela.document.write('<title>Pdf</title></head>');
janela.document.write('<body>');
janela.document.write(pegar_dados);
janela.document.write('</body></html>');
janela.document.close();
janela.print();