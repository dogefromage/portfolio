
export default function SpeedOfLight() {

    return (
        <div className="md-prose">
            <h1 className='text-2xl mb-8'>
                <span className="text-accent">[2020] </span>
                Building a vintage analog synthesizer - Clone of Minimoog Model D</h1>

            <p className="text-lg">
                <a href="/building_an_analog_synthesizer_compressed.pdf">{">>> Download my matura paper <<<"}</a>
            </p>

            <p>For my matura project, I constructed an analog monophonic synthesizer from scratch. I was greatly inspired by the memorable Moog Minimoog Model D which was the face of 1970s electronic music. This project involved planning and constructing the electronic circuits, assembling the body from wood and painting the aluminium front panel using screen printing. The keyboard would have been too difficult to construct myself, so I stole it from an old MIDI keyboard and planned my synthesizer around its dimensions.</p>

            <div className="w-full my-8">
                <iframe className="w-full aspect-video" src="https://www.youtube.com/embed/g4em1TrTlQQ" title="Kraftwerk Autobahn on DIY analog synth" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>

            <p>My synthesizer uses the principle of <a href="https://en.wikipedia.org/wiki/Subtractive_synthesis">subtractive synthesis</a> which was popular in early analog synthesizers. First a simple waveform is generated using an oscillator circuit which should perfectly hit the correct pitch of a note. This waveform contains many natural overtones (high frequency content) due to its sharp edges. The second stage of a subtractive synthesizer is the filter (usually low-pass) which subtracts those overtones. Modulating various parameters like pitch, filter cutoff, output volume and more, the sound can be modeled to imitate many instruments. </p>

            <figure className="mx-auto w-3/4 my-4">
                <img alt="The signal flow in my synthesizer" src="/synth_signal_flow.png"/>
                <figcaption>The signal flow of my synthesizer. (v.c.=voltage controlled, VCO=v.c. oscillator, VCF=v.c. filter, VCA=v.c. amplifier, LFO=low frequency oscillator, EG=envelope generator)</figcaption>
            </figure>

            <p>The main drawback of this synthesis is that only one note can be played at once, as it works similar to a human voice. Later, synthesizers were built which featured multiple of the mentioned circuit together to allow multiple notes. A few years later I have build a polyphonic synthesizer, <a href="/p/polyphonic_analog_synthesizer">which is mentioned in this post</a>.</p>
            
            <figure className="mx-auto w-1/2 my-4">
                <img alt="The unpainted synthesizer" src="/synth_raw.jpg"/>
                <figcaption>The synthesizer chassis before painting.</figcaption>
            </figure>

            I used plywood for building the body, which I later stained with Mahogany stain and protected using clear coat. The panel is 1mm thick aluminium, which I spray painted and then screen printed using white color. For this project, it was easy to process the aluminium, since all holes where circular and could easily be drilled.
            
            <figure className="mx-auto w-3/4 my-4">
                <img alt="The final synthesizer" src="/synth_front.jpg"/>
                <figcaption>The final synthesizer.</figcaption>
            </figure>
            
            <figure className="mx-auto w-3/4 my-4">
                <img alt="The electronics of my synthesizer" src="/synth_electronics.jpg"/>
                <figcaption>For this project, I used stripboard such that I didn't have to etch my own circuit boards. This led to this confusing mess which still haunts me to this day.</figcaption>
            </figure>
        </div>
    );
}