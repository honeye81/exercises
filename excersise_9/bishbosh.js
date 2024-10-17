document.getElementById('runButton').addEventListener('click', function () {
    let bish = parseInt(document.getElementById('bishNumber').value);
    let bosh = parseInt(document.getElementById('boshNumber').value);
    let limit = parseInt(document.getElementById('limitNumber').value);
    
    let resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    for (let i = 1; i <= limit; i++) {
        let output = '';

        if (i % bish === 0 && i % bosh === 0) {
            output = 'Bish-Bosh';
        } else if (i % bish === 0) {
            output = 'Bish';
        } else if (i % bosh === 0) {
            output = 'Bosh';
        } else {
            output = i;
        }

        resultsDiv.innerHTML += output + ', ';
    }
});
