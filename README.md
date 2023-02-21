# Talk To History: Treehacks 2023

> Talk to History: Step into your textbook. Read about history and then talk to the people in the passage, just like the magical portraits in Harry Potter.
> Scott Hickmann, Kaien Yang, Jason Lin
> Winner of Best Chat App (sponsored by you.com, $2k)

## Inspiration

Textbooks have not fundamentally changed since their invention in the 16th century. Although there are now digital textbooks (ePubs and the like), they're still just pictures and text. From educational literature, we know that discussion and interactivity is crucial for improving student outcomes (and, particularly, those of marginalized students). But we still do the majority of our learning with static words and images on a page.

## What it does

How do we keep students engaged? Introducing _Talk To History_. This is a living textbook, where students can read about a historical figure, click on their face on the side of the page, and have an immersive conversation with them. Or, read a primary text and then directly engage to ask questions about the writing. This enables a richer, multimodal interaction. It makes history more immersive. It creates more places to engage and retain knowledge. Most importantly, it makes the textbook fun. If Civ5 can make history fun, why can’t textbooks?

## How we built it

_Talk To History_ was built using TypeScript, React, Next.js, Vercel, Chakra, Python, Google Text-To-Speech, Wav2Lip, GPT, and lots of caffeine :) The platform has several components, including a frontend for students and a backend to handle user data and text analysis. We also used Google's Text-To-Speech (TTS) API to generate high-quality speech output, which we then fed into Wav2Lip, a deep generative adversarial network, to produce realistic lip movements for the characters. For accelerated inference, we deployed Wav2Lip on an NVIDIA A40 GPU server.

## Challenges we ran into

* Dealing with CUDA memory leaks when performing inference using the Wav2Lip model
* Finetuning hyperparameters of the Wav2Lip model and optimizing PyTorch loading to reduce latency
* Connecting and deploying all of the different services (TTS, GPT, Wav2Lip) into a unified product

## Accomplishments we're proud of

We're most proud of building a platform that makes learning fun and engaging for students. On the technical side, we're proud of seamlessly integrating several cutting-edge technologies, such as Wav2Lip and GPT, to create a more immersive experience; this project required advanced techniques in full-stack engineering, multi-processing, and latency optimization. The end result was more than worth the effort, as we successfully created a platform that makes education more engaging and immersive. With _Talk To History_, we hope to transform the way students learn history.

## What we learned

We learned how to integrate multiple services and optimize our code to handle large amounts of data, but perhaps more importantly, we gained a deep appreciation for the importance of creating an exciting experience for students.

## What's next

* Scalability and speed improvements for Wav2Lip GPU instances for more realtime chats
* Improved robustness against adversarial prompts
* Broader selection of articles and speakers organized into different domains, such as "Pioneers in Environmental Sustainability", "Female Heroes in Science", and "Diverse Voices in Literature"
* _Talk to History_ as a platform: ability for any educational content author to add their own character (subject to content approval) given some context and voice and integrate it on their website or e-reader
## Getting Started

## How To Run

* It's currently deployed at [https://treehacks-2023.vercel.app/](https://treehacks-2023.vercel.app/). Alternatively, use `yarn` and `yarn dev` to run, and run Scott-Hickmann/TreeHacks-2023-GPT-Agent to power text generation (operates over websocket). 

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
