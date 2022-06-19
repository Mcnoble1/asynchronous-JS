const fs = require('fs');
const superagent = require('superagent');

const readFilePromise = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                reject("I couldn't find that file 😢");
            } else {
                resolve(data);
            }
        });
    });
}   

const writeFilePromise = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) {
                reject("I couldn't find that file 😢");
            } else {
                resolve('Success');
            }
        });
    });
}

readFilePromise(`${__dirname}/dog.txt`)
.then(data => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    }).then(res => {                         
        console.log(res.body.message);
        return writeFilePromise('dog-img.txt', res.body.message);
        }).then(() => {
            console.log("I wrote the file!");
        }).catch(err => {
            console.log(err);
        }).catch(err => {
    console.log(err);
});