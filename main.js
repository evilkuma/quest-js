
/**
 * Задание 1:
 * 
 * 0: Взглянуть одним глазом:
 *      Метод random был перекинут внутри стандартного
 *      обьекта Math.
 * 
 * -- Start --
 * 
 * 1) Создать класс Wall (стена):
 *      @param x - позиция по оси X
 *      @param y - позиция по оси Y
 *      @param w - ширна
 *      @param h - высота
 *      метод draw - отрисовывать квадрат на канвасе
 * 
 *      Параметры хранить в соответствующих атрибутах класса.
 * 2) Для класса Wall создать метод cross:
 *      @param x - позиция по оси X
 *      @param y - позиция по оси Y
 *      @param w - ширна
 *      @param h - высота
 *      @return Boolean
 *      Логику оставим на следующий урок, так что внутрь оставим:
 *      // TODO: is intersects 2 2d boundingboxes
 * 3) Создать класс Level:
 *      @param data Array - список данных для стен
 *      атрибут walls Array - список стен
 *      метод draw - проходиться по списку стен и вызывать
 *          на каждой draw 
 * 
 *      при создании обьекта применяя данные из data заполнять
 *      массив walls обьектами типа Wall 
 *      
 * 4) Был создан обьект GM(GameMode) - доработать:
 *      Обьект отвечает за общую логику игры. В нему должны храниться о
 *      данные об уровне. Так же была создана папка lvls и файл 0.js.
 *      Файл должен включаться тегом script в index-е. В нем должна быть
 *      прописана логика добавляющая список стен для уровня.
 *      
 *      Дополнить GM: 
 *      атрибут lvl по-умолчанию 0 - значение текущего уровня
 *      переписать метод addLevel, что бы он создавал экземпляр класса Level
 *      метод drawCurrentLevel - вызывать draw на текущем уровне
 *      метод startGame переместить в GM
 *      метод update - заменить им текущий метод drawScene и добавить 
 *          вызов метода drawCurrentLevel
 * 5) В файле lvls/0.js описать данные так, что бы в результать отрисовалась
 *    закрытвая сцена.
 * 
 * -- Finish --
 *      
 */

Math.rand = function(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}

// Глобальные переменные.
var canvas, ctx, mouse, snake, GM;

// Инициализация Canvas
function init() {
    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.style.background = '#FFFFFF';
    canvas.width = 1300;
    canvas.height = 800;
    ctx = canvas.getContext('2d');
    startGame();
}

GM = {
    lvls: [],
    addLevel(func) {
        if(typeof func === 'function') {
            this.lvls.push(func(canvas.width, canvas.height));
            return;
        }
        console.error('can`t add lvl');
    }
};

function startGame() {
    mouse = new Mouse();
    snake = new Snake(50, 50);
    document.body.onkeyup = function(e) {
        if([37, 38, 39, 40].includes(e.keyCode)) {
            var new_v = e.keyCode - 36;
            if(snake.v % 2 !== new_v % 2) {
                snake.v = new_v;
            }
        }
    }

    drawScene();
}

function Mouse() {
    this.r = 20;
    this.x = Math.rand(this.r, canvas.width - this.r);
    this.y = Math.rand(this.r, canvas.height - this.r);
    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, Math.PI, -Math.PI);
        ctx.fill();
    }
}

/**
 * vector
 * 1 - left
 * 2 - top
 * 3 - right
 * 4 - bottom
 */
function Snake(x, y) {
    this.x = x;
    this.y = y;
    this.w = 20;
    this.h = 20;
    this.v = 4;
    this.speed = 5;

    this.draw = function() {
        switch(this.v) {
            case 2: 
                this.y -= this.speed;
                break;
            case 3:
                this.x += this.speed;
                break;
            case 4:
                this.y += this.speed;
                break;
            case 1:
                this.x -= this.speed;
                break;
        }

        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fill();
    };
}

function Body(x, y) {

}

function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    mouse.draw();
    snake.draw();

    requestAnimationFrame(drawScene);
}

// Стена
function Wall(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.draw = function () {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fill();
    };

    this.cross = function (x, y, w, h) {
        // TODO: is intersects 2 2d boundingboxes
    };
}
function Level (data) {
    this.walls = [];
    this.draw = function () {
        for(var i in this.walls) {
            this.walls[i].draw();
        }
    };

    (function(){
        for(var i in data){
            this.walls.push(new Wall(data[i][0], data[i][1], data[i][2], data[i][3]))
        }
    })()
}

new Level([
    [0, 40, 30, 30],
    [20, 30, 10, 30]
])

init();
