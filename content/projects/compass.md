---
title: Magic Compass
year: 2026
---

<iframe src="https://www.youtube.com/embed/J7OHfNbIT3I" title="I Overengineered a Compass using MAGNETS" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

This compass is something I have always wanted to build. In a treasure hunt, the compass will give you only a direction to a preprogrammed location. The user does not know how far the journey to the goal is or what to expect.

I actually did not expect the number of cool things I would learn with this project, which ended up covering global navigation, AHRS, Earth coordinate systems, Earth magnetic field models, electromagnets, recursive estimation and a tad of machine learning. The whole story can be seen in the YouTube video above.

![Finished compass](/compass/finished.jpg#medium "The finished compass after assembly")

![Assembly 1](/compass/assembly_1.jpg#medium "Here, a single coil is mounted and attached to the stripboard. The red part is the DRV8833 H-bridge driver. Behind in blue is the GY-NEO-6MV2 GPS module.")

![Assembly 2](/compass/assembly_2.jpg#medium "The bottom assembly attached to the top cylinder.")

![Assembly 3](/compass/assembly_3.jpg#medium "Here, everything is placed. The small XIAO-ESP32-C6 is partly visible and a USB extension cable is mounted to the 3D printed shell allowing for charging and programming. The whole thing is battery powered.")

## Files

The [source code can be found on GitHub](https://github.com/dogefromage/compass). For other files, feel free to contact me.
