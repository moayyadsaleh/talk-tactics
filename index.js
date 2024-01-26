async function fetchJsonData() {
  try {
    const response = await fetch("data.json");
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching JSON data:", error);
  }
}

// Function to display JSON data in HTML
function displayJsonData(jsonData, selectedLanguage) {
  var jsonContentDiv = document.getElementById("jsonContent");
  jsonContentDiv.innerHTML = ""; // Clear existing content

  jsonData.languageFunctions.forEach(function (languageFunction, index) {
    var functionDiv = document.createElement("div");
    functionDiv.classList.add("function-div");

    var functionTitle = document.createElement("div");
    functionTitle.classList.add("function-title");
    functionTitle.textContent =
      "Function " + (index + 1) + ": " + languageFunction.function;

    functionDiv.appendChild(functionTitle);

    var detailsDiv = document.createElement("div");
    detailsDiv.classList.add("function-details");

    languageFunction.translations.forEach(function (translation) {
      if (translation.language === selectedLanguage) {
        var translationDiv = document.createElement("div");
        translationDiv.classList.add("translation");
        translationDiv.innerHTML =
          "<strong>Language:</strong> " +
          translation.language +
          "<br>" +
          "<strong>Expression:</strong> " +
          translation.expression +
          "<br>" +
          "<strong>Meaning:</strong> " +
          translation.meaning;

        // Add audio element
        if (translation.audio) {
          var audioElement = document.createElement("audio");
          audioElement.controls = true;
          audioElement.src = translation.audio;
          translationDiv.appendChild(audioElement);
        }

        translationDiv.innerHTML += "<hr>";
        detailsDiv.appendChild(translationDiv);
      }
    });

    functionDiv.appendChild(detailsDiv);

    // Add click event to toggle details visibility
    functionDiv.addEventListener("click", function () {
      detailsDiv.style.display =
        detailsDiv.style.display === "none" || detailsDiv.style.display === ""
          ? "block"
          : "none";
    });

    jsonContentDiv.appendChild(functionDiv);
  });
}

// Function to change language based on user selection
async function changeLanguage() {
  var selectedLanguage = document.getElementById("languageSelector").value;
  var jsonData = await fetchJsonData();
  displayJsonData(jsonData, selectedLanguage);
}

// Function to filter language functions based on the search input
function filterFunctions() {
  var searchTerm = document.getElementById("searchBar").value.toLowerCase();
  var functionDivs = document.querySelectorAll(".function-div");

  functionDivs.forEach(function (functionDiv) {
    var functionTitle = functionDiv
      .querySelector(".function-title")
      .textContent.toLowerCase();
    var detailsDiv = functionDiv.querySelector(".function-details");
    var isVisible = functionTitle.includes(searchTerm);

    if (isVisible) {
      detailsDiv.style.display = "block";
    } else {
      detailsDiv.style.display = "none";
    }
  });
}
