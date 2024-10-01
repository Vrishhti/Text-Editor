let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");

//List of fontlist
let fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "cursive",
];
//Initial Settings
const initializer = () => {
    //function calls for highlighting buttons
    //No highlights for link, unlink,lists, undo,redo since they are one time operations
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, false);
    highlighter(scriptButtons, true);

    //create options for font names
    fontList.map((value) => {
      let option = document.createElement("option");
      option.value = value;
      option.innerHTML = value;
      fontName.appendChild(option);
    });
  
    //fontSize allows only till 7
    for (let i = 1; i <= 7; i++) {
      let option = document.createElement("option");
      option.value = i;
      option.innerHTML = i;
      fontSizeRef.appendChild(option);
    }
  
    //default size
    fontSizeRef.value = 3;
  };
  document.addEventListener("DOMContentLoaded", initializer);

  
  //main logic
 // Apply style to selected text
 const applyStyleToSelection = (styleProperty, value) => {
    const selection = window.getSelection();
    if (!selection.rangeCount || selection.isCollapsed) return; // No selection or selection is empty

    const range = selection.getRangeAt(0); // Get the selected range
    const span = document.createElement("span"); // Create a span to hold the styled text
    span.style[styleProperty] = value; // Set the desired style

    range.surroundContents(span); // Surround the selected text with the styled span
};

// function getFontName() {
//     // Assuming you have a way to select the font
//     const selectedFont = /* your logic to get the selected font */;
//     if (selectedFont) {
//         console.log(`Command: fontName\nValue: ${selectedFont}`);
//         return selectedFont;
//     } else {
//         console.log(`Command: fontName\nValue: null`);
//         return null;
//     }
// }

// Call this function wherever you need to check the font
getFontName();

  // Main logic
  const modifyText = (command, defaultUi, value) => {
    console.log("Command:", command);
console.log("Value:", value);

      document.execCommand(command, defaultUi, value);
    
  };
  
  //For basic operations which don't need value parameter
  optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      modifyText(button.id, false, null);
    });
  });
  
  //options that require value parameter (e.g colors, fonts)
  advancedOptionButton.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id, false, button.value);
    });
});

// Specifically for the fontName dropdown
fontName.addEventListener("change", () => {
    modifyText("fontName", false, fontName.value);
});

  
  //link
  linkButton.addEventListener("click", () => {
    let userLink = prompt("Enter a URL");
    //if link has http then pass directly else add https
    if (/http/i.test(userLink)) {
      modifyText(linkButton.id, false, userLink);
    } else {
      userLink = "http://" + userLink;
      modifyText(linkButton.id, false, userLink);
    }
  });
  
  //Highlight clicked button
  const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
      button.addEventListener("click", () => {
        //needsRemoval = true means only one button should be highlight and other would be normal
        if (needsRemoval) {
          let alreadyActive = false;
  
          //If currently clicked button is already active
          if (button.classList.contains("active")) {
            alreadyActive = true;
          }
  
          //Remove highlight from other buttons
          highlighterRemover(className);
          if (!alreadyActive) {
            //highlight clicked button
            button.classList.add("active");
          }
        } else {
          //if other buttons can be highlighted
          button.classList.toggle("active");
        }
      });
    });
  };
  
  const highlighterRemover = (className) => {
    className.forEach((button) => {
      button.classList.remove("active");
    });
  };



const draggable = document.querySelector('.draggable');
        let isDragging = false;
        let offset = { x: 0, y: 0 };

        draggable.addEventListener('mousedown', (e) => {
            isDragging = true;
            offset.x = e.clientX - draggable.getBoundingClientRect().left;
            offset.y = e.clientY - draggable.getBoundingClientRect().top;
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                let newX = e.clientX - offset.x;
                let newY = e.clientY - offset.y;

                // Get the editable area boundaries
                const editableArea = document.getElementById('text-input');
                const bounds = editableArea.getBoundingClientRect();

                // Limit draggable area within the bounds
                if (newX < bounds.left) newX = bounds.left; // Left boundary
                if (newX + draggable.offsetWidth > bounds.right) newX = bounds.right - draggable.offsetWidth; // Right boundary
                if (newY < bounds.top) newY = bounds.top; // Top boundary
                if (newY + draggable.offsetHeight > bounds.bottom) newY = bounds.bottom - draggable.offsetHeight; // Bottom boundary

                draggable.style.left = `${newX - bounds.left}px`; // Adjust left position
                draggable.style.top = `${newY - bounds.top}px`; // Adjust top position
            }
        });