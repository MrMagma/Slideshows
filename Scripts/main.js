var slides = [
	"https://images.duckduckgo.com/iu/?u=http%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DJN.Xdmha5VDy%252fYHOCDI1VjdEw%26pid%3D15.1&f=1",
	"https://images.duckduckgo.com/iu/?u=http%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DJN.S%252fwwU%252fwYvhxupJ9HQ%252fbTsg%26pid%3D15.1&f=1",
	"https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fmedia-cache-ec0.pinimg.com%2F736x%2F7b%2Ffc%2Fe8%2F7bfce8753b7d427b0ea40306003ddd6f.jpg&f=1",
	"https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.publicdomainpictures.net%2Fpictures%2F20000%2Fnahled%2Fmarionettes.jpg&f=1",
	"https://images.duckduckgo.com/iu/?u=http%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DJN.HTlA4UDq0Xhcf3z%252fUZnR6w%26pid%3D15.1&f=1",
	"https://images.duckduckgo.com/iu/?u=http%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DJN.KcnmZ115SaMdp6KOX%252feW3g%26pid%3D15.1&f=1",
	"https://images.duckduckgo.com/iu/?u=http%3A%2F%2F4.bp.blogspot.com%2F_bRIcE4INR68%2FTSManX3zxsI%2FAAAAAAAAADs%2F1wX02f7DWFc%2Fs1600%2Fbing-crosby-custom-marionette-puppet-3.jpg&f=1",
	"https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fkidoinfo.net%2Fdev%2Fwp-content%2Fuploads%2F2007%2F02%2Fmarionettes.jpg&f=1",
	"https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fpuppetline.com%2Fimages%2FGiraffeMarionette.jpg&f=1",
	"https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.worldofstock.com%2Fslides%2FPAB1918.jpg&f=1",
	"https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fpuppetline.com%2Fimages%2FBabyMarionetteCocker.jpg&f=1",
	"https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.prague2001.com%2Fmarionette-queen.jpg&f=1"
];

(function() {
	var slidesContainer = document.getElementById("slide-container");
	var previousSlideBtn = document.getElementById("previous-slide");
	var nextSlideBtn = document.getElementById("next-slide");

	var curSlide = 0;

	var slideBackgroundStyle = window.getComputedStyle(document.getElementsByClassName("slide-background")[0]);
	var slideBackgroundHeight = parseFloat(slideBackgroundStyle.height);
	var slideBackgroundWidth = parseFloat(slideBackgroundStyle.width);

	slidesContainer.style.left = "0px";

	function createSlide(index) {
		var slideUrl = slides[index];
		var slideEl = document.createElement("img");
		slideEl.className = "slide-image";
		slideEl.src = slideUrl;

		var slideContainer = document.createElement("div");
		slideContainer.className = "slide";
		slideContainer.appendChild(slideEl);
		slideContainer.style.width = slideBackgroundStyle.width;
		slideContainer.style.height = slideBackgroundStyle.height;
		slideContainer.style.left = slideBackgroundWidth * index + "px";

		slidesContainer.appendChild(slideContainer);

		slideEl.addEventListener("load", function() {
			sizeSlideImg.call(this);
		});
		slides[index] = slideEl;
	};

	function sizeSlideImg() {
		var width = 0;
		var height = 0;

		if (this.naturalWidth >= this.naturalHeight) {
			var whRatio = this.naturalHeight / this.naturalWidth;
			height = Math.min(slideBackgroundHeight, this.naturalHeight * 2);
			width = whRatio * height;
		} else {
			var hwRatio = this.naturalWidth / this.naturalHeight;
			width = Math.min(slideBackgroundWidth, this.naturalWidth * 2);
			height = hwRatio * width;
		}

		this.style.height = height + "px";
		this.style.width = width + "px";
		this.style.top = (slideBackgroundHeight / 2 - height / 2) + "px";
		this.style.left = (parseFloat(slideBackgroundStyle.width) / 2 - width / 2) + "px";
	};



	function moveToSlide(index) {
		curSlide = index;
		if (curSlide > slides.length - 2) {
			curSlide = slides.length - 1;
			nextSlideBtn.style.opacity = "0";
		} else {
			nextSlideBtn.style.opacity = "1";
			slidesContainer.style.left = (-curSlide * slideBackgroundWidth) + "px";
		}
		if (curSlide <= 0) {
			curSlide = 0;
			previousSlideBtn.style.opacity = "0";
		} else {
			previousSlideBtn.style.opacity = "1";
			slidesContainer.style.left = (-curSlide * slideBackgroundWidth) + "px";
		}
	}

	function init(initial) {
		for (var i = 0; i < slides.length; i ++) {
			createSlide(i);
		}
		moveToSlide(0);
		previousSlideBtn.addEventListener("click", function() {
			moveToSlide(curSlide - 1);
		});
		nextSlideBtn.addEventListener("click", function() {
			moveToSlide(curSlide + 1);
		});
	};

	init();

	window.onresize = function() {
		slideBackgroundStyle = window.getComputedStyle(document.getElementsByClassName("slide-background")[0]);
		slideBackgroundHeight = parseFloat(slideBackgroundStyle.height);
		slideBackgroundWidth = parseFloat(slideBackgroundStyle.width);
		for (var i = 0; i < slides.length; i ++) {
			sizeSlideImg.call(slides[i]);
		}
	};
})();