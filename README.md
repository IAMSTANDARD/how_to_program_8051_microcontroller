# How to program the 8051 microcontroller, (AT89S52)
<img src="https://upload.wikimedia.org/wikipedia/commons/0/03/Tektronix_1720_Vectorscope_-_Signetics_SCN8051HCCN40_8051_Microcontroller.jpg" width="500">

---

## Hardware Requirements
So first off, lets meet the hardware requirements to see whether we have everything required for programming or not.
For pogramming the 8051 microcontroller in serial mode. You will need
- The microcontroller in it's working state or a development board. (with crystal and all the required circuitry)
<img src="https://m.media-amazon.com/images/I/919e9y95l5L._AC_SS450_.jpg" width="200">
- A USBASP device, capable of programming.
<img src="https://upload.wikimedia.org/wikipedia/commons/1/19/USBasp_programmer.jpg" width="200">
- A six wire cable, for connecting the USBASP and the microcontroller board together.
<img src="https://docs.px4.io/main/assets/img/i2c_jst-gh_connector.d1d4e5d7.jpg" width="200">
- And of course, we also need an USB cable for connecting the microcontroller board and USBASP together.
<img src="https://live.staticflickr.com/2834/9367271876_343fab02bb_b.jpg" width="200">
- And don't forget to power the microcontroller, with a power brick. In some devices, you can even power them with the USBASP. But don't use the USBASP power to run your other hardware. Only use power from your usb port to program the microcontroller.
<img src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Philips_12_V_Plug-in_AC_Adapter.JPG" width="100">

## Post Configuration

- First, configure the avrdude, to be able to program at89s52 and at89s51 microcontroller.  For that follow the instructions from this [website](https://karatos.com/art?id=17b6499d-cd69-4177-a0e0-4cc504590721#gsc.tab=0).
- Once that is done the avrdude is ready to be used for programming. You have to repeat this step on any new computer. But once completed, you don't have to do it twice.

## Project Setup

Now you need to be able to write software as well right? Well follow the advice and steps from below.
- Create an empty folder for your project files. Now create a "main.c" file.
- Any library that you use should be in the same folder in the main or some separate directory. The library file should be ".h" file.
And that is mostly it. You may also need to create a make file, But I don't know how to do that yet.

## Programming the Microcontroller

- Open a terminal in the directory, your project resides in.
- In the terminal, type  

```
sdcc <name of your main file>
```
        
  And the project will be compiled.
- Now in the same terminal type out this final command to burn the code into the microcontroller using avrdude.  

```
sudo avrdude -p 8052 -c usbasp -e -U flash:w:'./main.ihx'
```
        
