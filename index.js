const fs = require('fs');
const express = require('express');
const fileUpload = require('express-fileupload');
const compareImages = require('resemblejs/compareImages');

const { checkAndAddPath } = require('./utils/dirTools');

const app = express();

app.use(fileUpload());

app.get('/', (req, res) => res.send('Osmium: VRT and general image comparison tool'));

app.post('/baseline', (req, res) => {
    // TODO We should limit access to "keys" folders

    const image = req.files.image;
    const id = req.body.id;
    const fileDestination = `./screenshots/${id}/baseline/${image.name}`;

    checkAndAddPath(fileDestination);

    image.mv(fileDestination, (error) => {
        if (error) {
            console.error(error);
        }
    });

    return res.send('Baseline accepted and uploaded!');
});

app.post('/compare', async (req, res) => {
    const image = req.files.image;
    const id = req.body.id; // the key of the
    const branch = req.body.branch; // jira ticket id
    const tolerance = req.body.tolerance || 0.01;

    const baseDir = `./screenshots/${id}`;

    const baselineImage = `${baseDir}/baseline/${image.name}`;
    if (!fs.existsSync(baselineImage)) {
        return res.send('Baseline file does not exist');
    }

    // take a copy of the baseline file so that diff/fail has the right context later
    const baselineCopyDestination = `${baseDir}/${branch}/baseline/${image.name}`;
    checkAndAddPath(baselineCopyDestination);
    fs.copyFileSync(baselineImage, baselineCopyDestination);

    const baseline = fs.readFileSync(baselineCopyDestination);

    const fileDestination = `./screenshots/${id}/${branch}/results/${image.name}`;
    checkAndAddPath(fileDestination);

    // keep a copy of the screenshot as is
    image.mv(fileDestination, (error) => {
        if (error) {
            console.error(error);
        }
    });

    const data = await compareImages(baseline, image.data);

    if (data.misMatchPercentage > tolerance) {
        const suffix = fileDestination.substring(fileDestination.lastIndexOf('.'));
        const diffDestination = fileDestination.replace(suffix, `.diff${suffix}`);
        await fs.writeFile(diffDestination, data.getBuffer());
    }

    return res.send(data);
});

app.listen(3000, () => console.log('Server is running!'));

/**
 * The following is to be used if we want others to be able to "generate" their own key for storing images
 */
// app.get('/generate-baseline-key', (req, res) => res.send(guid()));
//
// function guid() {
//     return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
//         s4() + '-' + s4() + s4() + s4();
// }
//
// function s4() {
//     return Math.floor((1 + Math.random()) * 0x10000)
//         .toString(16)
//         .substring(1);
// }
