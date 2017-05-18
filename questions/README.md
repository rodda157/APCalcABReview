# Question Format

Ideally, questions should be separated into different text files based on type or topic for ease of organization. 
`qList.txt` specifies the files to be used for questions, and any files not listed in it will be ignored by the parser.

At the moment, there are three variations of question:

## Explicitly defined multiple choice

This type is the simplest and most straightforward. An example of one of these questions would be:
```
Which of the following is most reactive? :: F ;; Cl, Br, I, At
```

Notice that the question itself is listed first, along with all necessary punctuation. The question will be rendered as is with no modification.

A `::` separates the question from the correct answer. While single element symbols are used in the examples, answers of any length can be written in this space.

A `;;` separates the correct answer from the incorrect answers. After it, the other four answers should be listed, separated by commas. 
Commas can not be used within these answers, but multiple word answers will work.

## Multiple choice with random elements as wrong answers

This very specific type of multiple choice question provides random elements from the periodic table as answers.

An example question would be:
```
What element has the electron configuration 2-8? :: Ne ;; |
```

This one is very simple. Just place a single `|` in the answer section and four random answers will be chosen for you.

## Multiple choice with elements as wrong answers excluding some

Of course there might arise a situation in which you want to exclude some answers from the random elements chosen. An example of this syntax would be:
```
Which of the following has 4 valence electrons? :: Si ;; | !C, Ge, Sn, Pb, Uuq
```
Simply follow the `|` with an `!`, and then the elements you want to exclude separated by commas. 
You can specify as many as you want, but you should leave at least four elements that could still be chosen by the random function.
