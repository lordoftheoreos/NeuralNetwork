let trainedNet;

function encode(arg) {
    return arg.split('').map(x => (x.charCodeAt(0) / 256));
}

function processTrainingData(data) {
    return data.map(d => {
        return {
            input: encode(d.input),
            output: d.output
        }
    })
}

function train(data) {
    let net = new brain.NeuralNetwork();
    net.train(processTrainingData(data));
    trainedNet = net.toFunction();
};

function execute(input) {
    let results = trainedNet(encode(input));
    console.log(results)
    let output;
    let certainty;
    if (results.CERN > results.NASA) {
        output = 'CERN'
        certainty = Math.floor(results.CERN * 100)
    } else { 
        output = 'NASA'
        certainty = Math.floor(results.NASA * 100)
    }

    return "I think that this is from " + output + "!";
}

train(trainingData);
console.log(execute("The Space Environment Testbeds mission studies how to protect satellites by assessing how the space environment near Earth affects hardware performance."));