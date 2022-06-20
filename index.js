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

const getDogPic = async () => {
    try{
        const data = await readFilePromise(`${__dirname}/do.txt`)
        console.log(`Breed: ${data}`);
    
        const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        console.log(res.body.message); // prints the url of the dog pic
    
        await writeFilePromise('dog-img.txt', res.body.message);
        console.log("Random dog image saved to file!");
    } catch (err) {
        console.log(err);
        throw err;
    }
   return '2: READY 🐶';	
};
console.log('1: will get dog pics');
getDogPic().then(x => {
    console.log(x);
    console.log('3: Done getting dog pics'); 
}).catch(err => {
    console.log('ERROR 🔥')
})


// readFilePromise(`${__dirname}/dog.txt`)
// .then(data => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//     }).then(res => {                         
//         console.log(res.body.message);
//         return writeFilePromise('dog-img.txt', res.body.message);
//         }).then(() => {
//             console.log("I wrote the file!");
//         }).catch(err => {
//             console.log(err);
//         });