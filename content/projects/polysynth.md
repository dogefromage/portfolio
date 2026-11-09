---
title: Building a 1980s 8-voice analog synthesizer inspired by the Roland Juno
navTitle: Analog Polysynth Build
year: 2025
featured: 1
thumbnail: /polysynth/final_top.jpeg
---

With many previous synthesizer projects, monotonically increasing in complexity, I finally attempted my shot at a polyphonic analog synthesizer. Of course, it also needs to look nice, which is a large part of the process. 

Looking back at this project, it amazes me how much I learned during it. The idea came to me in a random lecture during my third Bachelor semester at ETH and now I am well into my Masters.

![Finished synthesizer on its stand](/polysynth/final_top.jpeg)


## Background

The [Roland Juno](https://en.wikipedia.org/wiki/Roland_Juno-60) was a series of synthesizers released by Roland since the 1980s. Compared to its big brother, the Roland Jupiter series, the Juno was a more affortable model, by reducing the number of features. However, the precise layout and slider ranges make the Juno "hard to sound bad" while other synthsizers can get quite hard to control.

Compared to other analog polysynths, the early Junos are minimalistic with only six voices, a single oscillator and a single envelope for both filter and amplifier. All of that does not matter in regards of the praised chorus section, producing a warm and smooth widening effect. The Juno also featured a pattern storage, letting a user store certain slider positions for later recall.

Analog polysynths are expensive and complicated to build since they essentially feature multiple copies of monophonic analog synthesizers on multiple boards. Furthermore, the panel settings can not be controlled using simple potentiometers, but rather must be set by digitally controlled switches, digitally controlled resistors or digital to analog converters. All of those are controlled by a master board with a microcontroller.

## Design

For the simplicity and the beloved sound, I chose to imitate the Juno's design as I did with the [Minimoog clone in the past](minimoog_clone). However, I added my own twist. The synthesizer is named after Ευρυδίκη (Evridiki or Eurydice) from [Greek mythological tale](https://en.wikipedia.org/wiki/Eurydice) of her and her husband Orpheus, in which Orpheus descends into Hades to save her using his enchanting music.

The number of voices was rounded up to a practical eight instead of six. Also, I added a sequencer section in addition to the arpeggiator, which has worked out pretty well.

The synthesizer was modeled in Solidworks and the electronics were designed in KiCad. The entire design was built around an old salvaged keybed from an old MIDI keyboard of my friend (shoutout to [Jylorant](https://www.jylorant.com/)).

![Keyboard](/polysynth/keyboard.webp#small "The extracted keyboard with five octaves.")

The chassis is built from wood with solid endpieces and the two panels are mounted on top. The four voice boards with the mainboard are at the heart of the synth. The top PCB screws into the top panel directly.

![Testing](/polysynth/testing.webp#medium)

## Electronics

The electronics are of course the key part of this project, since building an analog synthesizer involved creating all the circuitry of the main sound generation with analog components, istead of simulating it digitally as it is done in virtual instruments on the computer. Therefore, I created four voice board copies, each featuring two voices on it. This connects to a main board using headers. Another massive board is needed underneath all of the front panel more as a structural support for the faders and switches on the front panel.

The professional made circuits where designed in KiCad and ordered via JLCPCB. The front panel circuits were not. More on this later...

### Voice Board

Here, I spent a lot of time designing the voice board first on paper. Choosing the right components drastically simplifies the design. A big simplification step was using compact ICs designed for use in analog synthesizers. Also, all of the modulation like envelopes, LFOs and their mixing is done digitally. The main audio signal however is still created analog. This was done similarly in the Juno, which used even more drastic measures with their digitally timed oscillator chips. Offloading the modulation to the code also allows tuning the modulation a lot for ease of use and adjusting the ranges of values. This sounds very boring in text but it really makes a difference when using the thing.

![Voice inner](/polysynth/voice.png#medium "The inner voice section, which is placed twice. It houses the main synthesis for one voice.")

![Voice outer](/polysynth/voice_outer.png#medium "The outer section with the DACs and mixing of the dual voice card")

For a background in subtractive synthezis with analog circuits, my [Matura paper and the page on my Minimoog clone](/p/minimoog_clone) is a good summary. Similarly to there, I chose the AS3340 as my VCO chip. A chip that drastically simplifies the analog voice is the AS3372. It is perfect for my purpose, since it can be configured as a dual input mixer followed by a four-pole resonant VCF and finally a VCA. Combined with the AS3340 VCO this gives us a whole voice using only two DIP-16 chips. 

For the extra features of the Juno-style voice section, we need a suboscillator, which can be constructed using a D-Flip-Flop that halfs the square wave to be an octave lower. The DG441 digital switch lets us toggle the square and saw waveforms to enable none, one each or both at once.

The interesting part of this voice card is rather the source of control voltages. While other vintage synths use a single DAC followed by multiplexers and sample and hold circuits, I found that way to cumbersome. Therefore, I looked for a cheap DAC, where I settled for the LTC1665 with eight separate eight-bit outputs. 8 bits is too little for pitch control. Therefore, one of them is used for eight-bit control voltages and the other for four times sixteen-bit pitch control voltages. The four high-precision outputs are used for pitch and VCF-cutoff on both voices. VCFs with sustaining resonance can be played as a note and thus need precise pitch control as well.

![Voice board](/polysynth/board_voice.webp#medium "A finished dual-voice card (chips are missing in photo)")
<!-- ![Finished boards](/polysynth/finished_boards.webp "Three of the four voice cards") -->

### Mainboard

<figure class="medium">
    <video src="/polysynth/design.mp4" controls preload="metadata"></video>
    <figcaption>This is me first getting the voice to run with MIDI over USB. I started out building a single voice board first and only later I started designing the mainboard around it. The video also shows a makeshift power supply plugged into the breadboard with the Teensy and a simple audio output.</figcaption>
</figure>

![Mainboard teensy](/polysynth/mainboard_teensy.png "Mainboard Teensy ports and front and backpanel cable plugs.")

The mainboard centers around a Teensy 4.1 microcontroller. This is basically like an Arduino but more powerful and with tons of IO features.

![Mainboard keyboard matrix circuit](/polysynth/mainboard_keyboard.png "Keyboard matrix driver")

As most MIDI keyboards which I have used, so does this one feature a button matrix with series connected diodes. Therefore, it can be connected using two 74hc595 shift registers and two 4051 multiplexers.

![Mainboard MIDI circuit](/polysynth/mainboard_midi.png "Standard MIDI triplet: IN, OUT and THRU")
 
Of course, we also need MIDI. This circuit is quite standard and connects to the some UART on the microcontroller. The optocoupler is required to Galvanicly isolate other MIDI devices and prevent unsafe ground loops.

![Mainboard voices circuit](/polysynth/mainboard_voices.png "Voice cards, mixing and tuning feedback")

Now, the four voice cards plug into headers at 90-degree angles. The four audio signals get summed up using an op-amp and the other side of the op-amp is used for the tuning feedback circuit. It is configured as Schmitt-Trigger, to not double count a rising edge. 

For precise tuning, the voice can be configured to output an unmodulated square wave with filter fully opened. The microcontroller then counts the number of rising edges and can thus fit a regressive model to the pitch curve, creating a precise tuning. The same thing can be done for the filters sustained resonance, where all other oscillators are disabled.

![Mainboard chorus circuit](/polysynth/mainboard_chorus.png "The stereo chorus circuit")

The chorus is the most complicated bit of the mainboard. I myself only understand parts of it and it also never worked 100%. But it does sound like a chorus and that's what matters.

The circuit is a stereo chorus built around two MN3207 1024-stage bucket-brigade devices. Each audio channel thus gets one chorus mixed to the original signal creating a wide stereo effect when enabled. The BBDs are controlled via two 4046 VCO chips. This setup was mixed together from many circuits I found online. I cannot trace it back to a single source. 

The later mixing stage was designed by me, where a further DG441 allows the user to select different the four chorus modes using switches like in the original Juno. What the chorus also needs is the delay time shifting slowly with around 1-10 Hertz. This is achieved by a MCP4802 two-channel DAC that controls the frequencies of the 4046 clocks. The three chorus settings on the synth (without the off-setting), mainly provide different amplitudes of mixed in chorus via the DG441 but also different modulation frequencies, depths and phase offsets between both channels. There is a vast number of possibilities of course, but I mainly chose a few at random giving essentially three options at different intensities of chorus.


![Mainboard audio output circuit](/polysynth/mainboard_volume.png "The final output stage and volume control")

At last, the output section is comprised of a single PGA2311 stereo volume control chip. This IC is rather expensive but I still chose it for the following reasons: 
    
1. I want to create a stereo output signal with the ideal line out impedance, for which I did not want to endlessly research for. 
2. The output of my synthesizer should not break some other expensive audio equipment it is plugged into.
3. The chip should offer a very large exponential range of output volumes without distorting or clipping.

For that, the IC is ideal and it does exactly that.

![Mainboard power](/polysynth/mainboard_power.png "The mainboard power section.")

Power can not be neglected and high quality audio devices require a very steady power line to mitigate noise. Also, to minimally deal with wall power voltages, I used a premade internal power supply unit that converts wall power to three rails: -15V, +5V and +15V. This is almost perfect since the synth chips usually take -5V and +15V while the digital electronics can use the +5V rail. The -5V rail however had to be regulated town using an 7905 LDO. The some analog parts also needed +5V and thus I created a second +5V rail with another LDO to minimize digital and analog crosstalk, especially since many LEDs are turned on and off which will likely lead to audible noise in the output. The chorus BBD chips require +9V. Thus another LDO was needed. Since analog audio currents stay very low, the LDOs are fine and do not overheat. Still I added small heatsinks.

### Panel Electronics

The main panel mainly serves as structural component, holding the sliders, switches and LEDs in place and resisting the pushing force on the panel. In consumer electronics, this is usually a cheap single or double sided large PCB that mounts to the bottom of the panel.

Creating the panel myself was quite intense. It started out with me realizing that ordering a 800mm wide panel was not that realistic and affortable. So I attempted to etch my own, which I have never tried before. I found a store selling around 30cm large plates of single sided FR4 PCBs. Three of those tied together could solve my problem.

![Panel schematic](/polysynth/panel_schem.png "A section of the schematic of the panel. The whole circuit is quite similar with repeated 4051 muxes or the occasional 74hc595 shift register for the LEDs.")

![Panel pcb all](/polysynth/panel_pcb.png "The entire panel PCB drawing can be seen here. On the bottom left is the pcb for the pitchbend wheel. The ruler shows the scale, the main PCB is almost 800mm in length.")

![Panel pcb close up](/polysynth/panel_pcb_cursed.png "This close up shows my backside-only routing, where certain panel elements contain connections as well, such as the ground connection around the sliders body. Across the three boards, I had to bridge the signals via lots of wire.")

<figure class="medium">
    <video src="/polysynth/etching_test.mp4" controls preload="metadata"></video>
    <figcaption>Here you can see me trying an etching solution made with sodium persulfate. This did not work, since the liquid must be heated to around 50 degress Celsius, which I was not able to set up at that time. I later ordered ferric chloride which works in cold weather as well. Also, my improvised rocking plate works quite poorly.</figcaption>
</figure>

Another issue was getting the print on. To not have to deal with transfers or photo-resist films, I just chose to paint it on. The traces can be quite rough since I have tons of space. So I tested multiple pens to see which has the best etch-resistance (STAEDTLER Lumocolor was best, but I think buying one designed for the job would have been even better).

So hand punched little marks into the copper showing the pins via a printed out version of the schematic. Then I painted on all the traces. This was fun!

![Etched boards](/polysynth/etching_2.webp "The painted on traces. This is my tribute to H.R. Giger.")

![Etching a board](/polysynth/etching.webp "After etching in ferric chloride. It worked 99%, there where some little things I had to correct.")

The holes I later drilled with a small drill press and tiny bits I ordered online. I got very close to breaking the last bit but thankfully I did not.

## Firmware

The firmware for the Teensy 4.1 carries a lot of the complexity of the project. Still, it is mostly boring low level code. The firmware does however have to do all the following things at once without blocking or delaying:
 
- Program all 8 DACs with each 8 channels at a rate of around 500 Hertz, where fast modulation is possible and latency is negligible
- Receive and send MIDI nodes and precise clock signals
- Read the panel and control the LEDs
- Load and save patches
- Do tuning
- Simulate the virtual modulation sources
- Manage the complex behaviour and state of the arpeggiator or sequencer without blocking the execution

What helped a lot when designing the code was to encapsulate behaviour into object-oriented classes with meaningful purposes. This diagram shows the overall relationships between the classes:

![Diagram of firmware classes](/polysynth/synth_overview_seed04.svg)

You can explore or use [the code on GitHub](https://github.com/dogefromage/polysynth). I want to list a few interesting sections here without boring you:

[tuning.cpp](https://github.com/dogefromage/polysynth/blob/master/src/tuning.cpp) starts tuning the oscillators one by one upon request on the front panel. This is the only routine that is blocking, i.e. stops everything else the synth is doing. The tuning works by attaching an interupt to the tuning input pin that counts each edge in a given precisely timed window. After measuring a range of inputted vs measured frequencies, a order two polynomial i.e. a parabola is fitted to the values and stored in a tuning profile that gets loaded every start of the synth. Therefore, the synth only has to tune sometimes,mostly it stays in tune.

In [instrument.cpp](https://github.com/dogefromage/polysynth/blob/master/src/instrument.cpp) most of the fun stuff is happening, such as Voice::update(...) and Instrument::update(...) which both contain the main logic that feeds the panel values into the digitally simulated LFO and envelope and then calculates the final six DAC voltages pitch, cutoff, resonance, pulse_width, sub and volume.

[player.cpp](https://github.com/dogefromage/polysynth/blob/master/src/player.cpp) is definitely my least favorite file to have worked on. It contains the layer in between the keyboard sending a key and the synthesizer reading it and thus handles the arpeggiators and sequencers behaviour. It is very prone to bugs and edge cases that sometimes I have only noticed way later.

[panel.cpp](https://github.com/dogefromage/polysynth/blob/master/src/panel.cpp) is nice since it reads the panels faders and looks funny in code. With some clever macros, I was able to simplify the fader logic quite well. Panel::update() contains the heart of the panels logic and how the faders actually behave to the user, which can be underestimated quite easily.

## Chassis

This part was the most fun, as with many wood projects. On the lasercutter in my universities makerspace, I cut out small fins and endpiece mounts. Those give the chassis high strength and cut the weight down drastically compared to earlier projects of mine. The large pieces are plywood and the two endblocks are some hard wood I found in a scrap bin. I screwed them in from the inside using large M6 inserts for high stability and an untouched outside.

The shell is painted black and the end pieces are stained with Mahogany woodstain (Beize in German). Then I added multiple layers of clearcoat with interlaced sanding.

![Making the chassis](/polysynth/me.webp#medium)

![Finished synthesizer from the side](/polysynth/final_side.jpeg#medium)

## Panels

The panels puzzled me for a while. I could not produce panels like the ones from the Juno myself. In previous synths, I only had to cut them along the outside and drill holes. But now, I have to create many slots into the panel and do precise bends along the edges. I attempted to use a CNC at my secondary school, which I spend a lot of time setting up because no one knew how to, until I broke a few bits and eventually gave up. Finally, I contacted my local metal worker business and asked them for an offer, which came to below 200 CHF, which suprised me as I thought it would be much more...

![CAD model of the panel](/polysynth/model_2.webp#medium "Solidworks model of the main panel")

![Unpainted panel](/polysynth/panel_unpainted.webp "The manufactured main and pitchbend panel. I could never have made it better than the metal workers, so it was a good decision to get it manufactured.")

The paint job was unfortunately a dark story. [Compared to my last synthesizer paint job](/p/minimoog_clone), which went suprisingly well, this one got rather complicated. The order of applying the paint matters a lot, this is what I eventually found out:

1. Painting on aluminium requires a special aluminium primer first
2. The black base coat follows on top
3. The colored lines must be screen printed to make them sharp in multiple colors with multiple screens
4. The white text must be painted with screen printing with multiple screens

![Spray painting the panel](/polysynth/painting_can.webp "Applying the black base layer")

![Screen print exposure](/polysynth/print_exposure.webp "Exposing the screen with photoresist emulsion applied. This screen is one of the three screens for the front panels white text. The correct application of the emulsion and the glass plate compressing the screen is really important for a high resolution and sharp screen. This part I had figured out.")

That was the theoretical plan. However, the following problems occured one after the other driving me insane and always having to repeat everything...

- While screen printing, a small error will ruin the current print, so everything not dry must be washed away. If this is done with a solvent, the layer underneath is going to dissolve and be ruined
- Multiple screens must be used since the panel is large. The order matters, since the overlapping paint must be dry such that it does not smear while printing the next one
- The staples in my DIY screen scratches big holes into the base layer paint
- Paint with the same solvent as the base layer will dissolve and mix with the base layer
- The clear coat I used actually dissolves the base layer as well and when I thought I was done, the whole panel got a weird spiky texture :(

All of these problems made this project go on for a year longer, while everything else already worked quite well... However, I finally managed to somehow end it, even thought the final panel finish is a bit weird. With a polishing cloth, I was able to softly sand off the small bumps left from the inproperly applied clear coat.

<figure class="medium">
    <video src="/polysynth/painting_ugly.mp4" controls preload="metadata"></video>
    <figcaption>Here, I used the transparencies of the white screens as a guide to know where to paint the colored lines to pinpoint the precise locations where the line color changes. You can see my frustration why the print went so poorly. To this day I still don't know, but I think it might be due to me mixing my own shade with screen printing primer and making it the wrong consistency. Also, paint meant for textiles does not behave well onto cold aluminium surfaces.</figcaption>
</figure>

![Logo on the finished synthesizer](/polysynth/final_logo.jpeg "All in all, I was satisfied with the end result and from afar you cannot really notice the defects.")

![Assembled synthesizer](/polysynth/assembled.webp "Here you can see the synth opened up, and how the panel PCB is installed. It is mounted via 3D printed fixtures that attach to the top panel.")

## Final Result

![Finished synthesizer from the side](/polysynth/final_side_2.jpeg "The final synthesizer.")

![Back of the finished synthesizer](/polysynth/final_back_2.jpeg "The back panel also features some text.")

![Connectors on the back panel](/polysynth/final_io.jpeg "The IO on the back with MIDI, stereo line outs, sustain pedal, USB for MIDI and programming, and power.")

![Clock, arpeggio and sequence controls](/polysynth/final_control.jpeg "The control section.")

The control section contains in addition to the standard arpeggiator from the Juno also a sequencer, which I designed. With "Record" held down, the number of steps can be selected with the number panel. Then the sequence can be recorded and blank steps can be entered.

<figure class="medium">
    <video src="/polysynth/testing_2.mp4" controls preload="metadata"></video>
    <figcaption>Here, I demonstrate the sequencer with "Blue Monday". Ignore me knocking the table in amazement.</figcaption>
</figure>


![LFO, VCO, VCF and VCA sliders](/polysynth/final_gen.jpeg "LFO, VCO, VCF behave the same as in the Juno.")

![VCF, VCA, envelope and chorus sections](/polysynth/final_env.jpeg "So does the VCA, ENV, Chorus.")

![Program storage section](/polysynth/final_storage.jpeg "16 patches can be stored or loaded. Every control in the blue region will be stored. The faders then get inactive until they are nudget to a new position, where they send their position again. Since it is annoying to have to nudge all faders if you want to creat a patch, I added a button to load the current panel state as the active patch.")

![Pitch bend wheel and left end of the panel](/polysynth/final_wheel.jpeg "The pitchwheel is 3D printed and with a torsion spring and a tension spring, the two axes of the wheel behave similarly to the Junos pitch knob. I unfortunately could not find a video right now... The pitch bend range can be extended to an octave with a toggle. Pushing the wheel either adds vibrato modulation or modulates the filter cutoff with the LFO depending on the chosen amount.")

## Demos

The demos might contain bad playing and poor camera quality. Don't be disturbed!

<figure class="medium">
    <video src="/polysynth/testing_3.mp4" controls preload="metadata"></video>
    <figcaption>Some familiar sounds: "Kids" from the Stranger Things soundtrack, then the "Sweet Dreams" bass line.</figcaption>
</figure>


<figure class="medium">
    <video src="/polysynth/testing_4.mp4" controls preload="metadata"></video>
    <figcaption>A vaporwave classic: "Resonance" by "Home". Notes can be played while the arp is working. Both players get the same note priority.</figcaption>
</figure>

I must post more demos in the future showing the niche sounds that can be achieved! TODO...

## Files

Feel free to ask me a question about the process or ask me if you want any files, code, cad or schematics :)



<!-- Unused -->

<!-- ![CAD model of the enclosure](/polysynth/model.webp) -->

<!-- ![Parts](/polysynth/parts.webp) -->

<!-- ![Painted panel](/polysynth/painting.webp) -->

<!-- ![Close-up of the painted panel](/polysynth/painting_closeup.webp) -->

<!-- ![Finished synthesizer from the front](/polysynth/final_front.jpeg) -->

<!-- ![Finished synthesizer from the back](/polysynth/final_back.jpeg) -->

<!-- <video src="/polysynth/pitchbend_mechanism_old.mp4" controls preload="metadata"></video> -->

<!-- <video src="/polysynth/pitchbend_mechanism_old_2.mp4" controls preload="metadata"></video> -->

<!-- <video src="/polysynth/testing_1.mp4" controls preload="metadata"></video> -->

<!-- ![Finished synthesizer on its stand](/polysynth/final_top_2.jpeg) -->

<!-- ![Finished synthesizer on its stand](/polysynth/final_top_3.jpeg) -->

<!-- ![Finished synthesizer on its stand](/polysynth/final_top_4.jpeg) -->

<!-- ![Finished synthesizer from the side](/polysynth/final_side_3.jpeg) -->
