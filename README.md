# Frontend Mentor - Tip calculator app solution

This is a solution to the [Tip calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Project workflow](#project-workflow)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Calculate the correct tip and total cost of the bill per person

### Links

- Solution URL: [View code on GitHub](https://github.com/leven-carr/tip-calculator-app)
- Live Site URL: [GitHub Pages Live Site](https://leven-carr.github.io/tip-calculator-app/)

## My process

### Built with

vanilla HTML, CSS, and JS

### Project workflow

With the use of AI in this project, my workflow was a little different than previous Frontend Mentor projects. I began by attempting the project by myself with no AI guidance, and actually had a working, if not polished, app. However, I created some significant bugs when trying to add quality-of-life features, and ultimately just felt like my code was too messy and convoluted, even though it technically worked. At this point I used Gemini, providing it with a brief explanation of the challenge, as well as copies of my code. Its recommendations for HTML and CSS were very minimal, but it helped me overhaul my JS (see AI Collaboration below).

### What I learned

This project introduced me to several new concepts, mostly concerning JS, but with a couple specifics for HTML and CSS as well.

For HTML, I was reminded of the importance of accessibility features, and used the attributes `aria-describedby` and `aria-live="polite"` to properly link the error messages with their respective form inputs in a way that screenreaders can detect. For CSS, I don't think there was anything brand new, but I got some practice with using `:has` and `:not` pseudo-classes, as well as `:focus-visible` as opposed to just `:focus`.

For JS, I was introduced to guard clauses and the concept of failing fast, which was definitely a bit of a lightbulb moment and helped me see how I can greatly simplify conditionals. I was also introduced to `parseFloat` and `parseInt`, which can be beneficial for cleaning up messy user input, as they can parse out extra characters from a given string whereas `Number()` cannot. In my script, I used `parseInt(people.value, 10)` to ensure the user input for the number of people is strictly evaluated as a base-10 integer. Conversely, I used `parseFloat(bill.value)` to allow decimals in the bill input. Another thing I learned about was how the difference between decimal and binary radices can ever so slightly alter number values, which would be something to keep in mind for working with very large numbers.

### Continued development

In the future, I want to continue improving my optimization of the script, particularly when it comes to conditionals and organization of event listeners.

### Useful resources

- [MDN Web Docs :focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible#focus_vs_focus-visible) - Documentation that explains the difference between :focus and :focus-shown.
- [ParseFloat vs ParseInt in JavaScript](https://medium.com/@roy.elaawar/parsefloat-vs-parstint-in-javascript-4f3d345f205f) - Article that explains what parseFloat and parseInt are and how they might be used. This is a little bit more straightforward and easier to grasp than the MDN Web Docs pages for parseFloat and parseInt, although those are good too.

### AI Collaboration

This project marked my first time using generative AI (Gemini) for help. I wanted to make a conscientious effort to use this as a tool to organize and optimize my code, rather than just copying and pasting code snippets without understanding how they improved my script. Throughout the process I asked it to explain various suggestions, evaluate trade-offs in readability, and brainstorm with me to fine-tune details in the UI/UX.

### Architectural Changes and Refactoring Examples

- **Switching to Guard Clauses:** Originally, I got hung up on writing validation that tried to force a true status in order to pass (`if okay -> keep going`). Gemini recommended using guard clauses (`if bad -> halt`), which eliminated some complex if statements to make my code much more readable, and introduced to me to the concept of failing fast.
- **Cleaner Boolean Logic:** Gemini showed me how to shorten my condition checks by grouping operations:

  ```javascript
  // Before: if ((a && b && c) || (a && b && d))
  // After:  if (a && b && (c || d))
  ```

- **Storing Data in Objects vs Arrays:** For some function outputs, my first draft of the code returned the data in arrays. Gemini recommended returning the data in an object instead to make the code more maintainable. If I were to add another output, it could potentially break index-dependent code, whereas objects are more scalable and self-documenting due to their key-value pairs.
- **Best Practice for Navigating the DOM** For my `showError` and `clearError` functions, I originally used `.nextElementSibling`. Even though I know that it's functional for the app's layout, Gemini recommended using `.closest()` with a `querySelector`. This technique is better practice because it provides more flexibility for the DOM to change without breaking the app.

### Accessibility, Edge Cases, and Event Listeners

- **Accessible Error Messages:** After reviewing my code, Gemini recommended that I implement `aria-describedby` on the input fields and `aria-live="polite"` on the error text spans. This way, screen readers will actually detect the error messages and inform the user without being disruptive.
- **Floating Point Math Accuracy:** Gemini recommended the use of `parseFloat` and `parseInt` over `Number()` and introduced a step that converts values to cents, rounds them, and converts them back to dollars. While it was probably overkill for the scale of this app, it was still a valuable learning experience regarding floating-point arithmetic. Because computers use binary, which struggles to perfectly represent decimal fractions like 0.1 and 0.2 but has no problem with integers, converting the values to whole cents avoids rounding errors. Additionally, if the user were to type in more than two decimal places for their bill amount, the use of `Math.round(billNum * 100)` ensures that it will still be converted to a whole number.
- **Debugging Cursor Traps:** To make the app appear more polished I wanted to remove leading zeros. Initially I tried to use a regex in conjunction with the input event to achieve this, however, this caused the cursor to reset and prevented decimal inputs. Gemini helped me switch to the blur event, and gave me a simpler technique that didn't involve a regex.
- **Blocking Non-integers for People & Blocking Negative Numbers:** When testing the app I realized there was still room for more polishing, namely by preventing negative numbers in all number inputs and preventing non-integers in just the people input. Gemini helped me work through several variations until I landed on one that utilizes failing fast at the top, leaves clean inputs on the screen, and leaves `0` inputs intact to justify the "Can't be zero" error messages.
- **Working with the Event Loop:** Another area I got stuck was making the resetBtn work properly; it would clear the form, but it wouldn't disable itself. Gemini showed me how to use `setTimeout` to create an extremely small delay, which allowed the browser's execution stack to clear all the form fields and then update the button's state.

### Evaluating and Rejecting AI Suggestions

- **Avoiding Variable Clutter:** Gemini recommended breaking down some code blocks into multiple (4+) separate local variables to streamline conditionals. While this did make some parts of the code more readable, I opted not to take this recommendation because it bloated the script with many variables, and instead I focused on writing more concise logic for the checks.
- **Appending More Validation:** In the process of testing the quality-of-life features of the app, I noticed that my script did not prevent negative numbers from producing an output on a live basis. When consulting Gemini about how best to implement this (without breaking the QOL features), it initially suggested adding a guard clause at the top of `doMath`. While this did work, I was skeptical of adding a validation step to the calculating function, as that would cross-contaminate two separate facets of the script. Gemini confirmed my alternative solution of simply creating a third helper validator function and invoking it inside the main validator; the AI also caught my mistake of not placing the new call at the top of `validateCalculator`, which would have negated the new validation step.
- **Responsive UX Design:** I wanted to add a percent sign inside the custom tip input to keep the design consistent with the other inputs. However, this led to a design flaw where the percent symbol in the background overlapped with the placeholder text on certain screen sizes. Gemini suggested shrinking the icon and adjusting the padding, which made the icon look too small and out of place, and caused the text to be off-center.
  I asked Gemini to scrap that suggestion and instead help me write the code for a dynamic workaround: Remove the icon when the placeholder is active, and change the placeholder text to "Custom %". Then display the icon only after the user has typed some input. Gemini helped me execute this idea using just CSS:

  ```css
  input.tip-btn:not(:placeholder-shown) {
    /* Background percentage icon applied only when user types */
  }
  ```

### Conclusion

While I was initially worried about feeling like I was just copying AI suggestions, I walked away from this challenge still feeling like I had learned a lot, and found that adding AI code reviews to my workflow absolutely decreased the time I had to spend debugging, since I did not have to painstakingly search my code for typos or mistakes.

## Author

- Frontend Mentor - [@leven-carr](https://www.frontendmentor.io/profile/leven-carr)
- GitHub - [@leven-carr](https://github.com/leven-carr)
