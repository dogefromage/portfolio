---
title: Human-Dimensioned Animatronic Robotic Hand (work in progress!)
navTitle: Animatronic Robotic Hand
year: 2026
featured: 0
thumbnail: /hand/cad.jpeg
---

From many online projects like [Will Cogleys YouTube channel](https://www.youtube.com/@WillCogley), [Disney Research](https://www.youtube.com/@DisneyResearchHub) and the recent achievements of  [SRL at ETH with their ORCA hand](https://srl.ethz.ch/orcahand.html), I was inspired to start making animatronic parts myself. I think looking back now, I specifically chose the hand because of the wide availability of motion models and the intense academic research around it. Also, there where a lot of questionable designs online, where I thought I might be able to beat their designs at least... :)

With my design, I specifically wanted to focus more on fast actuation and the true human proportions, in contrast to strength. This would categorize my hand into more of an animatronic part. A life-like hand with convincing movement. After all, I think a lot of realism stems from the animation itself and I did not want my hand to become too "robotic".

Therefore, my hand features only half-actuated joints, where servos pull pullies into the flex direction. The opening of the joints is achieved by springs constantly applying a small torque that puts the joints into an extended relaxed position. This let me save half of the actuators and allowed me to place 16 actuators into the space of a regular forearm.

![Finished hand](/hand/hand_finished_2.jpeg#medium "The assembled hand without any wiring")

![Soldering the wires](/hand/wire_soldering_3.jpeg "Soldering gets tricky here: This image shows the SMD potentiometers (blue) which are sandwiched into the finger joint. This is the perfect electronics part letting me read out the precise absolute joint angle without taking up too much space. They must however be mounted perfectly on the axis.")

## Motion

To roughly copy the motion of a regular finger, each finger flexes the first and second digit simultaneously using a small fishing line linking the rotation of the outmost two finger joints. This fishing line is placed inside the middle digit which is hollow. Thus only the second and third digit need to be actuated. 

A single actuator can spread the fingers laterally and another can curl the middle hand where both the pinkies and the thumbs metacarpal bone curl inwards. This allows the thumb to rotate and gives much more control over complex grasping poses. The thumbs lateral motion is separate from the fingers with an additional actuator.

The hardest part was to mimic the actual motion of the wrist joint, which can rotate on two axes around the same point, while also allowing tendons to pass unrestrictedly (I now understand why carpal tunnel syndrome is a thing. This stuff is complicated...). My solution was to focus on the up and down axis and neglect the sideways motion a bit. Therefore, I used a large servo to control up and down. To not restrict the motion by the wires I kept the axis of rotation hollow and let the wires and tendons go through, crossing the axis (like in the human carpal tunnel). This keeps the wire length constant over different poses and thus does not interfere the motion.

What about the gear? Well that I chose for fun and for the above reason with the hollow axis but now I kinda regret it. It looks cool at the moment but this will be a problem in the future if I want to add skin or some sort of shell... but let's see.

![Finished cables](/hand/cables_finished.jpeg#medium "Here the carpal tunnel can be seen with the tendons passing through. The tendons of the inner hand go through the middle hand upwards first and back down through the carpal tunnel.")

## Material Choice 

### Tendons 

For my hand, I used some PE fishing line. This sufficed for my application even though it is not the best. However, the shell of the wire needs to resist the pulling of the wire without twisting under load and also allowing lots of curvature while still correctly redirecting the force. For this, I ordered some 2mm diameter steel wound spring tube. This offers very low friction against the fishing line and it holds up against lots of force while still being flexible.

### Electronics

The servos are rather cheap continuous rotation metal gear servos for budget reasons. I chose continuous rotation since the pulley system is really annoying to mount and having a limited rotation range would overcomplicate the setup drastically. Since I have potentiometers in the finger joints anyway, I dont need the servos absolute positioning. Where this did not work out though is the remaining joints such as the hand spreading, curling and thumbs CMC joint, where I left the potentiometer out and I later realized I have zero feedback... adding an angle sensor is one of the most important TODOs for the future.

The potentiometers in the digits are very flat SMD three-legged analog potentiometers with a hole in the center. The finger joints are a 3D printed whole inlaid with a small hollow metal rod. The other joint is attached with a metal wire pushed through the hollow rod. Since the tolerances are very tight and both parts are steel, this forms a low friction and low play bushing mechanism.

![Finished hand](/hand/potentiometer.avif#small "The SMD potentiometer")

In the two wrist axes, you can see a classic control-panel-style potentiometers that I had on hand (pun intended). They are simply pushed into the material, forming a friction fit with the small ridges in the rotating axis, also offering angle feedback on the wrist.

An extra sense I have built in is the force feedback via the servo power supply. More of this in this [article on the servo controller](/p/servo_driver). The current measurement of the driver can be calibrated to report torque and force feedback on my hand model. This would in the future allow for a higher intrinsic knowledge of the state of the hand and its interaction with the world.

### Mechanics

Most of the hand is FDM 3D printed. This is quick and simple. The fine parts are assembled with M2 screws, for larger I went up to M4. Many parts feature springs. Small torsion springs are built into the fingers lowest and middle joint, that are responsible for opening the fingers under no actuation. Other springs pull or push to stabilize or counteract the servo pulleys. Miniature bearings with an M3 hole are used on multiple places in the middle hand for mechanical parts get exposed to higher forces.

![Finished hand](/hand/hand_finished.jpeg#medium "The finished hand model after printing and assembling")

![CAD model of the hand](/hand/cad.jpeg#medium "This has of course gone through many iterations. here is a screenshot I found of some earlier design stage.")

<!-- ![Finished cables](/hand/cables_finished2.jpeg#small) -->

![Soldering the wires](/hand/wire_soldering_2.jpeg#medium "Some Frankenstein-esque photos of wiring up the potentiometers.")

<!-- ![Soldering the wires](/hand/wire_soldering.jpeg) -->

<!-- ![Early printed finger](/hand/finger_early.jpeg) -->

<!-- ![Printed parts on the print bed](/hand/printing.jpeg) -->

![Fingers before being attached](/hand/fingers_before_attached.jpeg#medium "Before the fingers got attached. The small bearings in the MCP joints are visible with the little lever allowing for the spreading of the fingers. A small bracket inside the middle hand rotates. To it, the MCP levers are attached with small metal linkages and thus move simultaneously. The metacarpal bone curl mechanism is also visible in the middle hand. A second bracket with metal linkages pulls on the left and right metacarpal sections. The torsion springs mounted on the axis then spreads the hand back out.")

<!-- ![Inside of the finished hand](/hand/hand_finished_inner.jpeg) -->

<!-- ![Mess of wires](/hand/wire_mess.jpeg) -->

## Early Tests

As of now (November 2026), I have not gotten around adding the required angle sensors for the remaining joints. This has stopped me from progressing further to connect all the pulleys and program the motion.

However, using a simple hardware interface for the STM32 based servo controller, I have created a small proportional feedback controller to set an angle on the digits on a single finger, which thankfully worked!

<video src="/hand/test_driver_2.mp4" controls preload="metadata"></video>

<!-- <video src="/hand/test_driver.mp4" controls preload="metadata"></video> -->

<!-- <video src="/hand/wire_mess_video.mp4" controls preload="metadata"></video> -->

<!-- <video src="/hand/test_driver_3.mp4" controls preload="metadata"></video> -->


## Work in progress...

Come back in the future for more results :)
