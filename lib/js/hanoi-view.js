(function () {
  var Hanoi = window.Hanoi = (window.Hanoi || {});

  var View = Hanoi.View = function View (game, $el) {
    this.game = game;
    this.towers = $el;
    this.fromIndex = -1;

    this.render();
  };

  View.prototype.bindEvents = function () {
    var self = this;

    $(".tower").on("click", function (event) {
      self.clickTower($(event.currentTarget));
    })
  };

  View.prototype.clickTower = function (tower) {
    if (this.fromIndex > -1) {
      var fromIndex = this.fromIndex,
          toIndex   = tower.index();
      if (fromIndex !== toIndex) {
        if (this.game.move(fromIndex, toIndex)) {
          this.render();
          if (this.game.isWon()) {
            this.towers.children().addClass("game-over");
            this.towers.children().eq(toIndex).addClass("winning-tower");
            this.towers.children().off("click");
            alert("You win!")
          }
        } else {
          alert("Invalid move!")
        }
      }

      var fromTower = this.towers.children().eq(fromIndex);
      fromTower.removeClass("from-tower");
      this.fromIndex = -1;

    } else {
      tower.addClass("from-tower");
      this.fromIndex = tower.index();
    }
  };

  View.prototype.render = function () {
    this.towers.html(
      '<div class="tower"></div>\
      <div class="tower"></div>\
      <div class="tower"></div>'
    )

    for (var i = 0; i < 3; i++) {
      this.renderTower(i);
    }

    this.bindEvents();
  };

  View.prototype.renderTower = function (towerIdx) {
    var viewTower = this.towers.children().eq(towerIdx);
    var gameTower = this.game.towers[towerIdx].slice();

    var classes = ["no-disc", "small-disc", "medium-disc", "large-disc"]

    while (gameTower.length < 3) {
      gameTower.push(0);
    };

    gameTower.forEach(function (discSize) {
      viewTower.prepend('<div class="' + classes[discSize] + '"></div>')
    });
  };
})();
