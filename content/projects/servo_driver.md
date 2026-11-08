---
title: STM32-based 16-channel Analog Servo Driver with Force Feedback and 16 Potentiometer ADC Inputs
navTitle: STM32 Servo Driver
year: 2026
---

For my [animatronic hand project](/p/hand), I required specific features without spending too much on complicated driver boards. Therefore, I made my own complicated driver board.

![KiCad design of the board](/servo_driver/kicad.png#medium)

My board is tailored to the hand project, but the goal was to use it for many future animatronic projects. It thus features:

- 16 servo channels run via a PCA9685 pwm driver that is sending analog PWM signals to the servos.
- 32 ADC inputs (16 of which for the current sensing)
- 16 INA190 current shunt amplifiers for current sensing
- STM32F4 microcontroller
- Micro-USB port
- 10-15 Amps total current on the driver (this is an estimation, will find out someday)
- CAN bus (never tested but board has it)

## Servos

Simple RC analog servos are super cheap and come in various sizes. Some are angle based and other feature continuous rotation, where the analog input controls the speed. All function with a timed signal, which can be controlled using the right PWM driver. A common driver in dev boards is the PCA9685, that can be set up to drive 16 channels with a PWM signal controlling 16 channels simultaneously.

![Shunt](/servo_driver/shunt.png#medium)

The servos is connected in series with a shunt resistor (R26). The voltage drop over this resistor is measured by the INA190, filtered and amplified. The INA190 then outputs a clean signal which can be read with a ADC into the STM32. In total, this circuit is replicated 16 times.

## Board

For animatronics, I tried to keep the board extremely compact. All headers can be 90-degree-headers, which point the plugged in wires sideways creating a shallower compact setup. The big cap can be pushed to the side as well.

![3D model of the board](/servo_driver/3d_model.png#medium)

## Building the Board

This is my first SMD project, my first STM32 project and my first project without a devboard. So it was a learning curve... 

The two pictures on the bottom especially show my gross underestimation of the SMD component size.

![Soldering under the microscope](/servo_driver/soldering.jpeg#medium)

![Close-up of a small part](/servo_driver/part_small.jpeg#medium)

The PCBs and parts were ordered from JLCPCB and LCSC. Since the assembly costs per type of component, I was a cheapskate and decided to build it myself. This lead to a horrible half a year of questioning myself why the board did not come to life. I replaced the STM32 with another one, resoldered it aaaand it worked!!! Therefore, I probably fried the first one.

## Arm-ing the Board

The other pictures show the board in place and the resulting wire mess. Thankfully, I have these very small gauge wires that have a minimal footprint.

![Finished cables](/hand/cables_finished2.jpeg#medium)

![Mess of wires](/hand/wire_mess.jpeg#medium)

## Want the files?

If you want CAD files, KiCad schematics or code, feel free to send me an email!
