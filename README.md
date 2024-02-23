## Modularization

-   Entry Point - script.js
    -   Classes - class.js

# References

| Category | Desc.                                                              | URL                                                                                                        |
| -------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| CSS      | Box Shadow Examples                                                | [Link](https://getcssscan.com/css-box-shadow-examples)                                                     |
| CSS      | Color Palettes                                                     | [Link](https://coolors.co/palette/dad7cd-a3b18a-588157-3a5a40-344e41)                                      |
| CSS      | Bootstrap Documentation                                            | [Link](https://getbootstrap.com/docs/4.0/utilities/flex/#justify-content)                                  |
| JS       | JS Audio Object                                                    | [Link](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)                                    |
| JS       | Click Outside Element Example                                      | [Link](https://www.30secondsofcode.org/js/s/listen-click-outside-event/)                                   |
| JS       | How to Read JSON File                                              | [Link](https://www.freecodecamp.org/news/how-to-read-json-file-in-javascript/)                             |
| JS       | How to Shuffle an Array                                            | [Link](https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/) |
| JS       | If Background is Dark {textColour = #fff} else {textColour = #000} | chatGPT                                                                                                    |

## ChatGPT

Me:
I'm thinking of the following JSON structure for my question bank.
what do you think? analyse pros/cons, advise me about it.

```json
{
  "JavaScript": {
    "questions": [
      {
        "question": "What is JavaScript?",
        "answers": [
          {text: "JavaScript is a low-level programming language.", isCorrect: true/false},
          {text:"JavaScript is primarily used for server-side programming.", isCorrect: true/false},
          {text:  "JavaScript is a markup language for styling web pages.", isCorrect: true/false},
          {text: "JavaScript is a high-level, interpreted programming language." isCorrect: true/false},
        ]
      },
    ]
  }
}
```

ChatGPT:

```md
Your proposed structure for storing question bank data with explicit correctness flags for each answer is a solid approach and offers several benefits:

**Pros**:

1. **Clarity and Explicitness**: By explicitly specifying whether each answer is correct or wrong, the data structure becomes clear and self-explanatory. This can improve readability and make it easier for developers to understand the data.

2. **Flexibility**: Your structure allows for flexibility in handling different types of questions and answers. Each answer object can have its own correctness flag, allowing for variations in the number of correct and incorrect answers for each question.

3. **Ease of Processing**: With the correctness flag included directly in each answer object, it's straightforward to programmatically process the data, such as checking user responses against correct answers or calculating scores.

4. **Scalability**: Your structure scales well with the addition of new questions and answers. You can easily expand the question bank by adding new question objects without needing to modify the overall structure.

**Cons**:

1. **Increased Data Size**: Including a separate correctness flag for each answer adds redundancy to the data structure, potentially increasing its size. However, in most cases, the impact on data size is negligible.

2. **Potential for Errors**: Maintaining correctness flags for each answer requires careful attention to ensure accuracy. If correctness flags are not updated correctly or consistently, it could lead to inaccuracies in the data.

Overall, your proposed structure strikes a good balance between clarity, flexibility, and ease of processing. It provides a clear and explicit representation of question and answer data while allowing for variations in correctness. As long as you ensure correctness flags are maintained accurately, this structure should serve your needs well for managing a question bank.
```

Follow up:
Me:
what are the industry standards in storing a question bank? give me the data structure

ChatGPT:
There isn't a single industry standard for storing a question bank as it can vary depending on factors such as the specific requirements of the application, the complexity of the questions, and the preferences of the development team. However, there are common practices and considerations that are often followed in designing the data structure for a question bank.

Here's a generalized data structure for storing a question bank:

```json
{
    "categories": [
        {
            "name": "JavaScript",
            "questions": [
                {
                    "id": 1,
                    "text": "What is JavaScript?",
                    "answers": [
                        { "text": "JavaScript is a high-level, interpreted programming language.", "isCorrect": true },
                        { "text": "JavaScript is a low-level programming language.", "isCorrect": false },
                        { "text": "JavaScript is primarily used for server-side programming.", "isCorrect": false },
                        { "text": "JavaScript is a markup language for styling web pages.", "isCorrect": false }
                    ]
                }
                // Additional questions...
            ]
        }
        // Additional categories...
    ]
}
```

Explanation:

Categories: The question bank is organized into different categories or topics (e.g., JavaScript, HTML, CSS). Each category contains a list of questions related to that topic.
Name: The name of the category/topic.
Questions: An array of question objects belonging to the category.
Questions: Each question object represents a single question in the question bank.
ID: An identifier for the question (optional but useful for referencing questions).
Text: The text of the question itself.
Answers: An array of answer objects representing the possible answers to the question.
Text: The text of the answer.
isCorrect: A boolean flag indicating whether the answer is correct or not.
This data structure provides a hierarchical organization of questions by category and allows for flexibility in representing different types of questions (e.g., multiple-choice, true/false). It's also easily expandable, allowing for the addition of new categories and questions as needed.

While this structure reflects common practices, the specific requirements of your application may dictate variations or additional features. For example, you might include metadata such as difficulty level, tags, or explanations for each question. Adjustments can be made based on your application's needs and the complexity of your question bank.
