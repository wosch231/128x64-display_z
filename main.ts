input.onButtonPressed(Button.A, function () {
    kitronik_VIEW128x64.setPixel(64, 32)
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
    r = 31
    xm = 64
    ym = 32
    w = 360 / 5 * 2
    win = 0
    x = [64]
    y = [1]
    seri(win, r, xm, ym, x, y)
    win = w - 90
    x.push(Math.floor(xm - Math.sin(win) * r))
    y.push(Math.floor(ym - Math.cos(win) * r))
    seri(win, r, xm, ym, x, y)
    oled_z.oled_Line1(x[0], y[0], x[1], y[1])
    win = 2 * w + win
    x.push(Math.floor(xm + Math.sin(win) * r))
    y.push(Math.floor(ym + Math.cos(win) * r))
    seri(win, r, xm, ym, x, y)
    oled_z.oled_Line1(x[1], y[1], x[2], [0][2])
    basic.pause(100)
})
input.onButtonPressed(Button.B, function () {
    oled_z.Kreis(64, 32, 31)
})
let y: number[] = []
let x: number[] = []
let w = 0
let ym = 0
let xm = 0
let r = 0
let win = 0
basic.showIcon(IconNames.Surprised)
kitronik_VIEW128x64.clear()
oled_z.oled_Line1(54, 32, 74, 32)
oled_z.oled_Line1(64, 22, 64, 42)
oled_z.oled_Line1(57, 25, 71, 39)
oled_z.oled_Line1(57, 39, 71, 25)
