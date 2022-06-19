const fs = require('fs');
const superagent = require('superagent');
fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Breed: ${data}`);
    }

    superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)     // pending promise
        .then(res => {                           // fulfilled promise
            if (err) return console.log(err.message);
            console.log(res.body.message);

            fs.writeFile('dog-img.txt', res.body.message, err => {
                if (err) return console.log(err.message);
                console.log(`Random ${data} image saved to dog-img file`);
            } )
        }).catch(err => {
            console.log(err.message);
        })   
})
