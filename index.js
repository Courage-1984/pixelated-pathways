var acc = document.getElementsByClassName("summary");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active2");
    });
}

// Get the button
let mybutton = document.getElementById("myBtn2");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    // Use document.documentElement to ensure compatibility with all browsers
    document.documentElement.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Function to handle the click event on table of contents links
function handleLinkClick(event) {
    event.preventDefault();

    // Get the target element based on the href
    const targetId = event.target.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    // Check if the target element exists
    if (targetElement) {
        // Scroll to the target element
        targetElement.scrollIntoView({ behavior: 'smooth' });

        // Check if the target is a summary inside details
        if (targetElement.tagName === 'SUMMARY' && targetElement.parentElement.tagName === 'DETAILS') {
            // Toggle the details element to open if it's closed
            const detailsElement = targetElement.parentElement;
            if (!detailsElement.open) {
                detailsElement.open = true;
            }
        }

        // Update the visited state
        markLinkAsVisited(event.target);
    }
}

// Function to mark a link as visited
function markLinkAsVisited(link) {
    link.classList.add('visited');
}

// Attach click event listener to table of contents links
const tocLinks = document.querySelectorAll('#table-of-contents a');
tocLinks.forEach(link => link.addEventListener('click', handleLinkClick));

var previousPosition = 0; // Variable to store the previous scroll position
var backButton; // Variable to store the reference to the scroll-back button

// Function to scroll back to the previous position
function scrollBackToPreviousPosition() {
    // Scroll back to the previous position smoothly
    window.scrollTo({ top: previousPosition, behavior: 'smooth' });

    // Hide the button after scrolling back
    hideBackButton();
}

// Function to hide the scroll-back button
function hideBackButton() {
    backButton.style.display = 'none';
}

// Function to navigate to the target section and show the scroll-back button
function navigateToSection(targetId) {
    // Get the target element
    var targetElement = document.getElementById(targetId);

    // If the target element exists, scroll to it smoothly
    if (targetElement) {
        // Store the current scroll position
        previousPosition = window.pageYOffset || document.documentElement.scrollTop;

        targetElement.scrollIntoView({ behavior: 'smooth' });

        // Create and show the scroll-back button
        // backButton = document.createElement('button');
        // backButton.textContent = 'Scroll Back';
        // backButton.id = 'scrollBackButton';

        backButton = document.getElementById('scrollBackButton');

        backButton.addEventListener('click', scrollBackToPreviousPosition);

        // document.body.appendChild(backButton);

        // Show the button
        backButton.style.display = 'block';

        // Hide the button after a few seconds (adjust as needed)
        setTimeout(hideBackButton, 6000); // 6000 milliseconds (6 seconds) - Adjust as needed
    }
}

// Attach the function to your anchor links
document.addEventListener('DOMContentLoaded', function () {
    var links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default behavior of the anchor link
            var targetId = this.getAttribute('href').substring(1);
            navigateToSection(targetId);
        });
    });
});



const showOnPx = 100;
const pageProgressBar = document.querySelector(".progress-bar");

const scrollContainer = () => {
    return document.documentElement || document.body;
};

document.addEventListener("scroll", () => {

    // console.log("Scroll Height: ", scrollContainer().scrollHeight);
    // console.log("Client Height: ", scrollContainer().clientHeight);

    var backToTopButton = document.getElementById('scrollBackButton');

    const scrolledPercentage =
        (scrollContainer().scrollTop /
            (scrollContainer().scrollHeight - scrollContainer().clientHeight)) *
        100;

    pageProgressBar.style.width = `${scrolledPercentage}%`;

    if (scrollContainer().scrollTop > showOnPx) {
        backToTopButton.classList.remove("hidden");
    } else {
        backToTopButton.classList.add("hidden");
    }
});

function copyToClipboard(elementId) {
    // Select the text inside the element
    const textToCopy = document.getElementById(elementId).innerText;
    const tempInput = document.createElement("input");
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    // Display the tooltip with the copied text
    const tooltip = document.getElementById("myTooltip");
    tooltip.innerText = "Copied: " + textToCopy;

    // Add the 'clicked' class to show the tooltip
    document.getElementById("myText").classList.add("clicked");

    // Hide the hover tooltip
    const hoverTooltip = document.querySelector('.tooltiptext-hover');
    // hoverTooltip.style.visibility = 'hidden';

    // Hide the tooltip after 1 second
    setTimeout(function () {
        tooltip.innerText = "Copied!"; // Reset the tooltip text
        document.getElementById("myText").classList.remove("clicked");
    }, 1000);
}

// window.addEventListener("load", (event) => {
//     new cursoreffects.fairyDustCursor({
//         colors: ["#ff1361", "#fff800", "#ff1361", "#44107a"],
//     });
// });

window.addEventListener("load", (event) => {
    new cursoreffects.fairyDustCursor({
        colors: ["#ff1361", "#fff800", "#ff1361", "#44107a", "#60efbb", "#5ae4f9"],
    });
});






var searchInput = document.getElementById('searchInput');
var searchResults = document.getElementById('search-results');
var lastSearchTime = 0;

searchInput.addEventListener('input', function () {
    var currentTime = new Date().getTime();
    if (currentTime - lastSearchTime > 300) { // Adjust the delay as needed (e.g., 300 milliseconds)
        search();
        lastSearchTime = currentTime;
    }
});

searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        search();
    }
});

function search() {
    var input = searchInput.value.trim().toLowerCase();

    // Clear search results if search input is empty
    if (input === '') {
        searchResults.innerHTML = '';
        searchResults.style.display = 'none';
        return;
    }

    var resultsHTML = '';

    // Adjust the scope by using a specific class for elements of interest
    var elementsToSearch = document.getElementsByClassName('searchable-content');

    for (var i = 0; i < elementsToSearch.length; i++) {
        var element = elementsToSearch[i];

        if (element.textContent.toLowerCase().includes(input)) {
            resultsHTML += '<p><a href="#' + element.id + '">' + element.textContent + '</a></p>';
        }
    }

    if (resultsHTML !== '') {
        searchResults.innerHTML = resultsHTML;
        searchResults.style.display = 'block';
    } else {
        searchResults.innerHTML = '';
        searchResults.style.display = 'none';
    }
}

// Smooth scrolling to the target element
document.getElementById('search-results').addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.tagName === 'A') {
        var targetId = event.target.getAttribute('href').substring(1); // Remove the '#' from the href
        var targetElement = document.getElementById(targetId);
        if (targetElement) {
            // Check if the target element is within a "details" element and open it
            var detailsElement = targetElement.closest('details');
            if (detailsElement) {
                detailsElement.open = true;
            }
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

