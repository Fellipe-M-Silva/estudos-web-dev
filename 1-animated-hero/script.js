document.addEventListener("DOMContentLoaded", () => {
	const columns = document.querySelectorAll(".hero-mask-col");
	const heroImage = document.getElementById("heroImage");
	const heroMask = document.getElementById("heroMask");
	const heroSection = document.getElementById("hero-section");
	const heroMaskCol = document.querySelector(".hero-mask-col");
	const pageHeight = window.innerHeight;
	const maxScroll = 400;
	const minWidth = 0;
	let initialWidth = 0;

	function handlePageHeight() {
		const adjustedHeight = pageHeight * 0.8;
		const colHeight = adjustedHeight / 9;

		heroSection.style.height = adjustedHeight + 48 + "px";
		heroImage.style.height = adjustedHeight + "px";
		heroMask.style.height = adjustedHeight + 48 + "px";

		document.documentElement.style.setProperty(
			"--col-height",
			colHeight + "px"
		);
	}

	function handleColVisibility() {
		const pageWidth = window.innerWidth;

		columns.forEach((col) => {
			col.classList.remove("visible");
		});

		if (pageWidth < 480) {
			document
				.querySelectorAll(".col-4")
				.forEach((col) => col.classList.add("visible"));
		} else if (pageWidth < 768) {
			document
				.querySelectorAll(".col-4, .col-6")
				.forEach((col) => col.classList.add("visible"));
		} else if (pageWidth < 1280) {
			document
				.querySelectorAll(".col-4, .col-6, .col-8")
				.forEach((col) => col.classList.add("visible"));
		} else if (pageWidth < 1440) {
			document
				.querySelectorAll(".col-4, .col-6, .col-8, .col-10")
				.forEach((col) => col.classList.add("visible"));
		} else {
			columns.forEach((col) => col.classList.add("visible"));
		}

		const visibleCols = document.querySelectorAll(
			".hero-mask-col.visible"
		).length;

		if (visibleCols > 0 && heroMask) {
			initialWidth = heroMask.offsetWidth / (2 * visibleCols);
			document.documentElement.style.setProperty(
				"--col-width",
				`${initialWidth}px`
			);
		}
	}

	function handleScroll() {
		const scrollPosition = window.scrollY || window.pageYOffset;

		let newWidth;

		if (scrollPosition <= maxScroll) {
			const scrollFactor = scrollPosition / maxScroll;
			newWidth = initialWidth * (1 - scrollFactor * scrollFactor);
		} else {
			newWidth = minWidth;
		}

		document.documentElement.style.setProperty(
			"--col-width",
			`${newWidth}px`
		);
	}

	window.addEventListener("resize", () => {
		handlePageHeight();
		handleColVisibility();
	});
	window.addEventListener("scroll", handleScroll);

	handlePageHeight();
	handleColVisibility();
	handleScroll();
});
