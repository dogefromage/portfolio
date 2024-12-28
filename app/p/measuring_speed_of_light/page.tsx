
export default function () {

    return (
        <div className="md-prose">
            <h1 className='text-2xl mb-8'>
                <span className="text-accent">2019: </span>
                Measuring the speed of light 1900s-style
            </h1>
            <p>During my third year in the Gymnasium Liestal we were tasked to measure a natural constant. Our team decided to try an <a href="https://en.wikipedia.org/wiki/Fizeau%27s_measurement_of_the_speed_of_light_in_air">old method of measuring the speed of light by Hippolyte Fizeau</a>.
            </p>
            
            <figure className="mx-auto w-1/2 my-4">
                <img alt="Fizeau's experiment" src="https://cdn.shopify.com/s/files/1/0093/2298/7617/files/Screen_Shot_2022-04-06_at_11.02.09_AM.png?v=1649206946"/>
                <figcaption>{"Original setup of Fizeau in 1849 [Source: https://scienceready.com.au/pages/determination-of-speed-of-light]"}</figcaption>
            </figure>

            <p>The experiment involves a light source (a laser in our case), a fast spinning disc with slits, a reflector placed far away and a viewer. The goal is to get the wheel spinning to such a fast speed that the slits in the wheel have moved after the time the light takes to reach the reflector and return. The angular speed of the wheel and distance to the reflector can then be used to calculate the speed of light in air.</p>
            
            <figure className="mx-auto w-3/4 my-4">
                <img alt="Our's experiment" src="/fizeau.jpg"/>
                <figcaption>Our setup. This image is taken of our captured data and shows both the laser entering the disc (left), reflecting and returning through the slits (right) after twice travelling 1.4km.</figcaption>
            </figure>

            <p>This experiment was largely inspired by the <a href="https://www.youtube.com/@AlphaPhoenixChannel">YouTube channel AlphaPhoenix</a> who completed the experiment at a high accuracy.</p>

            <p>Due to the limitations of our ability to construct a fast spinning disc and the trouble of finding a great open field in the swiss Jura mountains to shine a laser through, we struggled to achieve an accurate result. However, the experiment worked and we achieved a fairly large overestimate of 420'000 km/s :)</p>
            
            {/* <a href="">{">>> You can read our original project here <<<"}</a> */}
            I cannot find our paper as a pdf... some day I will upload it
        </div>
    );
}