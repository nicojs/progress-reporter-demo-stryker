const ProgressBar = require('progress');

const mutants = [];
for (let i = 0; i < 1000; i++) {
    const rand = Math.random();
    const status = rand < .6 ? 'killed' :
        rand < .9 ? 'survived' :
            rand < .95 ? 'timeout' :
                'error';
    mutants.push({ status })
}


const bar = new ProgressBar('Mutation testing [:bar] :percent :etas ' +
    '[:killed killed] [:survived survived] [:timeout timeout] [:error error]', {
        complete: '=',
        incomplete: ' ',
        width: 30,
        total: mutants.length
    });

let error = 0, survived = 0, killed = 0, timeout = 0;
const tick = () => {
    const mutant = mutants.pop();
    switch (mutant.status) {
        case 'killed':
            killed++;
            break;
        case 'survived':
            survived++;
            break;
        case 'error':
            error++;
            break;
        case 'timeout':
            timeout++;
    }
    if (mutant.status === 'killed') {
        killed++;
    }

    bar.tick({ error, survived, killed, timeout });
    if (bar.complete) {
        intervals.forEach(interval => clearInterval(interval));
    }
};

const intervals = [];
for (let i = 0; i < 5; i++) {
    intervals.push(setInterval(tick, Math.random() * 1000));
}

