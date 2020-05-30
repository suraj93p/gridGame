window.onload = function () {
    var tag = document.createElement("script");
    tag.src = "js/config.js";
    document.getElementsByTagName("head")[0].appendChild(tag);
    chooseLevel();
};

function chooseLevel() {
    var options = '<option>Low Level</option><option>Medium Level</option><option>High Level</option>';
    document.getElementById('level').innerHTML = options;
}

function startGame() {
    var selectedLevel = document.getElementById('level').value;
    var levelToGo = '';
    switch (selectedLevel) {
        case 'Low Level': levelToGo = 'lowLevel';
            break;
        case 'Medium Level': levelToGo = 'midLevel';
            break;
        case 'High Level': levelToGo = 'highLevel';
            break;
    };
    localStorage.setItem('level', levelToGo);
    document.getElementById('startGame').setAttribute('style', 'display:none');
    setPredefinedData();
}

function setPredefinedData() {
    var gameLevel = localStorage.getItem('level');
    if (typeof gameLevel === 'undefined' || gameLevel === '' || gameLevel === null) {
        level = config.lowLevel;
        localStorage.setItem('level', 'lowLevel');
    } else {
        level = config[gameLevel];
    };
    score = 0;
    timer = 0;
    renderBoard();
    setInterval(randomCellColor, level.timer);
    var myTable = this.document.getElementById('myTable');
    myTable.addEventListener('click', checkScore);
}

function renderBoard() {
    var table = document.createElement('table');
    table.setAttribute("id", 'myTable');
    var tableBody = document.createElement('tbody');
    var idNo = 1;
    for (var i = 0; i < level.size; ++i) {
        var row = document.createElement('tr');
        for (var j = 0; j < level.size; ++j) {
            var cell = document.createElement('td');
            var idNumber = idNo++;
            cell.setAttribute("id", 'id' + idNumber);
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
    table.appendChild(tableBody);
    var myDiv = document.getElementById('gameBoard');
    myDiv.appendChild(table);
    document.getElementById('scoreDiv').innerHTML = "Score:0";
};

function randomCellColor() {
    if (timer < level.timerLimit) {
        var allTd = document.getElementsByTagName('td');
        debugger;
        Array.from(allTd).forEach(function (td) {
            td.classList.remove("bgColor");
        });
        var randomNo = Math.ceil(Math.random() * level.size * level.size);
        var cellToColor = document.getElementById('id' + randomNo);
        cellToColor.setAttribute("class", "bgColor");
        timer += level.timer;
        document.getElementById('timer').innerHTML = 'Time Passed:' + Math.floor(timer / 1000) + '  secs';
    } else {
        document.getElementById('gameBoard').setAttribute("style", "display: none;");
        document.getElementById('scoreDiv').setAttribute("style", "display: none;");
        document.getElementById('gameOver').setAttribute("style", "display: block;");
        document.getElementById('gameOver').innerHTML = "Game Over Man<br>Score:" + score;
        localStorage.setItem("highScore", score);
        if (confirm("Game Over")) {
            location.reload();
        }
        document.getElementById('startGame').setAttribute('style', 'display:block');
    }
};

function checkScore(e) {
    if (Array.from(e.target.classList).indexOf('bgColor') > -1) {
        score++;
    } else {
        if (score <= 0) {
            score = 0;
        } else {
            score--;
        }
    }

    document.getElementById('scoreDiv').innerHTML = "Score:" + score;
};