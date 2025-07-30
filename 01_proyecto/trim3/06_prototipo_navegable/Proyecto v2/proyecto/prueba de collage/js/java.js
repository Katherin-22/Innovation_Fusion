"use strict";
$(document).ready(function() {

    var rows = 4; //change this also in css
    var cols = 6; //change this also in css
    var staggerTime = 150;

    var urls = [
        "../img/img1.jfif",
        "../img/img2.jpg",
        "../img/img3.jfif",
        "../img/img4.jpg",
        "../img/img5.jpg",
        "../img/img6.jpg",
        "../img/img7.webp",
        "../img/img8.png",
        "../img/img9.jfif",
        "../img/img10.webp",
        "../img/img11.jpeg",
        "../img/img12.webp",
        "../img/img13_.jpg",
        "../img/img14.jpg",
        "../img/img15.jpg",
        "../img/img16.webp",
        "../img/img17.webp",
        "../img/img18.jpg",
        "../img/img19.jpg",
        "../img/img20.webp",
        "../img/img21.jpg",
        "../img/img22.jpg",
        "../img/img23.jpeg",
        "../img/img24.webp"
    ];

    var $gallery = $(".demo__gallery");
    var $help = $(".demo__help");
    var partsArray = [];
    var reqAnimFr = (function() {
        return window.requestAnimationFrame || function(cb) {
            setTimeout(cb, 1000 / 60);
        }
    })();


    $gallery.html('');
    for (let row = 1; row <= rows; row++) {
        partsArray[row - 1] = [];
        for (let col = 1; col <= cols; col++) {
            $gallery.append(`<div class="show-front demo__part demo__part-${row}-${col}" row="${row}" col="${col}"><div class="demo__part-back"><div class="demo__part-back-inner"></div></div><div class="demo__part-front"></div></div>`);
            partsArray[row - 1][col - 1] = new Part();
        }
    }

    var $parts = $(".demo__part");
    var $image = $(".demo__part-back-inner");
    var help = true;

    for (let i = 0; i < $parts.length; i++) {
        $parts.find(".demo__part-front").eq(i).css("background-image", `url(${urls[i]})`);
    }

    $gallery.on("click", ".demo__part-front", function() {

        $image.css("background-image", $(this).css("background-image"));
        if (help) {
            help = false;
        }

        let row = +$(this).closest(".demo__part").attr("row");
        let col = +$(this).closest(".demo__part").attr("col");
        waveChange(row, col);
    });

    $gallery.on("click", ".demo__part-back", function() {
        if (!isShowingBack()) return;


        setTimeout(function() {
            for (let row = 1; row <= rows; row++) {
                for (let col = 1; col <= cols; col++) {
                    partsArray[row - 1][col - 1].showing = "front";
                }
            }
        }, staggerTime + $parts.length * staggerTime / 10);


        showFront(0, $parts.length);

    });

    function showFront(i, maxI) {
        if (i >= maxI) return;
        $parts.eq(i).addClass("show-front");

        reqAnimFr(function() {
            showFront(i + 1);
        });
    }

    function isShowingBack() {
        return partsArray[0][0].showing == "back" && partsArray[0][cols - 1].showing == "back" && partsArray[rows - 1][0].showing == "back" && partsArray[rows - 1][cols - 1].showing == "back";
    }

    function Part() {
        this.showing = "front";
    }

    function waveChange(rowN, colN) {
        if (rowN > rows || colN > cols || rowN <= 0 || colN <= 0) return;
        if (partsArray[rowN - 1][colN - 1].showing == "back") return;
        $(".demo__part-" + rowN + "-" + colN).removeClass("show-front");
        partsArray[rowN - 1][colN - 1].showing = "back";
        setTimeout(function() {
            waveChange(rowN + 1, colN);
            waveChange(rowN - 1, colN);
            waveChange(rowN, colN + 1);
            waveChange(rowN, colN - 1);
        }, staggerTime);
    }
});