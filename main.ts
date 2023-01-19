input.onLogoEvent(TouchButtonEvent.Pressed, function () {
	
})
input.onButtonPressed(Button.A, function () {
    oled_z.oled_Line1(64, 0, 82, 57)
    oled_z.oled_Line1(82, 57, 34, 22)
    oled_z.oled_Line1(34, 22, 94, 22)
    oled_z.oled_Line1(94, 22, 46, 57)
    oled_z.oled_Line1(46, 57, 64, 0)
})
function seri (win: number, r: number, xm: number, ym: number, x: number[], y: number[]) {
    serial.writeValue("win", win)
    for (let Index = 0; Index <= x.length - 1; Index++) {
        serial.writeValue("x", x[Index])
        serial.writeValue("y", y[Index])
    }
}
input.onButtonPressed(Button.AB, function () {
	
})
input.onButtonPressed(Button.B, function () {
    oled_z.Kreis(64, 32, 31)
})
let win = 0
basic.showIcon(IconNames.Surprised)
kitronik_VIEW128x64.clear()
let r = 31
let xm = 64
let ym = 32
let w = 360 / 5 * 2
win = 0
let x = [64]
let y = [1]
seri(win, r, xm, ym, x, y)
win = w - 90
x.push(Math.floor(xm - Math.sin(win) * r))
y.push(Math.floor(ym - Math.cos(win) * r))
seri(win, r, xm, ym, x, y)
oled_z.oled_Line1(x[0], y[0], x[1], y[1])
