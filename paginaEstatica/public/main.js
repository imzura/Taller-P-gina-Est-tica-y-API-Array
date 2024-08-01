document.getElementById('dateForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);

    const timeDiff = endDate - startDate;
    const daysDiff = timeDiff / (1000 * 3600 * 24);

    document.getElementById('result').innerText = `${daysDiff}`

})