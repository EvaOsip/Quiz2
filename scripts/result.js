(function () {
    const Result = {
        init() {
            const url = new URL(location.href);
            document.getElementById('result-score').innerText = url.searchParams.get('score')
                + '/' + url.searchParams.get('total');
        }


    }
    let answersLink = document.getElementById('right-answers-link')
    answersLink.onclick = (function () {
        location.href = 'right-answers.html' + location.search;
    })
    Result.init();
})();