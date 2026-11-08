---
title: Building a vintage analog synthesizer - Clone of Minimoog Model D
navTitle: Minimoog Synthesizer Clone
year: 2020
# featured: 3
# thumbnail: /synth_front.jpg
---

<p class="text-lg"><a href="/building_an_analog_synthesizer_compressed.pdf">&gt;&gt;&gt; Download my matura paper &lt;&lt;&lt;</a></p>

For my matura project, I constructed an analog monophonic synthesizer from scratch. I was greatly inspired by the memorable Moog Minimoog Model D which was the face of 1970s electronic music. This project involved planning and constructing the electronic circuits, assembling the body from wood and painting the aluminium front panel using screen printing. The keyboard would have been too difficult to construct myself, so I stole it from an old MIDI keyboard and planned my synthesizer around its dimensions.

<iframe src="https://www.youtube.com/embed/g4em1TrTlQQ" title="Kraftwerk Autobahn on DIY analog synth" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

My synthesizer uses the principle of [subtractive synthesis](https://en.wikipedia.org/wiki/Subtractive_synthesis) which was popular in early analog synthesizers. First a simple waveform is generated using an oscillator circuit which should perfectly hit the correct pitch of a note. This waveform contains many natural overtones (high frequency content) due to its sharp edges. The second stage of a subtractive synthesizer is the filter (usually low-pass) which subtracts those overtones. Modulating various parameters like pitch, filter cutoff, output volume and more, the sound can be modeled to imitate many instruments.

![The signal flow in my synthesizer](/synth_signal_flow.png "The signal flow of my synthesizer. (v.c.=voltage controlled, VCO=v.c. oscillator, VCF=v.c. filter, VCA=v.c. amplifier, LFO=low frequency oscillator, EG=envelope generator)")

The main drawback of this synthesis is that only one note can be played at once, as it works similar to a human voice. Later, synthesizers were built which featured multiple of the mentioned circuit together to allow multiple notes. A few years later I have build a polyphonic synthesizer, [which is mentioned in this post](/p/polysynth).

![The unpainted synthesizer](/synth_raw.jpg#small "The synthesizer chassis before painting.")

I used plywood for building the body, which I later stained with Mahogany stain and protected using clear coat. The panel is 1mm thick aluminium, which I spray painted and then screen printed using white color. For this project, it was easy to process the aluminium, since all holes where circular and could easily be drilled.

![The final synthesizer](/synth_front.jpg "The final synthesizer.")

![The electronics of my synthesizer](/synth_electronics.jpg "For this project, I used stripboard such that I didn't have to etch my own circuit boards. This led to this confusing mess which still haunts me to this day.")
